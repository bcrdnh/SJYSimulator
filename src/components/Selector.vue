<script setup>
import { ref } from 'vue'
const ButtonList = ref([])
const show = ref(false)
function setSelect (list) {
  ButtonList.value = list
  show.value = true
}

defineExpose({
  setSelect
})
</script>

<template>
  <div class="selector" v-if="show">
    <span v-for="b in buttonList">
      <a-button @click="b.action();show=false">{{ b.name }}</a-button>
    </span>
  </div>
</template>

<style>
.selector {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
