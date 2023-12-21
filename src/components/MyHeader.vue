<template>
  <header>
        <section class="navigation">
					<div class="logo">
						<img src="@/assets/header/karmalogoblackround.svg" alt="logo">
					</div>
            <div class="links">
                <router-link class='link main' :to='`/`'>KARMA</router-link>
                <router-link class='link' :to='`/about`'>О нас</router-link>
                <router-link class='link' :to='`/articles`'>Статьи</router-link>
                <router-link class='link' v-if='!loggedUser' :to='`/login`'>Вход</router-link>
                <router-link class='link' v-if='!loggedUser' :to='`/register`'>Регистрация</router-link>
                <router-link class='link' v-if='loggedUser' :to='`/personal`'>Личный кабинет</router-link>
								<button class="link logout" v-if='loggedUser' @click='logout'>Выход</button>
            </div>
            <div class="search">
							<form class="search-form" @submit.prevent='submitForm'>
                <my-input 
									class="search" 
									v-model.trim='title'
									type="search" 
									placehold="Поиск" 
									name="search"></my-input>
									<button class="submit-search">Найти</button>
							</form>
            </div>
        </section>
    </header>
</template>

<script>
import {mapState} from 'vuex'

export default {
	data() {
    return {
			title: ''
		}
  },
	methods: {
		logout() {
      return this.$store.dispatch('auth/logout')
    },
		submitForm() {
      this.$store.dispatch('article/searchPosts', {
        title: this.title,
      })
      this.title = ''
    },
	},
  computed: {
    ...mapState({
      loggedUser: state => state.auth.currentUser,
    }),
  }
}
</script>

<style scoped>
header {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #ffc229;
    padding: 5px 0;
    border-bottom: 1px solid #ffb803;
    position: fixed;
    z-index: 2000;
}

img {
	width: 40px;
	height: 40px;
	margin: 0;
	padding: 0;
}

.navigation {
    max-width: 1200px;
    width: 1080px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.links {
    width: 600px;
    display: flex;
    justify-content: space-between;
}

.logout {
	background: none;
	border: none;
	font-family: Cleanvertising-Light;
  color:  #242423;
	font-size: 15pt;
	cursor: pointer;
}
 .search {
	padding: 5px;
	width: 200px;
	height: 40px;
 }

.search-form {
	display: flex;
	flex-direction: row;
}

.submit-search  {
	font-family: Cleanvertising-Light;
  padding: 10px 20px;
  font-size: 15pt;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #242423;
	border: none;
  border-radius: 35px;
	cursor: pointer;	
	background-color: #fcf2d7;
	height: 40px;
	margin-left: 5px;
}

.submit-search:hover {
  background-color: #faecc8;
}

.submit-search:active {
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.2);
}
</style>