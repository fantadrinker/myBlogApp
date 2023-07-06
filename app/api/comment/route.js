import { collection, addDoc } from 'firebase/firestore'
import db from '../../../lib/firestore'

export async function POST(request) {
  const { postId, author, comment } = await request.json()
  console.log(111, postId, author, comment)
  const docRef = await addDoc(collection(db, 'comments'), {
    author: author || 'anonymous',
    comment,
    postId
  })
  return new Response(JSON.stringify({
    id: docRef.id
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