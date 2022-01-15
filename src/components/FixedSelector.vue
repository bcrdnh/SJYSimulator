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
  <div class="selector" v-if="show">
    <div v-for="b in buttonList" class="buttonBox">
      <button type="button" class="nes-btn is-primary button" @click="b.action();show=false">{{ b.name }}</button>
    </div>
  </div>
</template>

<style scoped>
.selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0000006c;
}
.buttonBox {
  width: fit-content;
  min-width: 320px;
  margin-bottom: 16px;
}
.button {
  width: 100%;
}
</style>
