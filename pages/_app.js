import '../styles/global.css'
import { Roboto_Slab } from 'next/font/google'

const roboto = Roboto_Slab({
    weights: [400, 700],
    subsets: ['latin']
})

export default function App({ Component, pageProps}) {
    return <main className={roboto.className}>
        <Component {...pageProps} />
    </main>
}