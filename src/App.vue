<template>
    <my-header/>
    <main>
        <router-view></router-view>
    </main>
    <my-footer/>
</template>

<script>
import MyHeader from "@/components/MyHeader"
import MyFooter from "@/components/MyFooter"
import {mapActions, mapState} from 'vuex'

export default {
    components: {
       MyHeader, MyFooter
    },
		methods: {
			...mapActions({
				loginAgain: 'auth/loginAgain'
			})
    },
		mounted() {
    	this.$store.dispatch('auth/loginAgain')
  	},
		computed: {
			...mapState({
				isLoading: state => state.global.isLoading,
			})
		}
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

@font-face {
    font-family: Cleanvertising-Bold;
    src: url(../fonts/CLEANVEB.TTF);
}

@font-face {
    font-family: Cleanvertising-Light;
    src: url(../fonts/CLEANVEL.TTF);
}

body{
    font-family: Cleanvertising-Light;
    background-color: #faf6ed;
    color:  #242423;
		font-size: 15pt;
}

.link {
    text-decoration: none;
    color: #242423;
}

.link:hover {
    text-decoration: none;
    color:  #faf6ed;
}

.auth:hover {
	text-decoration: none;
    color: #ffb803;
}

main {
    display: flex;
    justify-content: center;
		min-height: 700px;
		padding-top: 60px;
		padding-bottom: 60px;
}

.main-title {
	margin-top: 30px;
	font-size: 25pt;
	color: #242423;
	text-align: center;
}

.wrap {
	display: flex;
	flex-direction: column;
	max-width: 1200px;
  width: 1080px;
	align-items: center;
}

</style>