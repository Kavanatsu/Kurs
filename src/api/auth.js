import axios from '@/api/axios'

const login = (credentials) => {
  return axios.post('/login', credentials)
}

const register = (credentials) => {
  return axios.post('/register', credentials)
}

const logout = (credentials) => {
  return axios.delete('/logout', credentials)
}

export default {
  login,
  register,
  logout,
}