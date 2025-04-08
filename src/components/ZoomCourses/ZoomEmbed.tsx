import { useState, useEffect, useRef } from 'react';
import { Check, Loader2, Video, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ZoomEmbedProps {
  onClose: () => void;
  userName?: string;
}

const formSchema = z.object({
  meetingNumber: z.string().min(8, {
    message: "Meeting number must be at least 8 characters.",
  }),
  meetingPassword: z.string().min(1, {
    message: "Password is required",
  }),
});

const ZoomEmbed = ({ onClose, userName = "Guest User" }: ZoomEmbedProps) => {
  const [loading, setLoading] = useState(false);
  const [sdkLoading, setSdkLoading] = useState(false);
  const [zoomLoaded, setZoomLoaded] = useState(false);
  const [joinedMeeting, setJoinedMeeting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const zoomContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingNumber: "",
      meetingPassword: "",
    },
  });

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    // Only load Zoom SDK after form is submitted
    if (!zoomLoaded) return;

    const loadZoomSDK = async () => {
      setSdkLoading(true);
      
      try {
        console.log("Loading Zoom SDK scripts...");
        // Load scripts in sequence to ensure proper loading order
        await loadScript('https://source.zoom.us/2.18.0/lib/vendor/react.min.js');
        await loadScript('https://source.zoom.us/2.18.0/lib/vendor/react-dom.min.js');
        await loadScript('https://source.zoom.us/2.18.0/lib/vendor/redux.min.js');
        await loadScript('https://source.zoom.us/2.18.0/lib/vendor/redux-thunk.min.js');
        await loadScript('https://source.zoom.us/2.18.0/zoom-meeting-2.18.0.min.js');
        
        console.log("All Zoom SDK scripts loaded successfully");
        // Give a small delay to ensure scripts are fully initialized
        setTimeout(() => {
          if (window.ZoomMtg) {
            console.log("ZoomMtg object available");
            initializeZoom();
          } else {
            console.error("ZoomMtg object not available after loading scripts");
            setError("Failed to initialize Zoom SDK. Please try again.");
            setSdkLoading(false);
            setLoading(false);
          }
        }, 1000);
      } catch (err) {
        console.error("Error loading Zoom SDK:", err);
        setError('Failed to load Zoom SDK. Please check your internet connection and try again.');
        setSdkLoading(false);
        setLoading(false);
      }
    };

    loadZoomSDK();

    return () => {
      // Clean up any Zoom artifacts
      if (window.ZoomMtg) {
        try {
          window.ZoomMtg.endMeeting({});
        } catch (e) {
          console.error("Error ending Zoom meeting:", e);
        }
      }
    };
  }, [zoomLoaded]);

  const getZoomSignature = async (meetingNumber: string): Promise<{ signature: string, sdkKey: string } | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-zoom-signature', {
        body: { meetingNumber, role: 0 } // 0 for attendee, 1 for host
      });
      
      if (error) {
        console.error('Error calling signature function:', error);
        setError(`Failed to generate meeting signature: ${error.message}`);
        return null;
      }
      
      return data as { signature: string, sdkKey: string };
    } catch (err) {
      console.error('Exception getting Zoom signature:', err);
      setError('Error connecting to Zoom service. Please try again later.');
      return null;
    }
  };

  const initializeZoom = async () => {
    console.log("Initializing Zoom...");
    if (!window.ZoomMtg) {
      console.error("ZoomMtg is not defined");
      setError('Zoom SDK not loaded. Please refresh and try again.');
      setSdkLoading(false);
      setLoading(false);
      return;
    }

    const { meetingNumber, meetingPassword } = form.getValues();
    console.log("Meeting credentials:", { meetingNumber, meetingPassword });

    try {
      window.ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av');
      window.ZoomMtg.preLoadWasm();
      window.ZoomMtg.prepareWebSDK();
      
      // Get signature from server
      const signatureData = await getZoomSignature(meetingNumber);
      
      if (!signatureData) {
        setLoading(false);
        setSdkLoading(false);
        return;
      }
      
      const { signature, sdkKey } = signatureData;
      const zoomLeaveUrl = window.location.href;

      console.log("Initializing Zoom meeting with server-generated signature");
      window.ZoomMtg.init({
        leaveUrl: zoomLeaveUrl,
        disableInvite: true,
        disableRecord: true,
        success: () => {
          console.log("Zoom initialized successfully, attempting to join meeting");
          window.ZoomMtg.join({
            meetingNumber: meetingNumber,
            passWord: meetingPassword,
            userName: userName,
            signature: signature,
            sdkKey: sdkKey,
            success: () => {
              console.log("Joined Zoom meeting successfully");
              setLoading(false);
              setSdkLoading(false);
              setJoinedMeeting(true);
              toast({
                title: "Connected to Zoom",
                description: "You have successfully joined the meeting.",
              });
            },
            error: (error: any) => {
              console.error("Failed to join meeting:", error);
              setError(`Failed to join meeting: ${error.errorMessage || 'Make sure your meeting ID and password are correct'}`);
              setLoading(false);
              setSdkLoading(false);
            }
          });
        },
        error: (error: any) => {
          console.error("Failed to initialize Zoom:", error);
          setError(`Failed to initialize Zoom: ${error.errorMessage || 'Unknown error'}`);
          setLoading(false);
          setSdkLoading(false);
        }
      });
    } catch (e) {
      console.error("Exception during Zoom initialization:", e);
      setError('Error initializing Zoom. Please try again.');
      setLoading(false);
      setSdkLoading(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    setLoading(true);
    setError(null);
    setZoomLoaded(true); // This will trigger the useEffect to load the SDK
  };

  if (loading && sdkLoading) {
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
          <div className="flex items-center mb-3">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-xl font-medium text-red-700">Connection Error</h3>
          </div>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-600 mb-4">
            This could be due to incorrect meeting credentials or network issues. Please check your meeting details and try again.
          </p>
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => {
              setError(null);
              setZoomLoaded(false);
              form.reset();
            }}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!zoomLoaded) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-learnscape-darkBlue mb-6 flex items-center">
            <Video className="mr-2 h-5 w-5" /> Join Zoom Meeting
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="meetingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter meeting ID" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="meetingPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between pt-2">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Join Meeting
                </Button>
              </div>
            </form>
          </Form>
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
      <div id="zmmtg-root" ref={zoomContainerRef} className="flex-grow" style={{ height: 'calc(100vh - 65px)' }}></div>
    </div>
  );
};

export default ZoomEmbed;

declare global {
  interface Window {
    ZoomMtg: any;
  }
}
