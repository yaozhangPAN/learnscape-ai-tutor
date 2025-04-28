
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SupabaseConnectionCheckerProps {
  className?: string;
}

const SupabaseConnectionChecker: React.FC<SupabaseConnectionCheckerProps> = ({ className }) => {
  const [isChecking, setIsChecking] = useState(false);
  
  const checkConnection = async () => {
    try {
      setIsChecking(true);
      console.log("Testing Supabase connection...");
      console.log("Supabase client:", !!supabase);
      
      // Test if we can make a simple query
      const { data, error } = await supabase.from('questions').select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error("Supabase connection test failed:", error);
        toast.error("Failed to connect to Supabase database");
        return;
      }
      
      console.log("Supabase connection successful:", data);
      toast.success("Successfully connected to Supabase database");
      
    } catch (err) {
      console.error("Error testing Supabase connection:", err);
      toast.error("Error testing Supabase connection");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className={className}>
      <Button
        variant="outline"
        onClick={checkConnection}
        disabled={isChecking}
        className="flex items-center gap-2"
      >
        {isChecking ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            <span>Testing...</span>
          </>
        ) : (
          "Test Supabase Connection"
        )}
      </Button>
    </div>
  );
};

export default SupabaseConnectionChecker;
