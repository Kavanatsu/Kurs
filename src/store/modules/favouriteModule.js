import favouritesApi from '@/api/favourites'
import {getItem} from '@/helpers/persistenceStorage'
import axios from 'axios'



export const favouriteModule = ({
	state: () => ({
		isLoading: false,
		errors: null,
		user: null,
	}),
	mutations: {		
		// Мутации для ошибок
		toZeroErrors(state) {
      state.errors = null
    },
		catchError(state, payload) {
      state.errors = payload
    },

		// Мутация для загрузки
		setLoading(state, bool) {
      state.isLoading = bool
    },

		setUser (state, payload) {
			state.user = payload.data
		},	
	},
	actions: {
		fetchUser(context) {
      return new Promise((resolve) => {
				context.commit('setLoading', true)
				context.commit('toZeroErrors')
				const userId = getItem('userId')
				const token = context.rootGetters['auth/getToken']
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        favouritesApi
          .getUser(userId)
          .then((response) => {
						context.commit('setUser', response.data)
						console.log(response)
            resolve(response.data)
          })
          .catch((e) => {
            context.commit('catchError', e)
          })
					.finally(() => {
						context.commit('setLoading', false)
					})
      })
    },
	},
	namespaced: true
})