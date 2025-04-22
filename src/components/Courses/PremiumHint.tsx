
import React from 'react';
import { Lock } from "lucide-react";

export const PremiumHint: React.FC<{ loadingSubscription: boolean; startCheckoutSession: (type: string) => Promise<string | undefined>; }> = ({
  loadingSubscription,
  startCheckoutSession,
}) =>
  !loadingSubscription ? (
    <div className="flex items-center text-xs text-orange-600 mt-2 gap-1">
      <Lock className="w-4 h-4 mr-1" />
      仅付费会员可使用AI点评/对话，<button
        className="underline text-blue-600 hover:text-orange-500 ml-1"
        onClick={async () => {
          const url = await startCheckoutSession("premium_subscription");
          if (url) window.location.href = url;
        }}
      >立即开通</button>
    </div>
  ) : null;
