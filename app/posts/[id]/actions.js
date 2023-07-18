import fs from 'fs'
import { Client } from 'pg'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

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

export async function getAllComments(id) {
  await client.connect()
  let res = []
  try {
    res = (await client.query('SELECT text, email FROM comments WHERE post_id = $1', [id])).rows
  } catch (err) {
    console.log("error fetching comments", err)
  } finally {
    await client.end()
  }
  console.log('debug, res', res)
  return res;
}
