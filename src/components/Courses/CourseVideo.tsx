
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Play } from "lucide-react";

interface CourseVideoProps {
  videoUrl: string;
  title: string;
}

export const CourseVideo: React.FC<CourseVideoProps> = ({ videoUrl, title }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900">
      <div className="aspect-video">
        <video
          className="w-full h-full"
          controls
          controlsList="nodownload"
          onLoadedData={() => setIsLoading(false)}
          poster="/placeholder.svg"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-900">
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
    </div>
  );
};
