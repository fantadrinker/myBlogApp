import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { collection, getDocs } from 'firebase/firestore'
import db from '../../../lib/firestore'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const {
    content,
    data
  } = matter(fileContents)

  const processedContent = await remark()
      .use(html)
      .process(content)
  const contentHtml = processedContent.toString()

  const {
    images,
    title,
    date
  } = data

  // Combine the data with the id
  return {
    id,
    contentHtml,
    images: images?.map(url => 
      `${process.env.S3_IMAGES_BASE_URL}${url}`
    ),
    title,
    date
  }
}


export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => ({
    id: fileName.replace(/\.md$/, '')
  }))
}

export async function getAllComments() {
  const querySnapshots = await getDocs(collection(db, 'comments'))
  return querySnapshots.docs.map(doc => doc.data())
}