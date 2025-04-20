
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// File size limits
export const ADMIN_MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
export const PRO_MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
export const SUPABASE_FREE_LIMIT = 50 * 1024 * 1024; // 50MB

export const getMaxFileSize = (isAdmin: boolean, isPremium: boolean): number => {
  if (isAdmin) return ADMIN_MAX_FILE_SIZE;
  return isPremium ? PRO_MAX_FILE_SIZE : SUPABASE_FREE_LIMIT;
};
