import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { getComments } from '../../../lib/database'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const {
    content,
    data
  } = matter(fileContents)

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
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

export async function getAllComments(id) {
  let res = []
  try {
    res = await getComments(id)
  } catch (err) {
    console.log("error fetching comments", err)
  }
  console.log('debug, res', res)
  return res.map(({
    comment,
    email,
    created
  }) => ({
    text: comment,
    email,
    created
  }));
}
