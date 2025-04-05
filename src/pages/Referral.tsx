
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Referral = () => {
  const { toast } = useToast();
  const referralCode = "LEARNSG2025"; // This would typically come from the user's account
  const referralLink = `https://learnscape.sg/register?ref=${referralCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: "You can now share this with your friends!",
        });
      },
      (err) => {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Please try again later.",
        });
      }
    );
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Learnscape!",
          text: "Use my referral code to sign up and get free access to premium learning materials!",
          url: referralLink,
        });
      } catch (error) {
        toast({
          title: "Sharing failed",
          description: "Please try copying the link instead.",
        });
      }
    } else {
      copyToClipboard(referralLink);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gradient-to-b from-learnscape-yellow/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-learnscape-darkBlue mb-4">
                Invite Friends & Get Rewards
              </h1>
              <p className="text-lg text-gray-600">
                Share your personal referral link with friends. When they join, you both get 1 month of premium access!
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
              <h2 className="text-2xl font-bold text-learnscape-darkBlue mb-6">Your Referral Link</h2>
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex-grow p-3 bg-gray-100 rounded-lg text-gray-800 font-medium truncate">
                  {referralLink}
                </div>
                <Button 
                  onClick={() => copyToClipboard(referralLink)}
                  className="bg-learnscape-blue hover:bg-blue-700 flex items-center justify-center"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-learnscape-darkBlue mb-3">Or share directly:</h3>
                <Button 
                  onClick={shareReferral}
                  className="w-full sm:w-auto bg-learnscape-purple hover:bg-purple-700 flex items-center justify-center"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share with Friends
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-learnscape-darkBlue mb-6">How It Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-learnscape-blue/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-learnscape-blue font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-learnscape-darkBlue mb-2">Share Your Link</h3>
                  <p className="text-gray-600">Send your unique referral link to friends via social media, email or messages</p>
                </div>
                
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-learnscape-purple/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-learnscape-purple font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-learnscape-darkBlue mb-2">Friends Sign Up</h3>
                  <p className="text-gray-600">Your friends create an account using your referral link</p>
                </div>
                
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-learnscape-darkBlue mb-2">Both Get Rewarded</h3>
                  <p className="text-gray-600">You and your friend both receive 1 month of premium access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Referral;
