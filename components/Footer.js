'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Footer.module.css'

export default function Footer() {
  const pathname = usePathname()
  return pathname !== '/' && (
    <footer data-cy="back-to-home" className={styles.backToHome}>
      <Link href="/">
        &#x1F519; back to home
      </Link>
    </footer>
  )
}