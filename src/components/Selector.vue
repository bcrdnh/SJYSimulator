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
    <!-- <div class="selector" v-if="show">
      <span v-for="b in buttonList">
        <a-button @click="b.action();show=false" block>{{ b.name }}</a-button>
      </span>      
    </div> -->
    <a-modal v-model:visible="show" :closable="false" :maskClosable="false">
      <template #footer>
        <div></div>
      </template>
      <template #title>
        <div></div>
      </template>
      <div v-for="b in buttonList" class="button">
        <a-button @click="b.action();show=false" block>{{ b.name }}</a-button>
      </div>  
    </a-modal>
  </div>
</template>

<style scoped>
.selector {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.button {
  width: 100%;
  margin-bottom: 16px;
}
</style>
