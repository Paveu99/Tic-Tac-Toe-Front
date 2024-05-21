import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@types': 'C:/Users/W11/Desktop/Projects/Tic Tac Toe App/tictactoeback/types/*'
    }
  },
  server: {
    host: command === 'serve' ? '0.0.0.0' : 'localhost',
  },
}));
