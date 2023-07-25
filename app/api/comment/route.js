import { postComment } from "../../../lib/database"

export async function POST(request) {
  const { postId, author, comment } = await request.json()
  console.log(111, postId, author, comment)
  try {
    const response = await postComment(postId, author, comment)
    console.log(222, response)
  } catch (err) {
    console.log("error posting comment", err)
    return new Response(JSON.stringify({
      id: 'none'
    }), {
      status: 500,
    })
  }

  return new Response(JSON.stringify({
    id: 'none'
  }), {
    status: 200,
  })
}

export async function GET(request) {
  return {
    status: 200,
    body: ["hello", "world"]
  }
}
