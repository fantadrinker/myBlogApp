'use client'
import { usePathname } from "next/navigation";
import PostCommentForm from "./PostCommentForm";


export function SideBar() {
  const pathname = usePathname()
  const isPost = pathname.startsWith('/posts/')
  const postId = isPost && pathname.split('/')[2]
  return isPost && (
    <PostCommentForm postId={postId} compact />
  )
}