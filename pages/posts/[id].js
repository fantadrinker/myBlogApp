import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'
import ImageGallery from '../../components/ImageGallery'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({postData}) {
  return (<Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
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
