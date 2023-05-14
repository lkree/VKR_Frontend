// eslint-disable-next-line node/no-unpublished-import
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// eslint-disable-next-line node/no-unpublished-import
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: true,
    minify: false,
    target: 'modules',
    commonjsOptions: {
      sourceMap: true
    }
  },
});
