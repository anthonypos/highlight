import Router from 'next/router'
import nProgress from 'nprogress'

import '../styles/globals.scss'
import '../styles/nprogress.css'
import '../styles/public.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { H } from 'highlight.run'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Analytics from '../components/Analytics'
import { Meta } from '../components/common/Head/Meta'
import MetaImage from '../public/images/meta-image.jpg'
import {
	ErrorBoundary as HighlightErrorBoundary,
	HighlightInit,
} from '@highlight-run/next/client'

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', () => {
	if (window.rudderanalytics) {
		window.rudderanalytics?.page()
	}

	nProgress.done()
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<HighlightErrorBoundary showDialog>
			<HighlightInit
				projectId={'4d7k1xeo'}
				serviceName="highlightio-nextjs-frontend"
				tracingOrigins
				networkRecording={{
					enabled: true,
					recordHeadersAndBody: true,
				}}
			/>
			<Head>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				></link>

				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Meta
				title="highlight.io: The open source monitoring platform."
				description="highlight.io is the open source monitoring platform that gives you the visibility you need."
				absoluteImageUrl={`https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}${MetaImage.src}`}
			/>
			<Component {...pageProps} />
			<SpeedInsights />
			<Analytics />
		</HighlightErrorBoundary>
	)
}

export default MyApp
