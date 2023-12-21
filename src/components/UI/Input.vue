<template>
  <input
    :value='modelValue'
    @input='updateInput'
    class='inp form-group'
    :placeholder='placehold'
    :type='type'
    style='align-self: center;'
    required>
</template>

<script>
export default {
  name: 'my-input',

  props: {
    placehold: {
      type: String,
      required: true
    },
    modelValue: [String, Number],
    type: {
      type: String,
      required: true
    }
  },

  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>

input {
    font-family: Cleanvertising-Light;
		font-size: 15pt;
    padding: 5px 7px;
    background-color: #fcf2d7;
    border: 1px solid  #faecc8;
		width: 100%;
  	height: 52px;
		border-radius: 25px;
  	text-indent: 15px;
}

input:hover {
    background-color: #faecc8;
    border: 1px solid  #faecc8;
}

input:focus {
    background-color: #faecc8;
    border: 1px solid  #ffb803;
    outline: none;
    color: #242423;
}

input:active {
    background-color: #faecc8;
    border: 1px solid  #ffb803;
    outline: none;
    color: #242423;
}

.form-group {
  margin-bottom: 1rem;
}

</style>