
import { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ZoomEmbedProps {
  meetingNumber: string;
  meetingPassword: string;
  userName: string;
  onClose: () => void;
}

const ZoomEmbed = ({ meetingNumber, meetingPassword, userName, onClose }: ZoomEmbedProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomLoaded, setZoomLoaded] = useState(false);

  useEffect(() => {
    // Load the Zoom Web SDK
    const script = document.createElement('script');
    script.src = 'https://source.zoom.us/2.18.0/lib/vendor/react.min.js';
    script.async = true;
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.src = 'https://source.zoom.us/2.18.0/lib/vendor/react-dom.min.js';
    script2.async = true;
    document.body.appendChild(script2);

    const script3 = document.createElement('script');
    script3.src = 'https://source.zoom.us/2.18.0/lib/vendor/redux.min.js';
    script3.async = true;
    document.body.appendChild(script3);

    const script4 = document.createElement('script');
    script4.src = 'https://source.zoom.us/2.18.0/lib/vendor/redux-thunk.min.js';
    script4.async = true;
    document.body.appendChild(script4);

    const script5 = document.createElement('script');
    script5.src = 'https://source.zoom.us/2.18.0/zoom-meeting-2.18.0.min.js';
    script5.async = true;
    script5.onload = () => {
      setZoomLoaded(true);
      initializeZoom();
    };
    script5.onerror = () => {
      setError('Failed to load Zoom SDK');
      setLoading(false);
    };
    document.body.appendChild(script5);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
      document.body.removeChild(script4);
      document.body.removeChild(script5);
      
      // Clean up any Zoom artifacts
      if (window.ZoomMtg) {
        window.ZoomMtg.endMeeting({});
      }
    };
  }, []);

  const initializeZoom = () => {
    if (!window.ZoomMtg) {
      setError('Zoom SDK not loaded');
      setLoading(false);
      return;
    }

    window.ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av');
    window.ZoomMtg.preLoadWasm();
    window.ZoomMtg.prepareWebSDK();

    // Zoom requires a JWT token signed with your Zoom API secret 
    // for production use, this should be generated server-side
    // For demo purposes, we'll use a mock token
    const mockToken = "MOCK_JWT_TOKEN";
    
    const zoomLeaveUrl = window.location.href;

    window.ZoomMtg.init({
      leaveUrl: zoomLeaveUrl,
      success: () => {
        window.ZoomMtg.join({
          meetingNumber: meetingNumber,
          passWord: meetingPassword,
          userName: userName,
          signature: mockToken,
          sdkKey: "ZOOM_SDK_KEY", // This would be your Zoom SDK key in production
          success: () => {
            setLoading(false);
            console.log('Joined Zoom meeting successfully');
          },
          error: (error: any) => {
            setError(`Failed to join meeting: ${error.errorMessage || 'Unknown error'}`);
            setLoading(false);
            console.error('Failed to join meeting:', error);
          }
        });
      },
      error: (error: any) => {
        setError(`Failed to initialize Zoom: ${error.errorMessage || 'Unknown error'}`);
        setLoading(false);
        console.error('Failed to initialize Zoom:', error);
      }
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-learnscape-blue animate-spin mb-4" />
        <h3 className="text-xl font-medium text-learnscape-darkBlue mb-2">Loading Zoom Meeting</h3>
        <p className="text-gray-600">Please wait while we connect you to your session...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center p-6">
        <div className="bg-red-50 p-6 rounded-lg max-w-md w-full">
          <h3 className="text-xl font-medium text-red-700 mb-3">Connection Error</h3>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-600 mb-4">
            This could be due to missing API credentials or network issues. In a production environment, 
            you would need valid Zoom API credentials.
          </p>
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => window.open('https://zoom.us/join', '_blank')}>
              Open in Zoom App
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="bg-learnscape-darkBlue p-4 flex justify-between items-center text-white">
        <div className="flex items-center">
          <Check className="h-5 w-5 mr-2 text-green-400" />
          <span>Connected to Zoom Session</span>
        </div>
        <Button 
          variant="outline" 
          onClick={onClose}
          className="text-white border-white hover:bg-white hover:text-learnscape-darkBlue"
        >
          Exit Meeting
        </Button>
      </div>
      <div id="zmmtg-root" className="flex-grow" style={{ height: 'calc(100vh - 65px)' }}></div>
    </div>
  );
};

export default ZoomEmbed;

// Add type definition for the ZoomMtg global object
declare global {
  interface Window {
    ZoomMtg: any;
  }
}
