<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Typed from './Typed.vue'
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
    handleMsg(msg)
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
function handleMsg (msg) {
  if (msg.action && typeof msg.action === 'function') msg.action()
  if (msg.changeVar && typeof msg.changeVar === 'object') store.dispatch('sys/changeVar', msg.changeVar)
  if (msg.setVar && typeof msg.setVar === 'object') store.dispatch('sys/setVar', msg.setVar)
  if (msg.changeSpecial && typeof msg.changeSpecial === 'object') store.dispatch('sys/changeSpecial', msg.changeSpecial)
  if (msg.setSpecial && typeof msg.setSpecial === 'object') store.dispatch('sys/setSpecial', msg.setSpecial)
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
  count.value = 0
}

const count = ref(0)
const locked = ref(false)
const msgBox = ref(null)
function play () {
  if (locked.value) return
  if (count.value < daramPart.value.length) {
    printMsg(daramPart.value[count.value++])
    // msgBox.value.scrollTop = msgBox.value.scrollHeight
    setTimeout(() => {
      msgBox.value.scrollTop = msgBox.value.scrollHeight
    }, 100)
  } else {
    count.value = 0
    // afterOnePara()
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
    <div ref="msgBox" class="msgBox" @click="play()">
      <div v-for="p in msgList">
        <Typed :text="p.content" :class="p.clas" @onStart="locked=true" @onEnd="locked=false"></Typed>
      </div>
      <!-- <div v-for="p in msgList" :class="p.clas">{{ p.content }}</div> -->
    </div>
  </div>
</template>

<style scoped>
.player {
  /* width: 100%;*/
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.msgBox {
  user-select: none;
  height: 100%;
  width: 100%;
  overflow: scroll;
  justify-content: left;
  background-color: #ffffff;
  border:  4px solid #000000;
  transition: all .3s;
}
.msgBox::-webkit-scrollbar {
  width: 6px;
  height: 100%;
  transition: all .3s;
}
.msgBox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 20px;
  box-shadow: inset 0 0 5px #d8d8d8;
  background: #535353;
}
/*滚动条轨道*/
.msgBox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px #d8d8d8;
  border-radius: 20px;
  background: #ededed;
}
.blue {
  color: aquamarine;
}
.red {
  color: crimson;
}
</style>
