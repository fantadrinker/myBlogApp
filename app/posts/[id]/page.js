import Layout from '../../../components/layout'
import Date from '../../../components/date'
import utilStyles from '../../../styles/utils.module.css'
import { getAllPostIds, getPostData } from './actions'
import ImageGallery from '../../../components/ImageGallery'

export async function generateStaticParams() {
  return getAllPostIds()
}

export async function generateMetadata({ params }) {
  return {
    title: (await getPostData(params.id)).title
  }
}

export default async function Post({ params }) {
  const postData = await getPostData(params.id)

  return (<Layout>
    <article>
      {postData.images && (<ImageGallery images={postData.images} />)}
      <h1 data-cy="blog-title" className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
    </article>
    <div dangerouslySetInnerHTML={{__html: postData.contentHtml }} />
  </Layout>)
}