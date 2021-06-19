import { defineConfig } from 'vite'
const reactSvgPlugin = require('vite-plugin-react-svg');
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), reactSvgPlugin()]
})
