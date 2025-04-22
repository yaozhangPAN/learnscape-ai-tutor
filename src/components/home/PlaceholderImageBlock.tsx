
import React from "react";

const PlaceholderImageBlock: React.FC = () => (
  <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-8 transition-all">
    <div className="flex items-center justify-center rounded-2xl bg-white/50 border-2 border-white shadow-lg min-h-[144px] w-full overflow-hidden">
      <img
        src="/lovable-uploads/42744e08-0a1c-498b-b49a-4d816f75f591.png"
        alt="Daily Adventure Illustration"
        className="object-contain w-full h-full max-h-60 transition-all"
        draggable={false}
        style={{ userSelect: "none" }}
      />
    </div>
  </div>
);

export default PlaceholderImageBlock;
