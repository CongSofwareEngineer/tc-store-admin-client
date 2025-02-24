import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@/styles/aos.css';
import ClientRender from '@/components/ClientRender';
import MantineConfig from '@/components/MantineConfig';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import dynamic from 'next/dynamic';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import ClientApi from '@/services/clientApi';
import Footer from '@/components/Footer';
const LoadingFirstPage = dynamic(() => import('@/components/LoadingFirstPage'));
const inter = Inter({ subsets: ['latin'] });

const BaseMeta = {
	title: process.env.NEXT_PUBLIC_TITLE,
	description: process.env.NEXT_PUBLIC_TITLE_DES,
	images: process.env.NEXT_PUBLIC_IMAGE,
	url: 'https://tcstore.vercel.app',
};
export const metadata: Metadata = {
	metadataBase: new URL(BaseMeta.url),
	title: BaseMeta.title,
	description: BaseMeta.description,
	keywords: ['Coffee Tây Nguyên', 'Cà Phê Tây Nguyên', 'TC Store', 'TC Shop', 'Cà phê Gia Lai', 'yến sào', 'laptop', 'cây cảnh', 'nước hoa', 'cà phê', 'cửa hàng đa sản phẩm', 'mua sắm online', 'sản phẩm chất lượng'],
	openGraph: {
		title: BaseMeta.title,
		description: BaseMeta.description,
		images: BaseMeta.images,
		siteName: BaseMeta.title,
		url: BaseMeta.url,
		phoneNumbers: ['0392225405', '0397373405'],
		locale: 'vi',
		emails: 'hodiencong2000@gmail.com',
		countryName: 'Vietnamese',
	},
	bookmarks: BaseMeta.url,
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	applicationName: BaseMeta.title,
	icons: {
		icon: { url: '/favicon.ico' },
		shortcut: { url: '/favicon.ico' },
		apple: { url: '/favicon.ico' },
	},
	manifest: '/manifest.json',
	twitter: {
		title: BaseMeta.title,
		description: BaseMeta.description,
		card: 'summary_large_image',
		images: BaseMeta.images,
		site: BaseMeta.url,
	},
	appleWebApp: {
		title: BaseMeta.title,
		capable: true,
	},
	verification: {
		// google: '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk',
		google: 'Sr2q2elTmvBwx7P3aM-ZiaH-3yjcxuGHrMI9H9iCewI',
	},
	appLinks: {
		web: {
			url: BaseMeta.url,
			should_fallback: true,
		},
	},
	category: 'fashion',
};

export const viewport: Viewport = {
	themeColor: 'black',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const menuCategory = await ClientApi.getCategory();

	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={`${inter.className} antialiased`}>
				<MantineConfig>
					<ReactQueryProvider>
						<StyledComponentsRegistry>
							<ClientRender menuCategory={menuCategory?.data || []}> {children}</ClientRender>
							<Footer />
							<LoadingFirstPage />
						</StyledComponentsRegistry>
					</ReactQueryProvider>
				</MantineConfig>
			</body>
		</html>
	);
}
