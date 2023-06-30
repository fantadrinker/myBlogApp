import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/global.css'
import { Roboto_Slab } from 'next/font/google'

const roboto = Roboto_Slab({
    weights: [400, 700],
    subsets: ['latin']
})

export const metadata = {
  title: 'Blogs',
  description: 'A blog app built with Next.js',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Blogs',
    description: 'A blog app built with Next.js',
  },
  twitter: {
    card: 'summary_large_image',
  }
}

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <div className={roboto.className}>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    )
}