import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'reproducer-jeep-sqlite',
  webDir: 'dist/reproducer-jeep-sqlite/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
