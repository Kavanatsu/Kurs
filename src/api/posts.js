import axios from '@/api/axios'

const getPosts = () => {
  return axios.get('/posts')
}

const getPost = (postId) => {
  return axios.get(`/posts/${postId}`, postId)
}

const searchPosts = (credentials) => {
  return axios.post(`/posts?title=${credentials}`, credentials)
}

export default {
	getPosts,
	getPost,
	searchPosts
}