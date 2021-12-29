<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

const starter = ref(store.state.sys.starter)
const startOptions = ref({
  baseStates: new Map(),
  special: new Map()
})
for (const s of starter.value.baseStates) {
  startOptions.value.baseStates.set(s.varName, s.default)
}
for (const f of starter.value.fixedBaseStates) {
  startOptions.value.baseStates.set(f.varName, f.default)
}

const restPoint = ref(store.state.sys.starter.point)
function select (partName, specialName) {
  let part = null
  let oldOPtion = null
  let newOption = null
  for (const pt of starter.value.parts) {
    if (partName === pt.name) part = pt
  }
  for (const op of part.options) {
    if (startOptions.value.special.has(op.specialName)) oldOPtion = op
    if (op.specialName === specialName) newOption = op
  }
  if (oldOPtion) {
    startOptions.value.special.delete(oldOPtion.specialName)
    restPoint.value += oldOPtion.cost
  }
  startOptions.value.special.set(newOption.specialName, 1)
  restPoint.value -= newOption.cost
}
function changeState (change, varName) {
  const nowValue = startOptions.value.baseStates.get(varName)
  for (const bs of starter.value.baseStates) {
    if (bs.varName === varName) {
      if (nowValue + change < bs.min || nowValue + change > bs.max) return
      startOptions.value.baseStates.set(varName, nowValue + change)
      restPoint.value -= change * bs.cost
    }
  }
}

function next () {
  if (restPoint.value < 0) {
    message.error('not enought point')
  } else {
    store.dispatch('sys/finishStarter', startOptions.value)
    router.push('/defaultDaram')
  }
}
</script>

<template>
  <div class="starter">
    point: {{ restPoint }}
    <a-space direction="vertical">
      <div v-for="baseState in starter.baseStates">
          <span>{{ baseState.name }}:</span>
          <span><a-button @click="changeState(-1,baseState.varName)"> - </a-button></span>
          <span>{{ startOptions.baseStates.get(baseState.varName) }}</span>
          <span><a-button @click="changeState(1,baseState.varName)"> + </a-button></span>          
      </div>
      <div v-for="fixedState in starter.fixedBaseStates">
        <span>{{ fixedState.name }}:</span>
        <span> {{ startOptions.baseStates.get(fixedState.varName) }} </span>
      </div>
      <div v-for="p in starter.parts">
        <div class="outerBox">
          <div class="pname">{{ p.name }}</div>
          <div class="innerBox">
            <div
              v-for="button in p.options"
              @click="select(p.name, button.specialName)"
              :class="{'button': true, 'selected': startOptions.special.get(button.specialName)}"
            >
              {{ button.name }}
              {{ button.summary }}
              {{ button.cost }}
            </div>
          </div>
        </div>
      </div>
    </a-space>
    <a-button @click="next()">ok</a-button>
  </div>
</template>

<style>
.starter {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.starter::-webkit-scrollbar {
  width: 6px;
  height: 100%;
  transition: all .3s;
}
.starter::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 20px;
  box-shadow: inset 0 0 5px #d8d8d8;
  background: #535353;
}
/*滚动条轨道*/
.starter::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px #d8d8d8;
  border-radius: 20px;
  background: #ededed;
}
.outerBox {
  border: 3px solid #f0f0f0;
  border-radius: 15px;
  padding: 24px;
}
.pname {
  position: relative;
  top: -36px;
  left: -12px;
  background-color: #ffffff;
  width: fit-content;
}
.innerBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.button {
  width: 80px;
  height: 60px;
  transition: all .3s;
}
.selected {
  background-color: #27272727;
}
.button:hover {
  background-color: #27272727;
}
</style>
