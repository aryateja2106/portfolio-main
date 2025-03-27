import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Fira_Code } from 'next/font/google'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
// import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: "Arya Teja Rudraraju | AI Engineer & Automation Specialist",
    template: "%s • Arya Teja Rudraraju"
  },
  description: "AI Engineer specializing in LLMs, generative AI, and automation solutions for business challenges",
  metadataBase: new URL('https://aryarudraraju.com'), // Replace with your actual domain when available
  applicationName: "Arya Teja Rudraraju's Portfolio",
  authors: [
    { name: 'Arya Teja Rudraraju', url: 'https://linkedin.com/in/arya-teja-rudraraju' }
  ],
  category: 'Portfolio Website',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'LLMs',
    'Generative AI',
    'NextJS',
    'Python',
    'JavaScript',
    'TypeScript',
    'AI Marketing',
    'Automation',
    'Langchain',
    'Crew AI'
  ],
  robots: {
    follow: true,
    index: true
  },
  openGraph: {
    title: "Arya Teja Rudraraju | AI Engineer & Automation Specialist",
    description: "AI Engineer specializing in LLMs, generative AI, and automation solutions for business challenges",
    siteName: "Arya Teja Rudraraju",
    type: 'website',
    url: '/',
    emails: [
      'aryateja2106@gmail.com'
    ]
  },
  twitter: {
    title: "Arya Teja Rudraraju | AI Engineer & Automation Specialist",
    description: "AI Engineer specializing in LLMs, generative AI, and automation solutions for business challenges",
    card: 'summary_large_image'
  }
}

export const viewport: Viewport = {
  themeColor: '#060606', // Only using dark theme
  colorScheme: 'dark', // Only using dark theme
  width: 'device-width',
  initialScale: 1
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap'
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira-code',
  display: 'block'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`scroll-smooth bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-300 selection:bg-neutral-1000 selection:text-neutral-50 dark:selection:bg-neutral-50 dark:selection:text-neutral-1000 ${inter.variable} ${poppins.variable} ${firaCode.variable}`}
      >
        {/* <Providers> */}
          <div className="relative">
            <Header />
            <div>{children}</div>
            <Footer />
          </div>
        {/* </Providers> */}
      </body>
    </html>
  )
}