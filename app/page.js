import Link from 'next/link'
import Date from '../components/date'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from './actions'

export const metadata = {
  title: 'Blogs'
}

export default function Home() {
  const allPostsData = getSortedPostsData()
  const getPostLink = (id) => {
    return {
      query: {
        animateHeader: 1
      },
      pathname: `/posts/${id}`
    }
  }
  return (
    <Layout home>
      <section data-cy="summary" className={utilStyles.headingMd}>
        <p>Fred Cui, software developer</p>
        <p>
          <a href="https://nextjs.org/learn">this is where I learned to build this site</a>
        </p>
      </section>
      <section data-cy="blogs" className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blogs</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={getPostLink(id)}>
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
    </Layout>
  )
}
