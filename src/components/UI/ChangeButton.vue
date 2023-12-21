<template>
	<button class="btn" value="Комментарии">
			<img src="@/assets/article/icons/change.png" alt="иконка изменения">
			<slot></slot>    
	</button>
</template>

<script>
	export default {
			name: 'change-button'
	}
</script>

<style scoped>

.btn {
font-family: Cleanvertising-Light;
font-size: 14pt;
background-color: #faf6ed;
border-radius: 10px;
border: none;
padding: 8px 10px;
margin: 5px;
text-align: center;
display: flex;
cursor: pointer;
align-items: center;
}
.btn>img {
width: 18px;
height: 18px;
margin: 0 3px ;
}

.btn:hover {
	background-color: #fce8b6;
}
</style>