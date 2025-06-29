import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Production build optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
          pdf: ['jspdf', 'html2canvas'],
          qrcode: ['qrcode'],
        },
      },
    },
    sourcemap: false,
    // Generate a report.html file with bundle size analysis
    reportCompressedSize: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
});