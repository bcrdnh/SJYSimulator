<script setup>
import { ref } from 'vue'
const buttonList = ref([])
const show = ref(false)
function setSelect (list) {
  buttonList.value = list
  show.value = true
}

defineExpose({
  setSelect
})
</script>

<template>
  <div>
    <div class="selector" v-if="show">
      <span v-for="b in buttonList">
        <a-button @click="b.action();show=false" block>{{ b.name }}</a-button>
      </span>      
    </div>
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
