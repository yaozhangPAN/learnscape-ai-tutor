
import React from "react";

const EmptyBlock: React.FC = () => (
  <div className="flex items-center justify-center rounded-2xl bg-white/50 border-2 border-white shadow-lg min-h-[144px] overflow-hidden">
    <img
      src="/lovable-uploads/42744e08-0a1c-498b-b49a-4d816f75f591.png"
      alt="Daily Adventure Illustration"
      className="object-contain max-h-60 w-full h-full"
      draggable={false}
      style={{ userSelect: "none" }}
    />
  </div>
);

export default EmptyBlock;
