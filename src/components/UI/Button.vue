<template>
  <button class='btn'>
		<slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>

.btn {
	font-family: Cleanvertising-Light;
  padding: 0.3em 30px;
  font-size: 20pt;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fdc535;
  color: #fff;
	border: none;
  border-radius: 35px;
	cursor: pointer;
}

.btn:hover {
  background-color: #ffb803;
  color: #fff;
}

.btn:active {

  background: #ffb803;
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.2);

}
</style>