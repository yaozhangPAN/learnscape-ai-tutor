
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PayNowPayment } from "@/components/Payments/PayNowPayment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/contexts/I18nContext";

interface PaymentData {
  id: string;
  payment_reference: string;
  product_type: string;
  product_id: string | null;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  transaction_id: string | null;
}

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, lang } = useI18n();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const reference = searchParams.get("reference");
  const productType = searchParams.get("type");
  const contentId = searchParams.get("id");

  useEffect(() => {
    if (!reference || !user) {
      return;
    }

    const fetchPaymentInfo = async () => {
      setIsLoading(true);
      try {
        // First check if payment exists and get its status
        const { data: paymentData, error: paymentError } = await supabase
          .from("paynow_payments")
          .select("*")
          .eq("payment_reference", reference)
          .eq("user_id", user.id)
          .single();

        if (paymentError) {
          throw new Error("Payment not found or does not belong to you");
        }

        const payment = paymentData as PaymentData;

        // If payment is already verified or completed, redirect to success page
        if (payment.status === "completed") {
          navigate(`/payment-success?type=${productType}${contentId ? `&id=${contentId}` : ''}`);
          return;
        }

        setPaymentStatus(payment.status);
        
        // Get original payment info from the database
        const productName = payment.product_type === "premium_subscription" 
          ? "Premium Access Pass" 
          : "PSLE Tutorial";
        
        const formattedPrice = `S$${(payment.amount / 100).toFixed(2)}`;
        
        // Construct payment info object
        setPaymentInfo({
          reference: payment.payment_reference,
          productName: productName,
          amount: formattedPrice,
          payeeUEN: "202401234K", // Replace with your actual company UEN
          payeeName: "LearnScape Education Pte Ltd", // Replace with your actual company name
          paymentInstructions: [
            "Open your bank app and select 'Scan & Pay'",
            "Scan the QR code or enter the UEN manually",
            "Enter the exact amount shown",
            "Include the reference number in the comments/reference field",
            "Complete the payment and take a screenshot for your records"
          ],
          successUrl: window.location.href
        });

      } catch (error) {
        console.error("Error fetching payment info:", error);
        toast({
          title: lang === 'zh' ? '错误' : 'Error',
          description: String(error),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentInfo();
  }, [user, reference, navigate, productType, contentId, toast, lang]);

  const handleVerifyPayment = async (transactionId: string) => {
    if (!reference || !user) {
      throw new Error(lang === 'zh' ? '缺少付款参考编号' : 'Payment reference is missing');
    }

    try {
      const { data, error } = await supabase.functions.invoke("verify-payment", {
        body: { paymentReference: reference, transactionId },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.success) {
        setPaymentStatus(data.payment.status);
        toast({
          title: lang === 'zh' ? '验证成功' : 'Verification Successful',
          description: data.message,
        });
        
        // For demo purposes, redirect to success page immediately
        // In a real app, you might want to wait for admin verification
        navigate(`/payment-success?type=${productType}${contentId ? `&id=${contentId}` : ''}`);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw new Error(String(error));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
            <p className="mt-4 text-gray-600">
              {lang === 'zh' ? '加载中...' : 'Loading...'}
            </p>
          </div>
        ) : paymentStatus === "pending_verification" ? (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">
                {lang === 'zh' ? '付款正在审核中' : 'Payment Under Review'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="flex flex-col items-center p-6">
                <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-yellow-500" />
                </div>
                <p className="text-gray-600">
                  {lang === 'zh' 
                    ? '您的付款正在审核中。我们会尽快处理您的付款。请稍后再查看。' 
                    : 'Your payment is under review. We will process it as soon as possible. Please check back later.'}
                </p>
              </div>
              
              <Button asChild className="bg-learnscape-blue hover:bg-blue-700">
                <a href="/">
                  {lang === 'zh' ? '返回首页' : 'Return to Homepage'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ) : paymentInfo ? (
          <PayNowPayment 
            paymentInfo={paymentInfo} 
            onVerifyPayment={handleVerifyPayment} 
          />
        ) : (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl text-red-600">
                {lang === 'zh' ? '付款信息未找到' : 'Payment Information Not Found'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-gray-600">
                {lang === 'zh' 
                  ? '无法找到付款信息。请联系客户支持获取帮助。' 
                  : 'Could not find payment information. Please contact customer support for assistance.'}
              </p>
              
              <Button asChild className="bg-learnscape-blue hover:bg-blue-700">
                <a href="/">
                  {lang === 'zh' ? '返回首页' : 'Return to Homepage'}
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PaymentVerification;
