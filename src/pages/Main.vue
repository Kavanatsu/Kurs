<template>
	<section class="wrap">
		<h1 class="main-title">Последние статьи</h1>
		<article-list-sorted :posts="posts" v-if="!isLoading"/>
		<loading v-else></loading>
	</section>
</template>

<script>
import ArticleListSorted from "@/components/ArticlesPages/ArticleListSorted"
import {mapState, mapActions} from 'vuex'

export default {
	components: {
      ArticleListSorted
    },
    methods: {
			...mapActions({
				fetchPosts: 'article/fetchPosts'
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

<style>

</style>