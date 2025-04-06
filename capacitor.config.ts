
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a53ce7696a9b4d489a1765d0c6d36e09',
  appName: 'handiview-nutrition-helper',
  webDir: 'dist',
  server: {
    url: 'https://a53ce769-6a9b-4d48-9a17-65d0c6d36e09.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#ffffffff",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
