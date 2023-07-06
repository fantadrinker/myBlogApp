'use client';

import { useRef } from "react";

function PostCommentForm(props) {
  const commentArea = useRef(null)
  const handleSubmitComment = async (event) => {
    event.preventDefault()
    console.log(111, event)
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
    <form className="flex flex-row items-end" onSubmit={handleSubmitComment}>
      <textarea id="comment" name="comment" className="w-48 h-28 rounded-md" ref={commentArea} ></textarea>
      <input type="submit" value="Post Comment" className="pl-2" />
    </form>
  )
}

export default PostCommentForm