
export async function POST(request) {
  const { postId, author, comment } = await request.json()
  console.log(111, postId, author, comment)
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