
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/I18nContext";

type PurchasedCourse = {
  content_id: string;
  purchase_date: string;
  price: number;
  currency: string;
};

const PurchasedCourses = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useI18n();

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("purchased_content")
          .select("*")
          .eq("user_id", user.id)
          .eq("content_type", "video_tutorial")
          .order("purchase_date", { ascending: false });

        if (error) throw error;
        setPurchases(data || []);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {lang === "zh" ? "已购买的课程" : "Purchased Courses"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          {lang === "zh" ? "已购买的课程" : "Purchased Courses"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {purchases.length > 0 ? (
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <Link
                key={`${purchase.content_id}-${purchase.purchase_date}`}
                to={`/courses/${purchase.content_id}`}
                className="block p-4 rounded-lg border border-gray-200 hover:border-learnscape-blue transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {purchase.content_id.replace(/-/g, " ")}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(purchase.purchase_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {purchase.currency} {purchase.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            {lang === "zh" 
              ? "您还没有购买任何课程" 
              : "You haven't purchased any courses yet"}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchasedCourses;
