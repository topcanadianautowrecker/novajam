import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Nunito_Sans } from 'next/font/google'
import Header from '@/components/sections/Header/Header';

const font = Nunito_Sans({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
})

export const metadata = {
  title: 'Blueberry',
  description: 'Blueberry theme - English for Children',
}
const headerData = {
  logo: {
    text: "BlueBERRY",
    src: "",
  },
  nav: [
    {
      title: "IMPACT",
      url: "/demos/blueberry/impact"
    },
    {
      title: "TRAINING",
      url: "/demos/blueberry/training"
    },
    {
      title: "TECHNOLOGY",
      url: "/demos/blueberry/technology"
    },
    {
      title: "FAQ",
      url: "/demos/blueberry/faq"
    },
    {
      title: "CONTACT",
      url: "/demos/apple-seed/contact"
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header data={headerData} bottomBordered={true} shadowed={false} fontBold={true} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}