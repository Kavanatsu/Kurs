import postsApi from '@/api/posts'
import commentsApi from '@/api/comments'
import axios from 'axios'
import router from '@/router/router'



export const articleModule = ({
	state: () => ({
		posts: [],
		postId: null,
		commentId: null,
		post: [],
		errors: null,
		isLoading: false,
	}),
	getters: {
		sortedItemsMain(state) {
      return state.posts
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 6);
    },
		sortedItems(state) {
      return state.posts
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
				.slice()
    },
		getPostId: (state) => state.postId,
	}, 
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

		// Мутации для постов
		setPosts (state, posts) {
			state.posts = posts;
		},
		setPostId (state, payload) {
			state.postId = payload
		},
		setPost (state, post) {
			state.post = post
		},	
		
		setCommentId (state, payload) {
			state.commentId = payload
		},
		clearCommentId (state) {
			state.commentId = null
		},
		updateCommentSuccess () {
			router.go(0)
		}

	},
	actions: {
		// Функция для фетча постов
		fetchPosts(context) {
      return new Promise((resolve) => {
				context.commit('setLoading', true)
				context.commit('toZeroErrors')
        postsApi
          .getPosts()
          .then((response) => {
						context.commit('setPosts', response.data.data)
            resolve(response.data.data)
          })
          .catch((e) => {
            context.commit('catchError', e)
          })
					.finally(() => {
						context.commit('setLoading', false)
					})
      })
    },
		// Функция для фетча одного поста
		fetchPost(context) {
      return new Promise((resolve) => {
        context.commit('setLoading', true)
				context.commit('toZeroErrors')
				const postId = context.state.postId
        postsApi
          .getPost(postId)
          .then((response) => {
						context.commit('setPost', response.data.data)
            resolve(response.data.data)
          })
          .catch((e) => {
            context.commit('catchError', e)
          })
					.finally(() => {
						context.commit('setLoading', false)
					})
      })
    },
		searchPosts(context, credentials) {
      return new Promise((resolve) => {
        context.commit('setLoading', true)
				context.commit('toZeroErrors')
        postsApi
          .searchPosts(credentials)
          .then((response) => {
						context.commit('setPosts', response.data.data)
            resolve(response.data.data)
          })
          .catch((e) => {
            context.commit('catchError', e)
          })
					.finally(() => {
						context.commit('setLoading', false)
					})
      })
    },

		// Функция для добавления комментария
		addComment(context, credentials) {
      return new Promise((resolve) => {
				context.commit('setLoading', true)
				context.commit('toZeroErrors')
				const token = context.rootGetters['auth/getToken']
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        commentsApi
          .addComment(credentials)
          .then((response) => {
						console.log(response)
            resolve(response.data)
						router.go(0)
          })
          .catch((e) => {
            context.commit('catchError', e)
          })
					.finally(() => {
						context.commit('setLoading', false)
					})
      })
    },
		// Функция для изменения комментария
		changeComment(context, credentials) {
      return new Promise((resolve) => {
				context.commit('setLoading', true)
				context.commit('toZeroErrors')
				context.commit('clearCommentId')
				const token = context.rootGetters['auth/getToken']
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        commentsApi
          .changeComment(credentials)
          .then((response) => {
						console.log(response)
            resolve(response.data)
          })
          .catch((e) => {
            context.commit('catchError', e)
          })
					.finally(() => {
						context.commit('updateCommentSuccess')
						context.commit('setLoading', false)
					})
      })
    },
	},
	namespaced: true
})