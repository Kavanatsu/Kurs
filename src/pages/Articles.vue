<template>
  <section class="wrap">
			<h1 class="main-title">Все статьи</h1>
			<article-list :posts="posts" v-if="!isLoading"/>
			<loading v-else></loading>
	</section>
</template>

<script>
import ArticleList from "@/components/ArticlesPages/ArticleList"
import {mapState, mapActions} from 'vuex'

export default {
    components: {
        ArticleList
    },
    methods: {
			...mapActions({
				fetchPosts: 'article/fetchPosts',
			})
    },
		mounted() {
			this.fetchPosts()
		},
		computed: {
			...mapState({
				posts: state => state.article.posts,
				isLoading: state => state.article.isLoading,
			})
		}
}
</script>

<style scoped>

</style>