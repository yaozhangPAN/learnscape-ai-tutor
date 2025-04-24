
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type TrackingOptions = {
  pageUrl?: string;
  componentId?: string;
  actionDetails?: Record<string, any>;
  metadata?: Record<string, any>;
  sessionId?: string;
  duration?: number;
};

/**
 * Tracks user behavior in the application
 * @param activityType The type of activity being tracked
 * @param options Additional tracking options
 */
export const trackUserBehavior = async (
  activityType: Tables<"user_behavior_tracking">["activity_type"],
  options: TrackingOptions = {}
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.warn("Cannot track behavior: No authenticated user");
      return null;
    }

    // Get current page URL if not provided
    const pageUrl = options.pageUrl || window.location.pathname;

    // Get basic metadata if not provided
    const defaultMetadata = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      referrer: document.referrer || null,
    };

    const metadata = {
      ...defaultMetadata,
      ...options.metadata,
    };

    // Call the database function to track behavior
    const { data, error } = await supabase.rpc('track_user_behavior', {
      p_user_id: user.id,
      p_activity_type: activityType,
      p_page_url: pageUrl,
      p_component_id: options.componentId,
      p_action_details: options.actionDetails,
      p_metadata: metadata,
      p_session_id: options.sessionId,
      p_duration: options.duration
    });

    if (error) {
      console.error("Error tracking user behavior:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Unexpected error tracking user behavior:", error);
    return null;
  }
};

/**
 * Tracks page views when a component mounts
 * @param pageName The name of the page being viewed
 */
export const usePageViewTracking = (pageName: string) => {
  React.useEffect(() => {
    const startTime = new Date();
    
    // Track page view on mount
    trackUserBehavior('page_view', {
      componentId: pageName,
      actionDetails: { page: pageName }
    });
    
    return () => {
      // Track time spent when component unmounts
      const duration = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
      trackUserBehavior('time_spent', {
        componentId: pageName,
        duration,
        actionDetails: { page: pageName, seconds: duration }
      });
    };
  }, [pageName]);
};

/**
 * Track clicks on UI elements
 * @param elementId Identifier for the clicked element
 * @param details Additional click details
 */
export const trackClick = (elementId: string, details: Record<string, any> = {}) => {
  trackUserBehavior('click', {
    componentId: elementId,
    actionDetails: details
  });
};
