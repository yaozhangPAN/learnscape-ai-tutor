
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LogOut, User, Crown } from "lucide-react";

type Profile = {
  id: string;
  name: string;
  user_type: string;
  created_at: string;
};

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const { isPremium, startCheckoutSession } = useSubscription();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data as Profile);
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  const handleSubscribe = async () => {
    const checkoutUrl = await startCheckoutSession("premium_subscription");
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <p>Loading profile...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>User Profile</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {profile ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-learnscape-blue flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <p className="px-3 py-1 bg-learnscape-yellow/20 text-learnscape-darkBlue rounded-full text-sm font-medium">
                  {profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}
                </p>
                {isPremium && (
                  <p className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full text-sm font-medium flex items-center">
                    <Crown size={14} className="mr-1" /> Premium
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Joined:</span>
                <span>{new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Subscription:</span>
                <span>{isPremium ? "Premium" : "Free"}</span>
              </div>
            </div>

            {!isPremium && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button 
                  onClick={handleSubscribe}
                  className="w-full bg-learnscape-blue hover:bg-blue-700"
                >
                  <Crown size={16} className="mr-2" />
                  Upgrade to Premium (S$99/month)
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Get access to AI tutor, daily recommendations, and all premium features.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p>No profile found. Please contact support.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
