
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

export function useSupabase() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if current user is an administrator
    const checkAdminRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'administrator')
        .single();
        
      if (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(!!data);
    };
    
    checkAdminRole();
  }, []);

  return { supabase, isAdmin };
}
