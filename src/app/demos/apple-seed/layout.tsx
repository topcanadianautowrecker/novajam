import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Source_Sans_Pro } from 'next/font/google'
import Header from '@/components/sections/Header/Header';

const font = Source_Sans_Pro({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ["200", "300","400", "600", "700", "900"]
})

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }
const headerData = {
  logo: {
    text: "AppleSeed",
    src: "",
  },
  nav: [
    {
      title: "INTRO",
      url: "/demos/apple-seed/intro"
    },
    {
      title: "CONTACT",
      url: "/demos/apple-seed/contact"
    },
    {
      title: "BLOG",
      url: "/demos/apple-seed/blog"
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
        <Header data={headerData} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}