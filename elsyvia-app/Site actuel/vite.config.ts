import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path"; // <-- AJOUT DE CET IMPORT

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  
  // --- AJOUT DU BLOC POUR LES ALIAS DE CHEMIN ---
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ---------------------------------------------
});
