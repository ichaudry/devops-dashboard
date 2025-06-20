import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
	host: '0.0.0.0',
        allowedHosts: [
          'ec2-13-51-198-101.eu-north-1.compute.amazonaws.com'
    ]
  },
})
