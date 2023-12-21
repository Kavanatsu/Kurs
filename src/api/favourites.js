import axios from '@/api/axios'

const getUser = (userId) => {
  return axios.get(`/users/${userId}`, userId)
}

export default {
	getUser,
}