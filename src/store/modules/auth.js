import authApi from '@/api/auth'
import {setItem, getItem} from '@/helpers/persistenceStorage'
import axios from 'axios'
import router from '@/router/router'

export const auth = {
  state: () => ({
    currentUser: null,
    tokenUser: null,
    validationErrors: null,
    isLoggedIn: null,
    isAdmin: null,
  }),

  getters: {
    getToken: (state) => state.tokenUser,
  },

  mutations: {
		// Мутации для ошибок
    toZeroErrors(state) {
      state.validationErrors = null
    },
		catchError(state, payload) {
      state.validationErrors = payload
    },

		// Мутации для входа
    loginSuccess(state, payload) {
      state.currentUser = payload.credentials
      state.tokenUser = payload.response.data.token
      state.isLoggedIn = true
			state.isAdmin = payload.response.data.user.role_id
    },
    loginAgainSuccess(state, payload) {
      state.currentUser = {
        email: payload.email,
        password: payload.password,
      }
      state.tokenUser = payload.token
      state.isLoggedIn = true
    },

		// Мутации для выхода
    logoutSuccess(state) {
      state.currentUser = null
      state.tokenUser = null
      state.isLoggedIn = false
      state.isAdmin = null
    },


    setToStorage(state, payload) {
      setItem('accessToken', payload.response.data.token)
      setItem('email', payload.credentials.email)
      setItem('password', payload.credentials.password)
			setItem('userId', payload.response.data.user.id)
			setItem('roleId', payload.response.data.user.role_id)
    },
  },

  actions: {
		// Функция для входа
    login(context, credentials) {
      return new Promise((resolve) => {
				context.commit('toZeroErrors')
        authApi
          .login(credentials)
          .then((response) => {
            context.commit('loginSuccess', {
              response,
              credentials,
            })
						console.log(response.data)
            context.commit('setToStorage', {response, credentials})
            router.push('personal')
            resolve(response.data)
          })
          .catch((result) => {
            context.commit('catchError', result.response.data)
          })
      })
    },
		// Функция для повторного входа при обновлении страницы
		loginAgain(context) {
      context.commit('toZeroErrors')
      const email = getItem('email')
      const token = getItem('accessToken')
      const password = getItem('password')
      if (email && token && password) {
        const payload = {
          email: email,
          token: token,
          password: password,
        }
        context.commit('loginAgainSuccess', payload)
      } else {
        context.commit('catchError')
      }
    },
		// Функция для регистрации
    register(context, credentials) {
      return new Promise((resolve) => {
        context.commit('toZeroErrors')
        authApi
          .register(credentials)
          .then((response) => {
						console.log(this.state.validationErrors)
            resolve(response.data)
						router.push('login')
          })
          .catch((result) => {
            context.commit('catchError', result.response.data)
          })
      })
    },
    // Функция для выхода
    logout(context) {
      context.commit('toZeroErrors')
      const token = context.state.tokenUser
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      authApi
        .logout()
        .then(() => {
          localStorage.clear()
          router.push('/')
          context.commit('logoutSuccess')
        })
        .catch((error) => {
          context.commit('catchError', error)
        })
    },
  },
	namespaced: true
}