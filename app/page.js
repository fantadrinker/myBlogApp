import Link from 'next/link'
import Date from '../components/date'
import { getSortedPostsData } from './actions'

export const metadata = {
  title: 'Blogs'
}

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <main className="">
      <section data-cy="summary" className="text-lg">
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
      <section data-cy="blogs" className="text-lg pt-0">
				<button>
					<Link href={`/create-post`}>
						Create Post
					</Link>
				</button>
        <h2 className="text-xl my-4">Blogs</h2>
        <ul className="list-none p-0 m-0">
          {allPostsData.map(({id, date, title}) => (
            <li className="mb-5" key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className="text-neutral-500">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
