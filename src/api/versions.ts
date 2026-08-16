import { request } from './client';

interface VersionResponse {
  frontendVersion: string;
  backendVersion?: string;
  backendUrl: string;
}

// This endpoint is meant to be accessed manually by typing the URL
// It's not linked from the UI
export const versionsApi = {
  getVersions: async (): Promise<VersionResponse> => {
    // Get frontend version from package.json (injected at build time)
    const frontendVersion = import.meta.env.VITE_APP_VERSION || '0.1.4';

    try {
      // Try to get backend version if available
      const backendVersion = await request<{ version: string }>('/version');
      return {
        frontendVersion,
        backendVersion: backendVersion.version,
        backendUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/v1',
      };
    } catch (error) {
      // If backend version endpoint doesn't exist, return without it
      return {
        frontendVersion,
        backendUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/v1',
      };
    }
  },
};