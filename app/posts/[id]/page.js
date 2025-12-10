import Date from '../../../components/date'
import utilStyles from '../../../styles/utils.module.css'
import styles from './page.module.css'
import { getAllPostIds, getPostData, getAllComments } from './actions'
import ImageGallery from '../../../components/ImageGallery'
import { isEmpty } from 'ramda'

export async function generateStaticPaths() {
  return getAllPostIds()
}

export async function generateMetadata({ params }) {
  const {id} = await params
  return {
    title: (await getPostData(id)).title
  }
}

export default async function Post({ params }) {
  const {id} = await params
  const postData = await getPostData(id)
  const comments = await getAllComments(id)
  return (<>
    <section id="post">
      <article>
        {postData.images && (<ImageGallery images={postData.images} />)}
        <h1 data-cy="blog-title" className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
      </article>
      <div
        className={styles.fmtblk}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </section>
    <section id="comments" data-cy="comments-section">
      {!isEmpty(comments) && (<>
        <h2>Comments</h2>
        <ul>
          {comments.map(({
            text,
            email
          }, index) => text && email && (
            <li key={`comment_${index}`} className="pt-2">
              <p>{text} <span className="float-right text-sm">- {email}</span></p>
            </li>
          ))}
        </ul>
      </>)}
    </section>
  </>)
}
