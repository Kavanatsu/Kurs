<template>
	<div class="dialog" v-if="show" >
		<div class="content">
			<my-button class="close-btn" @click="hideDialog">
				<img src="@/assets/article/icons/close.png" alt="иконка изменения">
			</my-button>
			<slot></slot>
		</div>
	</div>
	
</template>

<script>
export default {
	name: 'modal-window',
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		hideDialog() {
			this.$emit('update:show', false)
		}
	}
}
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
  align-items: flex-end;
}
.close-btn>img{
	width: 20px;
	height: 20px;
}
.close-btn {
	padding: 10px;
}
</style>

