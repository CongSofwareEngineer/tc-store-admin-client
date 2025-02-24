import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		// optimisticClientCache: true,
		// optimizeCss: true,
		// nextScriptWorkers: true,
		// gzipSize: true,
		// optimizeServerReact: true,
		optimizePackageImports: [
			'moment',
			'lodash',
			'@mantine/core',
			'@mantine/dates',
			'@mantine/hooks',

			// '@tanstack/react-query',
			// 'framer-motion',
			// 'styled-components',
			// 'tailwind-merge',
			// '@emotion/reac',
			// '@ant-design/icons',
			// '@yoopta/editor',
			// '@yoopta/accordion',
			// '@yoopta/action-menu-list',
			// '@yoopta/blockquote',
			// '@yoopta/callout',
			// '@yoopta/code',
			// '@yoopta/divider',
			// '@yoopta/embed',
			// '@yoopta/exports',
			// '@yoopta/file',
			// '@yoopta/headings',
			// '@yoopta/image',
			// '@yoopta/link',
			// '@yoopta/link-tool',
			// '@yoopta/lists',
			// '@yoopta/marks',
			// '@yoopta/paragraph',
			// '@yoopta/table',
			// '@yoopta/toolbar',
			// '@yoopta/video',
			// 'zustand',
			// 'antd',
			// 'antd-img-crop',
			// 'bignumber.js',
			// 'moment',
			// 'lodash',
			// 'firebase',
			// 'aos',
			// 'react-lottie',
			// 'react-phone-input-2',
			// 'react-share',
			// 'slate',
			// 'react-intersection-observer',
			// '@ant-design/nextjs-registry',
		],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	compress: true,
	// optimizeFonts: true,
	cleanDistDir: true,
	compiler: {
		removeConsole: !!process.env.REMOVE_CONSOLE_LOG,
		reactRemoveProperties: true,
		styledComponents: {
			displayName: true,
			ssr: true,
			minify: true,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
				pathname: '/**',
			},
		],
	},
	webpack: (config) => {
		config.externals.push('pino-pretty', 'lokijs', 'encoding');
		return config;
	},
};

export default nextConfig;
