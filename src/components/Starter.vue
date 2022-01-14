<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { setVar } from '../assets/utils'
const store = useStore()
const router = useRouter()
const route = useRoute()

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
const playerName = ref('请输入......')
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
function otherSelect (specialName) {
  let option = null
  for (const op of starter.value.otherParts) {
    if (op.specialName === specialName) option = op
  }
  if (startOptions.value.special.has(option.specialName)) {
    startOptions.value.special.delete(option.specialName)
    restPoint.value += option.cost
  } else {
    startOptions.value.special.set(option.specialName, 1)
    restPoint.value -= option.cost
  }
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
    // store.dispatch('sys/setVar', {varName: 'pn', content: playerName.value})
    // setVar('playerName', playerName.value)
    store.commit('sys/setPlayerName', playerName.value)
    store.dispatch('sys/finishStarter', startOptions.value)
    console.log(route)
    router.push(route.query.mainPage ? route.query.mainPage : '/defaultDaram')
  }
}
</script>

<template>
  <div class="starter">
    <div class="a-space">
      <div class="restPoing">{{ starter.pname&&starter.pname.restPoint?starter.pname.restPoint:'restPoint' }}: {{ restPoint }}</div>
      <div class="starterContent">
        <div class="nes-container with-title outerBox">
          <div class="title">{{ starter.pname&&starter.pname.name?starter.pname.name:'name' }}</div>
          <!-- <a-input v-model:value="playerName" :bordered="false" placeholder="请输入......" /> -->
          <input type="text" id="name_field" class="nes-input" v-model="playerName" placeholder="请输入......">
        </div>
        <div class="nes-container with-title outerBox">
          <div class="title">{{ starter.pname&&starter.pname.baseState?starter.pname.baseState:'baseState' }}</div>
          <div v-for="baseState in starter.baseStates" class="baseState">
            <span style="min-width: 64px;">{{ baseState.name }}:</span>
            <span style="margin-right: 24px;"><a-button @click="changeState(-1,baseState.varName)"> - </a-button></span>
            <span style="min-width: 16px;">{{ startOptions.baseStates.get(baseState.varName) }}</span>
            <span style="margin-left: 24px;"><a-button @click="changeState(1,baseState.varName)"> + </a-button></span>          
          </div>
        </div>
        <div class="nes-container with-title outerBox">
          <div class="title">{{ starter.pname&&starter.pname.otherState?starter.pname.otherState:'otherState' }}</div>
          <div v-for="fixedState in starter.fixedBaseStates" class="baseState">
            <span>{{ fixedState.name }}:</span>
            <span> {{ startOptions.baseStates.get(fixedState.varName) }} </span>
          </div>
        </div>
        <div v-for="p in starter.parts">
          <div class="nes-container with-title outerBox">
            <div class="title">{{ p.name }}</div>
            <div class="innerBox">
              <div
                v-for="button in p.options"
                @click="select(p.name, button.specialName)"
                :class="{'button': true, 'selected': startOptions.special.get(button.specialName)}"
              >
                <div class="btnName">{{ button.name }}</div>
                <div class="btnSummary">{{ button.summary }}</div>
                <div :class="button.cost>0?'btnCostG':'btnCostR'">{{ button.cost }}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="nes-container with-title outerBox">
            <div class="title">{{ starter.otherPartsName }}</div>
            <div class="innerBox">
              <div
                v-for="button in starter.otherParts"
                @click="otherSelect(button.specialName)"
                :class="{'button': true, 'selected': startOptions.special.get(button.specialName)}"
              >
                <div class="btnName">{{ button.name }}</div>
                <div class="btnSummary">{{ button.summary }}</div>
                <div :class="button.cost>0?'btnCostG':'btnCostR'">{{ button.cost }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="nes-btn" @click="next()">OK</button>
      <!-- <a-button @click="next()">ok</a-button> -->
    </div>
    
  </div>
</template>

<style scoped>
.starter {
  /* width: 100%; */
  font-family: zpix;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background-color: #ffffff;
}
.restPoing {
  position: fixed;
  top: 24px;
  left: 50px;
  font-size: 16px;
}
.starterContent {
  margin-top: 36px;
}
.baseState {
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
}
.outerBox {
  margin-bottom: 24px;
}
.pname {
  position: relative;
  top: -16px;
  left: -16px;
  padding: 8px;
  background-color: rgb(145, 201, 189);
  border-radius: 24px;
  width: fit-content;
}
.innerBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
/* .button {
  width: 110px;
  height: 110px;
  min-height: 60px;
  margin-right: 10px;
  margin-bottom: 8px;
  font-size: 12px;
  transition: all .3s;
} */
.btnName {
  font-weight: bold;
  height: 20%;
}
.btnSummary {
  font-style: italic;
  color: gray;
  height: 60%;
}
.btnCostR {
  color: chartreuse;
  height: 20%;
}
.btnCostG {
  color: tomato;
  height: 20%;
}
.selected {
  background-color: #27272727;
}
/* .button:hover {
  background-color: #27272727;
} */
.a-space {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
