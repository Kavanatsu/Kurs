<template>
    <section class="articles">
        <div class="article-wrap" v-for="post in sortedItems" :key="post.id"> 
            <div class="article">
                <img :src=getImgUrl(post.thumbnail) alt="Заглавная картинка статьи">
                <div class="article-body">
									<p>Автор: {{ post.autor }}</p>
                  <router-link class='link' :to='`/articles/${post.id}`'><h3 class="title">{{ post.title }}</h3></router-link>
                  <p class="text">{{ post.preview }}</p>	
                </div>
                <div class="buttons">
                    <favorite-button></favorite-button>
                </div>
            </div>
        </div>
    </section> 
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    methods: {
			getImgUrl(pic) {
				return require('@/assets/article/images/' + pic);
			},
    },
		computed: {
			...mapGetters({
				sortedItems: 'article/sortedItems'
			})
		}
}
</script>

<style scoped>
.link {
    text-decoration: none;
    color: #faf6ed;
}

.link:hover {
    text-decoration: none;
    color:  #e0ded7;
}


.articles {
    max-width: 1200px;
    width: 1080px;
    display: flex;
    flex-direction: row;
    justify-content: center;
		flex-wrap: wrap;
    margin: 40px 0;
}

.article-wrap {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.article {
    height: 300px;
    width: 300px;
    margin: 10px 20px;
    display: flex;
    flex-direction: row;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #faf6ed;
}

.article-body {
	position: absolute;
	width: 260px;
	padding: 20px;
	background-color: rgba(36, 36, 35, .5);
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	box-shadow: 0  40px 25px 15px rgba(36, 36, 35, .5);
}

img {
	max-width: 100%;
	max-height: 100%;
	object-fit: cover;
	border-radius: 20px;
}

.title {
  padding: 5px 0;
	font-family: Cleanvertising-Bold;
	font-weight: 700;
	font-size: 15pt;
}

.buttons {
  position: absolute;
  bottom: 5px;
  z-index: 1;
	padding: 20px;
}
</style>