'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Header.module.css'
import utilStyles from '../styles/utils.module.css'
import profileImage from '../public/images/profile2.jpg'

const name = 'Fred Cui'
export default function Header() {
  const pathname = usePathname()
  const home = pathname === '/'
  return (
    <header className={ `${styles.header} ${styles.animateHeader}`} >
      <Image unoptimized
        src={profileImage}
        className={`${utilStyles.borderCircle} ${home? styles.homeHeaderIcon: styles.blogHeaderIcon}`}
        height={home? 144: 108}
        width={home? 144: 108}
        alt={name}
      />
      <h2 className={home? styles.homeHeaderTitle: styles.blogHeaderTitle}>
        {home? name: (<Link href="/">{name}</Link>)}
      </h2>
    </header>
  )
}