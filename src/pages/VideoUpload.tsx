
import React from "react";
import { VideoUploadStatus } from "@/components/VideoUpload/VideoUploadStatus";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const VideoUpload = () => {
  const { user } = useAuth();

  // Only allow authenticated users
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">上传课程视频</h1>
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <VideoUploadStatus courseId="test-course" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
