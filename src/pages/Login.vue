<template>
	<section class="wrap login">
		<div class='login-form'>
			<h1 class="main-title">Вход</h1>
			<div class="errors" v-if='validationErrors' style='color: red'>
				<p>Неверные почта или пароль</p>
			</div>
			<form class="login-form" @submit.prevent='submitForm'>
				<div class='login-link'>
					<router-link class='link auth' to='/register'>Хотите зарегистрироваться?</router-link>
				</div>
				<my-input
					v-model.trim='email'
					type='email'
					name='email'
					placehold='Почта'></my-input>
				<my-input
					v-model.trim='password'
					type='password'
					name='password'
					placehold='Пароль'></my-input>
				<my-button>Войти</my-button>
			</form>
		</div>
	</section>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      })
        .then(user => {
          console.log('user logged', user)
        })
      this.email = ''
      this.password = ''
    },
  },
  computed: {
    ...mapState({
      validationErrors: state => state.auth.validationErrors
    }),			
  }
}
</script>

<style scoped>

.login {
	justify-content: center;
}

.login-link {
  display: flex;
	justify-content: center;
	margin: 20px 0;
}

router-link {
	text-decoration: none;
}

.login-form {
	width: 300px;
	display: flex;
	justify-content: center;
	flex-direction: column;
}

.errors {
	display: flex;
	justify-content: center;
	margin-top: 20px ;
}

</style>