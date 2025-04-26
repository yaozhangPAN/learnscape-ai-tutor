import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { trackUserBehavior } from "@/utils/behaviorTracker";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === "SIGNED_IN") {
          toast({
            title: "Signed in",
            description: "You have successfully signed in.",
          });
          
          // Check admin role after sign in
          if (session?.user) {
            const { data } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .eq('role', 'administrator')
              .single();
            
            setIsAdmin(!!data);
          }
          
          // Track login event
          setTimeout(() => {
            trackUserBehavior('login', {
              actionDetails: { 
                userId: session?.user.id,
                email: session?.user.email,
                authProvider: session?.user?.app_metadata?.provider || 'email'
              }
            });
          }, 0);
        }
        
        if (event === "SIGNED_OUT") {
          toast({
            title: "Signed out",
            description: "You have successfully signed out.",
          });
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'administrator')
          .single();
        
        setIsAdmin(!!data);
      }
      
      setIsLoading(false);
      
      // Track session restore if user exists
      if (session?.user) {
        setTimeout(() => {
          trackUserBehavior('page_view', {
            actionDetails: { 
              eventType: 'session_restored',
              userId: session.user.id
            }
          });
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signOut, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
