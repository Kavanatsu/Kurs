<template>
    <button class="btn" value="Добавить в избранное">
        <img src="@/assets/article/icons/unfavorite.png" alt="иконка избранного">
        <slot></slot>    
    </button>
</template>

<script>
    export default {
        name: 'favorite-button',
    }
</script>

<style scoped>

.btn {
	font-family: Cleanvertising-Light;
	font-size: 14pt;
    background-color: #faf6ed;
    border-radius: 10px;
    border: none;
    padding: 8px 5px;
		margin: 5px;
		text-align: center;
		display: flex;
}

.btn:hover {
	background-color: #fce8b6;
}

.btn:active {
box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.2);
}

.btn>img {
    width: 18px;
    height: 18px;
		margin: 0 3px ;
}
</style>