'use client';

import { useRef } from "react";

function PostCommentForm(props) {
  const commentArea = useRef(null)
  const handleSubmitComment = async (event) => {
    event.preventDefault()
    const comment = commentArea.current.value
    await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({
        comment,
        author: 'Anonymous',
        postId: props.postId
      })
    })
    event.target.comment.value = ''
  }
  return (
    <form className={`flex ${props.compact? 'flex-col': 'flex-row'} items-end`} onSubmit={handleSubmitComment}>
      <textarea id="comment" name="comment" className={`px-2 py-1 ${props.compact? 'w-full': 'w-2/3'} h-20 rounded-md bg-slate-700`} ref={commentArea} ></textarea>
      <input type="submit" value="Post Comment" className="ml-2 bg-cyan-700 text-xs" />
    </form>
  )
}

export default PostCommentForm