import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    preview: {
        port: 4137,
        strictPort: true,
        host: '0.0.0.0',
        allowedHosts: true,
    },
    plugins: [react()],
});
