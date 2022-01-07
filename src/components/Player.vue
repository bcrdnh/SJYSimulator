<script setup>
import { getCurrentInstance, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const msgList = ref([])
function printMsg (msg='') {
  if (typeof msg === 'string') {
    msgList.value.push({
      content: prefixContent(msg),
      clas: '',
      style: ''
    })
  }
  if (typeof msg === 'object') {
    msgList.value.push({
      content: prefixContent(msg.content),
      clas: msg.clas ? msg.clas : '',
      style: msg.style ? msg.style : ''
    })
    if (msg.action && typeof msg.action === 'function') msg.action()
    if (msg.changeVar && typeof msg.changeVar === 'object') store.dispatch('sys/changeVar', msg.changeVar)
    if (msg.setVar && typeof msg.setVar === 'object') store.dispatch('sys/setVar', msg.setVar)
    // TODO: items
  }
}
function prefixContent (content) {
  const reg = /{[a-zA-Z0-9_]*}/i
  while (reg.test(content)) {
    const varName = reg.exec(content)[0].replace(/{|}/g, '')
    let str = store.getters['sys/getStates'](varName)
    if (typeof str === 'undefined') str = 'undefined'
    content = content.replace(reg, str)
  }
  return content
}

const daramPart = ref([])
const callback = ref(() => {})
function setDaram (DaramPart, Callback = null) {
  if (!DaramPart instanceof Array || DaramPart.length === 0) {
    console.log('[player.vue/setDaram]:darampart is illegal')
  }
  daramPart.value = DaramPart
  callback.value = Callback
  play()
}
function clear () {
  daramPart.value = []
  callback.value = null
}

const count = ref(0)
const locked = ref(false)
function play () {
  if (locked.value) return
  if (count.value < daramPart.value.length) {
    printMsg(daramPart.value[count.value++])
  } else {
    count.value = 0
    afterOnePara()
    if (callback.value && typeof callback.value === 'function') {
      callback.value()
      return
    }
    console.error('[player.vue]:play() finished without anything!')
  }
}
function afterOnePara () {
  return
}
function lock () {
  locked.value = true
}
function unlock () {
  locked.value = false
}

defineExpose({
  setDaram,
  lock,
  unlock,
  clear
})
</script>

<template>
  <div class="player">
    <div class="msgBox" @click="play()">
      <div v-for="p in msgList" :class="p.clas">{{ p.content }}</div>
    </div>
  </div>
</template>

<style>
.player {
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.msgBox {
  height: 100%;
  width: 100%;
  overflow: auto;
  justify-content: left;
}
.blue {
  color: aquamarine;
}
.red {
  color: crimson;
}
</style>
