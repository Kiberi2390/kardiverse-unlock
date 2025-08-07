import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1f172670e7d94e5083852e727ab855a8',
  appName: 'kardiverse-unlock',
  webDir: 'dist',
  server: {
    url: 'https://1f172670-e7d9-4e50-8385-2e727ab855a8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false
    }
  }
};

export default config;