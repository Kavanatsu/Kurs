<template>
	<section class="wrap login">
		<div class='register-form'>
			<h1 class="main-title">Регистрация</h1>
			<div v-if='validationErrors' v-for="error in validationErrors" style='color: red; padding: 10px 0; text-align: center;'>
				<div>{{ error.name }}</div>
				<div>{{ error.email }}</div>
				<div>{{ error.password }}</div>
			</div>
			<form class="register-form" @submit.prevent='submitForm' novalidate>
				<div class='login-link'>
					<router-link class='link auth' to='/login'>Хотите авторизоваться?</router-link>
				</div>
				<my-input
					v-model.trim='name'
					type='text'
					name='name'
					placehold='Имя'></my-input>				
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
				<my-button>Зарегистрироваться</my-button>
			</form>
		</div>
	</section>
</template>

<script>

import {mapState} from 'vuex'

export default {
  data() {
    return {
      name: '',
      password: '',
      email: ''
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('auth/register', {
        name: this.name,
        password: this.password,
        email: this.email
      })
      this.name = ''
      this.password = ''
      this.email = ''
    },
  },
  computed: {
    ...mapState({
      validationErrors: state => state.auth.validationErrors
    })
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

.register-form {
	width: 300px;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
</style>