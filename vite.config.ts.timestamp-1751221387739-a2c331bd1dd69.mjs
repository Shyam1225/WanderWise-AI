// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    // Production build optimizations
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "lucide-react", "clsx", "tailwind-merge"],
          pdf: ["jspdf", "html2canvas"],
          qrcode: ["qrcode"]
        }
      }
    },
    sourcemap: false,
    // Generate a report.html file with bundle size analysis
    reportCompressedSize: true
  },
  server: {
    port: 3e3,
    strictPort: true,
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gUHJvZHVjdGlvbiBidWlsZCBvcHRpbWl6YXRpb25zXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHJlYWN0OiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgdWk6IFsnZnJhbWVyLW1vdGlvbicsICdsdWNpZGUtcmVhY3QnLCAnY2xzeCcsICd0YWlsd2luZC1tZXJnZSddLFxuICAgICAgICAgIHBkZjogWydqc3BkZicsICdodG1sMmNhbnZhcyddLFxuICAgICAgICAgIHFyY29kZTogWydxcmNvZGUnXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIC8vIEdlbmVyYXRlIGEgcmVwb3J0Lmh0bWwgZmlsZSB3aXRoIGJ1bmRsZSBzaXplIGFuYWx5c2lzXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWUsXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICBob3N0OiB0cnVlLFxuICB9LFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsRUFDMUI7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBLElBRUwsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osT0FBTyxDQUFDLFNBQVMsYUFBYSxrQkFBa0I7QUFBQSxVQUNoRCxJQUFJLENBQUMsaUJBQWlCLGdCQUFnQixRQUFRLGdCQUFnQjtBQUFBLFVBQzlELEtBQUssQ0FBQyxTQUFTLGFBQWE7QUFBQSxVQUM1QixRQUFRLENBQUMsUUFBUTtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQTtBQUFBLElBRVgsc0JBQXNCO0FBQUEsRUFDeEI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
