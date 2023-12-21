<template>
	<section class="user-info">
    <div class="personal-data">
			<h2 class="title">Личные данные:</h2>
			<p>Имя пользователя: {{ user.name }}</p>
			<p>Адрес электронной почты: {{ user.email }}</p>
    </div> 
		<div class="personal-data">
			<h2 class="title">Ваши комментарии в статьях:</h2>
			<div class="comment-wrap" v-for="comment in user.comments" :key="comment.id">
				<div v-for="post in posts" :key="post.id">
					<router-link 
						v-if="post.id === comment.post_id" 
						class='link personal' 
						:to='`/articles/${comment.post_id}`'><h3 class="title">{{ post.title }} </h3></router-link>
				</div>
				<p class="comment-text">Комментарий: {{ comment.text }}</p>
			</div>
    </div>
		<div class="personal-data">
			<h2 class="title">Избранные статьи: </h2>
			<div class="comment-wrap" v-for="item in user.favorite" :key="item.id">
				<div v-for="post in posts" :key="post.id">
					<router-link 
						v-if="post.id === item.post_id" 
						class='link personal' 
						:to='`/articles/${item.post_id}`'><h3 class="title">{{ post.title }}</h3></router-link>
				</div>
			</div>
    </div> 
  </section> 
</template>

<script>
export default {
	name: 'user-info',
	props: {
		user: {
			type: Object,
			required: true
		},
		posts: {
			type: Array,
			required: true
		},
	},
}
</script>

<style scoped>
.user-info {
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	width: 100%;
}

.personal-data {
	border-bottom: 1px solid #a3a3a2;
	padding: 30px 0;
	width: 100%;
}

.title {
	margin: 10px 0;
}

.comment-wrap {
	display: flex;
	align-items: center;
}

.comment-text {
	margin: 0 20px;
}

.personal:hover {
 color: #ffb803;
}
</style>