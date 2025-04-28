
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Copy, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/contexts/I18nContext";

interface PayNowPaymentProps {
  paymentInfo: {
    reference: string;
    productName: string;
    productDescription?: string;
    amount: string;
    payeeUEN: string;
    payeeName: string;
    paymentInstructions: string[];
    successUrl: string;
  };
  onVerifyPayment: (transactionId: string) => Promise<void>;
}

export const PayNowPayment = ({ paymentInfo, onVerifyPayment }: PayNowPaymentProps) => {
  const { toast } = useToast();
  const { lang } = useI18n();
  const [transactionId, setTransactionId] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: lang === 'zh' ? '已复制' : 'Copied!',
      description: message,
      duration: 3000,
    });
  };

  const handleVerifyPayment = async () => {
    if (!transactionId.trim()) {
      toast({
        title: lang === 'zh' ? '错误' : 'Error',
        description: lang === 'zh' ? '请输入交易参考编号' : 'Please enter a transaction reference number',
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onVerifyPayment(transactionId);
    } catch (error) {
      console.error("Payment verification error:", error);
      toast({
        title: lang === 'zh' ? '验证失败' : 'Verification Failed',
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg border-2">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl">
          {lang === 'zh' ? 'PayNow 付款' : 'PayNow Payment'}
        </CardTitle>
        <CardDescription>
          {paymentInfo.productName} - {paymentInfo.amount}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-md">
          <QrCode className="h-32 w-32 text-gray-800 mb-4" />
          <p className="text-center text-sm text-gray-600">
            {lang === 'zh' ? '请扫描二维码或使用以下信息支付' : 'Please scan the QR code or use the details below to pay'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'zh' ? '支付金额' : 'Amount'}
              </p>
              <p className="font-bold">{paymentInfo.amount}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(
                paymentInfo.amount.replace(/[^0-9.]/g, ''), 
                lang === 'zh' ? '金额已复制' : 'Amount copied to clipboard'
              )}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'zh' ? '公司识别码 (UEN)' : 'Company UEN'}
              </p>
              <p className="font-bold">{paymentInfo.payeeUEN}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => copyToClipboard(
                paymentInfo.payeeUEN, 
                lang === 'zh' ? 'UEN已复制' : 'UEN copied to clipboard'
              )}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'zh' ? '参考编号' : 'Reference'}
              </p>
              <p className="font-bold break-all">{paymentInfo.reference}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => copyToClipboard(
                paymentInfo.reference, 
                lang === 'zh' ? '参考编号已复制' : 'Reference copied to clipboard'
              )}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-md space-y-2">
          <h4 className="font-medium text-blue-800">
            {lang === 'zh' ? '付款说明' : 'Payment Instructions'}
          </h4>
          <ol className="list-decimal pl-5 text-sm space-y-1 text-gray-700">
            {paymentInfo.paymentInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">
            {lang === 'zh' ? '验证您的付款' : 'Verify Your Payment'}
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            {lang === 'zh' 
              ? '付款后，请输入交易参考号码来验证您的付款' 
              : 'After payment, enter your transaction reference to verify your payment'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder={lang === 'zh' ? '输入交易参考号' : 'Enter transaction reference'}
              className="flex-1 px-3 py-2 border rounded text-sm"
            />
            <Button 
              onClick={handleVerifyPayment}
              disabled={isSubmitting}
              className="whitespace-nowrap"
            >
              {isSubmitting ? (
                <span className="animate-pulse">
                  {lang === 'zh' ? '处理中...' : 'Processing...'}
                </span>
              ) : (
                <>
                  {lang === 'zh' ? '验证付款' : 'Verify Payment'}
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
