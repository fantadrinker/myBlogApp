'use client'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useSearchParams} from 'next/navigation'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import profileImage from '../public/images/profile2.jpg'

const name = 'Fred Cui'

const siteTitle = 'Blogs'

export default function Layout({ children, home }) {
    const searchParams = useSearchParams()

    const animateHeader = searchParams.get('animateHeader')
    const linkToHomeWithHeaderAnimation = {
        pathname: '/',
        query: {
            animateHeader: 1
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(siteTitle)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {home? (
                <header className={animateHeader? `${styles.header} ${styles.animateHeader}`: styles.header} >
                    <Image
                        priority
                        src={profileImage}
                        className={`${utilStyles.borderCircle} ${styles.homeHeaderIcon}`}
                        height={144}
                        width={144}
                        alt={name}
                    />
                    <h2 className={styles.homeHeaderTitle}>
                        {name}
                    </h2>
                </header>
            ): (
                <header className={animateHeader? `${styles.header} ${styles.animateHeader}`: styles.header} >
                    <Link href="/">
                        <Image 
                            priority
                            src={profileImage}
                            className={`${utilStyles.borderCircle} ${styles.blogHeaderIcon}`}
                            height={108}
                            width={108}
                            alt={name}
                        />
                    </Link>
                    <h2 className={styles.blogHeaderTitle}>
                        <Link className={utilStyles.colorInherit} href="/">
                            {name}
                        </Link>
                    </h2>
                </header>
            )}
            <main>{children}</main>
            {!home && (
                <div data-cy="back-to-home" className={styles.backToHome}>
                    <Link href="/">
                        &#x1F519; back to home
                    </Link>
                </div>
            )}
        </div>
    )
}