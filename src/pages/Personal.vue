<template>
	<section class="wrap">
		<h1 class="main-title">Личный кабинет</h1>
		<user-info :user="user" :posts="posts" v-if="!isLoading"/>
		<loading v-else></loading>
	</section>
</template>

<script>
import UserInfo from "@/components/FavouriteComponents/UserInfo"
import {mapState, mapActions} from 'vuex'

export default {
	components: {
		UserInfo,
  },
	methods: {
			...mapActions({
				fetchUser: 'favourite/fetchUser',
			})
  },
	computed: {
			...mapState({
				user: state => state.favourite.user,
				isLoading: state => state.article.isLoading,
				posts: state => state.article.posts,
			})
	},
	created() {
		this.fetchUser()
	},
}
</script>

<style scoped>

</style>