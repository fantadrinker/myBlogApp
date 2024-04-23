import Footer from '../components/Footer'
import Header from '../components/Header'
import { SideBar } from '../components/SideBar'
import '../styles/global.css'
import { Roboto_Slab } from 'next/font/google'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const showSidebar = false

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
          <main className={roboto.className}>
            <main>
              <Header />
              {children}
              <Footer />
            </main>
            {showSidebar && <aside><SideBar />
            </aside>}
          </main>
        </body>
      </html>
    )
}