import '../styles/global.css'
import { Roboto_Slab } from 'next/font/google'

const roboto = Roboto_Slab({
    weights: [400, 700],
    subsets: ['latin']
})

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <main className={roboto.className}>
            {children}
          </main>
        </body>
      </html>
    )
}