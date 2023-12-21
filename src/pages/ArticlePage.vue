<template>
	<section v-if="!isLoading">
    <div class="article" >
			<div class="article-headers">
				<div class="header">
					<h3 class="category">Категория: {{ post.category }}</h3>
					<h1 class="title">{{ post.title }}</h1>
				</div> 
				<div class="meta">
					<img class="icon" src="@/assets/article/icons/date.png" alt="dateicon">
					<p class="date">{{ localeDate(post.updated_at) }}</p>
					<favorite-button>Избранное</favorite-button>
				</div>		
			</div>
      <div class="article-body">
				<div class="image">
					<img :src=getImgUrl(post.thumbnail) alt="Заглавная картинка статьи">
				</div>
        <p class="text">{{ post.description }}</p>
      </div>
			<div class="author">
				<div class="avatar"></div>
				<div class="name">
					<p>Автор:</p>
					<h4 class="author-name">{{ post.autor }}</h4>
				</div>
			</div>
			<h3 class="comment-title">Комментарии:</h3>
			<div class="comments-wrap">
				<div class="comment-wrap" v-for="comment in post.comments" :key="comment.id">
					<div class="comment-meta">
						<div class="data">
							<h4 class="comment-author-name">{{ comment.user.name }}</h4>
							<p class="date">{{ localeDate(comment.created_at) }}</p>
						</div>
						<div class="buttons" v-if='loggedUser.email === comment.user.email'>
							<change-button @click="showDialog(comment.id)">Изменить</change-button>	
						</div>
					</div>
					<div class="comment-text-wrap">
						<p class="comment-text">{{ comment.text }}</p>
						<modal-window v-model:show="dialogVisible" v-if='loggedUser.email === comment.user.email && this.commentId === comment.id'>
								<form class="comment-form" @submit.prevent='submitUpdate'>
									<my-input
										v-model.trim='text'
										type='text'
										name='text'
										:placehold="comment.text"></my-input>				
									<my-button>Изменить комментарий</my-button>
								</form>
							</modal-window>
					</div>	
				</div>
				<h4 v-if='!loggedUser'><router-link class='link comment-link' :to='`/login`'>Войдите</router-link> чтобы оставить комментарий</h4>
				<form class="comment-form" @submit.prevent='submitForm' v-if='loggedUser'>
					<h3 class="comment-title">Оставить комментарий:</h3>
					<my-input
						v-model.trim='text'
						type='text'
						name='text'
						placehold='Текст комментария'></my-input>				
					<my-button>Оставить комментарий</my-button>
				</form>
			</div>
    </div>
  </section>
	<loading v-else></loading>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import ModalWindow from '@/components/ModalWindows/ModalWindow'

export default {
		components: {
			ModalWindow,
		},
		data() {
			return {
				text: '',
				dialogVisible: false,
			}
		},
    methods: {
			...mapMutations({
				setPostId: 'article/setPostId',
				setCommentId: 'article/setCommentId',
			}), 
			...mapActions({
				fetchPost: 'article/fetchPost',
				addComment: 'article/addComment'
			}),

			showDialog(id) {
				this.setCommentId(id)
				this.dialogVisible = true
			},

			getPostId() {
				this.setPostId(this.$route.params.id)
			}, 

			getImgUrl(pic) {
				return require('@/assets/article/images/' + pic);
			},

			submitForm() {
      this.$store.dispatch('article/addComment', {
				postId: this.postId,
        text: this.text,
      })
      this.text = ''
    	},

			submitUpdate() {
      this.$store.dispatch('article/changeComment', {
        text: this.text,
				commentId: this.commentId,
      })
      this.text = ''
    	},	
			localeDate(date) {
				return (new Date(date)).toLocaleDateString()
			}
    },
		mounted() {
			this.getPostId()
			this.fetchPost()
		},
		computed: {
			...mapState({
				loggedUser: state => state.auth.currentUser,
				post: state => state.article.post,
				postId: state => state.article.postId,  
				commentId: state => state.article.commentId, 	
				isLoading: state => state.article.isLoading,
				dialogWindows: state => state.dialogWindow.dialogWindows,
			}),

		}
}

</script>

<style scoped>
.article {
    max-width: 1200px;
    width: 1080px;
    display: flex;
    margin: 30px 0;
		flex-direction: column;
}

.article-headers {
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
}

.header {
	display: flex;
	flex-direction: column;
}

.category {
	padding: 10px 0;
}

.meta {
 	display: flex;
 	flex-direction: row;
	align-items: center;
	font-size: 13pt;
}

.date {
 padding-right: 30px;
}

.author {
	border-top: 1px solid #a3a3a2;
	border-bottom: 1px solid #a3a3a2;
	margin: 20px 0;
	padding: 20px 0;
	display: flex;
 	align-items: center;
	justify-content: center;
}
.avatar {
	background-color: #ffb803;
	width: 60px;
	height: 60px;
	border-radius: 50%;
}
.name {
	margin: 0 10px;
}
.author-name:hover {
	color: #ffb803;
	cursor:default;
}
.article-body {
	margin-bottom: 40px;
	margin-top: 10px;
}

.image {
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
}
.text {
	font-size: 15pt;
}

.comment-title {
	margin: 20px 0;
}
.comment-wrap {
	margin: 30px 0;
	padding-bottom: 30px ;
	border-bottom: 1px solid #a3a3a2;
}
.comment-meta {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 10px;
}
.data {
	display: flex;
}

.buttons {
	display: flex;
}
.comment-author-name{
	padding-right: 20px;
}
.comment-author-name:hover {
	color: #ffb803;
	cursor:default;
}

img {
	max-width: 70%;
	max-height: 70%;
}

.icon {
	width: 22px;
	height: 22px;
	margin: 0 3px;
}

.comment-link:hover {
 color: #ffb803;
}

.comment-form {
	margin-top: 100px;
}

</style>