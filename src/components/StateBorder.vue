<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const varList = ref([])
const varMap = ref(new Map())
function addDisplayVar (name, displayName) {
  varList.value.push(name)
  varMap.value.set(name, displayName)
}
function addVar (name) {
  varList.value.push(name)
}
function removeDisplayVar (name) {
  varList.value.splice(varList.value.indexOf(name), 1)
  varMap.value.delete(name)
}

defineExpose({
  addDisplayVar,
  addVar,
  removeDisplayVar
})
</script>

<template>
  <div class="stateBorder" v-if="varList.length>0">
    <span v-for="v in varList">
      {{ varMap.has(v) ? varMap.get(v) : v }} : 
      {{ store.getters['sys/getStates'](v) }}
    </span>
  </div>
</template>

<style scoped>
.stateBorder {
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  flex-wrap: wrap;
  width: 100%;
}
</style>
