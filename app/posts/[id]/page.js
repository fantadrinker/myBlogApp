import Date from '../../../components/date'
import utilStyles from '../../../styles/utils.module.css'
import styles from './page.module.css'
import { getAllPostIds, getPostData, getAllComments  } from './actions'
import ImageGallery from '../../../components/ImageGallery'
import { isEmpty } from 'ramda'
import PostCommentForm from '../../../components/PostCommentForm'

export async function generateStaticPaths() {
  return getAllPostIds()
}

export async function generateMetadata({ params }) {
  return {
    title: (await getPostData(params.id)).title
  }
}

export default async function Post({ params }) {
  const postData = await getPostData(params.id)
  const comments = await getAllComments(params.id)

  return (<>
    <section id="post">
      <article>
        {postData.images && (<ImageGallery images={postData.images} />)}
        <h1 data-cy="blog-title" className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
      </article>
      <div className={styles.fmtblk} dangerouslySetInnerHTML={{__html: postData.contentHtml }} />
    </section>
    <section id="comments">
      <PostCommentForm postId={params.id} />
      {!isEmpty(comments) && (<>
        <h2>Comments</h2>
        <ul>
          {comments.map(({
            comment,
            author
          }, index) => comment && author && (
            <li key={`comment_${index}`} className="pt-2">
              <p>{comment} <span className="float-right text-sm">- {author}</span></p>
            </li>
          ))}
        </ul>
      </>)}
    </section>
  </>)
}