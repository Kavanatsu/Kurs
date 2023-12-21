import axios from '@/api/axios'

const addComment = (credentials) => {
  return axios.post(`/posts/${credentials.postId}/comments?text=${credentials.text}`, credentials)
}

const changeComment = (credentials) => {
  return axios.patch(`/comments/${credentials.commentId}?text=${credentials.text}`, credentials)
}

export default {
 addComment,
 changeComment
}