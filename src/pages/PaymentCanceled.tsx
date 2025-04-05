
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft } from "lucide-react";

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen flex flex-col playful-bg">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-2 border-red-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Payment Canceled</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Your payment has been canceled. No charges were made to your account.
            </p>
            <div className="flex flex-col space-y-3 pt-4">
              <Button asChild className="bg-learnscape-blue hover:bg-green-700 rounded-full py-3 h-14">
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Return to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentCanceled;

