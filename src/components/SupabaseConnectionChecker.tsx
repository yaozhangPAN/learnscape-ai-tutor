
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SupabaseConnectionCheckerProps {
  className?: string;
}

const SupabaseConnectionChecker: React.FC<SupabaseConnectionCheckerProps> = ({ className }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [tables, setTables] = useState<string[]>([]);
  
  const listTables = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error("Error fetching tables:", error);
        return [];
      }
      
      return ['questions', 'profiles', 'subscriptions']; // List known tables as fallback
    } catch (err) {
      console.error("Exception when fetching tables:", err);
      return [];
    }
  };

  const checkConnection = async () => {
    try {
      setIsChecking(true);
      console.log("Testing Supabase connection...");
      console.log("Supabase client:", !!supabase);
      
      // Get a list of available tables
      const tablesList = await listTables();
      setTables(tablesList);
      console.log("Available tables:", tablesList);
      
      // Test if we can make a simple query to the questions table
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
            <span>测试中...</span>
          </>
        ) : (
          "测试数据库连接"
        )}
      </Button>
    </div>
  );
};

export default SupabaseConnectionChecker;
