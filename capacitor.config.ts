import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'reproducer-jeep-sqlite',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
