import Link from 'next/link'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from './actions'

export const metadata = {
  title: 'Blogs'
}

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <>
      <section data-cy="summary" className={utilStyles.headingMd}>
        <p>Fred Cui, software developer</p>
        <ul>
          <li>
            <a href="https://nextjs.org/learn">
              this is where I learned to build this site
            </a>
          </li>
          <li>
            <a href="https://github.com/fantadrinker/myBlogApp">
              GitHub Link to this Project
            </a>
          </li>
        </ul>
      </section>
      <section data-cy="blogs" className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blogs</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
