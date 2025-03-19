import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import scsskitVitePlugin from 'scsskit/plugins/vite'; 
import type { UserConfig } from 'vite';

const config: UserConfig = defineConfig({
  plugins: [
    scsskitVitePlugin(),
    react()
  ],
  server: {
    port: 3000
  }
});

export default config;