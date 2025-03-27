/** @type {import('next').NextConfig} */

// import { readFile } from 'fs/promises'

// const json = (await readFile(new URL('./env.json', import.meta.url))).toString('utf-8')

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      }
    ],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}

if (process.env.NEXT_PUBLIC_ENV === 'production') {
  console.log('start env production');

  nextConfig.experimental = {
    workerThreads: true,
    gzipSize: true,
    swcMinify: true,
    optimizeCss: true,
    optimizePackageImports: [
      'antd',
      'bignumber.js',
      'moment',
      'lodash',
    ]
  }
  nextConfig.eslint = {
    dirs: ['app', 'hook', 'components', 'configs', 'utils', 'zustand', 'constant', 'services']
  }
  nextConfig.compress = true
  nextConfig.swcMinify = true
  nextConfig.optimizeFonts = true
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
