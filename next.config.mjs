 
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
}

//for production
if (process.env.NEXT_PUBLIC_ENV === 'production') {
  nextConfig.eslint = {
    ignoreDuringBuilds: true,
  }
  nextConfig.experimental = {
    optimizePackageImports: [
      'moment',
      'lodash',
      '@mantine/core',
      '@mantine/dates',
      '@mantine/hooks',
      '@tanstack/react-query',
      'styled-components',
    ],
    
  }
  nextConfig.output = 'standalone'
  nextConfig.reactStrictMode = true

  nextConfig.compress = true
  nextConfig.productionBrowserSourceMaps = false

  nextConfig.cleanDistDir = true
  nextConfig.compiler = {
    removeConsole: true,
    reactRemoveProperties: true,
    styledComponents: {
      displayName: true,
      ssr: true,
      minify: true,
    },
  }
}

export default nextConfig
