
// This file should directly export the toast components and hooks rather than 
// re-exporting from another file to avoid circular dependencies
import { useToast as useToastOriginal, toast as toastOriginal } from "@/hooks/use-toast";

export const useToast = useToastOriginal;
export const toast = toastOriginal;
