<template>
  <button
      class="btn"
      >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "greenButton"
}
</script>

<style scoped>
.btn{
  align-self: flex-end;
  margin-top: 15px;
  margin-right: 10px;
  padding: 5px;
  background: none;
  border: 2px solid #3bffca;
}
</style>