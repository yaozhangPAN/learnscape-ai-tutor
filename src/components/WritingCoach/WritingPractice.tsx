
import React from "react";
import WritingEditor from "./WritingEditor";
import { SessionDataProvider } from "./SessionDataProvider";
import WritingHeader from "./WritingHeader";
import LoadingState from "./LoadingState";

const WritingPractice: React.FC = () => {
  return (
    <SessionDataProvider>
      {({ sessionData, isLoading, imageUrl }) => {
        if (isLoading) {
          return <LoadingState />;
        }

        return (
          <>
            <WritingHeader title={sessionData?.title} />
            <div className="container mx-auto px-6 py-6">
              <WritingEditor
                sessionData={sessionData}
                imageUrl={imageUrl}
              />
            </div>
          </>
        );
      }}
    </SessionDataProvider>
  );
};

export default WritingPractice;
