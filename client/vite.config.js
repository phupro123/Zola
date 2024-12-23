import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["logo.svg"],
  manifest: {
    name: "Zola",
    short_name: "Social app",
    description: "Social network application",
    icons: [
      {
        src: "/logo.svg",
        sizes: "192x192",
        type: "image/svg",
      },
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), VitePWA(manifestForPlugin)],
});