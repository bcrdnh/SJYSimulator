<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { changePage } from '../assets/utils'
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
      if (nowValue + change < bs.min) {
        change = bs.min - nowValue
      }
      if (nowValue + change > bs.max) {
        change = bs.max - nowValue
      }
      startOptions.value.baseStates.set(varName, nowValue + change)
      restPoint.value -= change * bs.cost
    }
  }
}

function random () {
  
}

function next () {
  if (restPoint.value < 0) {
    console.error('not enought point')
  } else {
    // store.commit('sys/setPlayerName', playerName.value)
    store.dispatch('sys/setVar', {varName: 'playerName', content: playerName.value})
    store.dispatch('sys/finishStarter', startOptions.value)
    store.dispatch('sys/saveGlobalVariable')
    changePage(route.query.mainPage ? route.query.mainPage : '/defaultDaram')
  }
}
</script>

<template>
  <div class="starter">
    <div class="a-space">
      <div class="nes-badge restPoint">
        <span :class="restPoint>0?'is-success':'is-error'">
          <i class="nes-icon trophy is-small"></i>
           {{ starter.pname&&starter.pname.restPoint?starter.pname.restPoint:'restPoint' }}
          : {{ restPoint }} 
        </span>
      </div>
      <!-- <div class="restPoing nes-badge nes-text is-primary">{{ starter.pname&&starter.pname.restPoint?starter.pname.restPoint:'restPoint' }}: {{ restPoint }}</div> -->
      <div class="starterContent">
        <div class="nes-container with-title outerBox">
          <div class="title">{{ starter.pname&&starter.pname.name?starter.pname.name:'name' }}</div>
          <input type="text" id="name_field" class="nes-input" v-model="playerName" placeholder="请输入......">
        </div>
        <div class="nes-container with-title outerBox">
          <div class="title">{{ starter.pname&&starter.pname.baseStates?starter.pname.baseStates:'baseStates' }}</div>
          <div v-for="baseState in starter.baseStates" class="baseState">
            <div style="min-width: 64px;margin: auto 0px;">{{ baseState.name }}:</div>
            <div>
              <button type="button" class="nes-btn" @click="changeState(-10,baseState.varName)"> -10 </button>
              <button type="button" class="nes-btn" @click="changeState(-1,baseState.varName)" style="margin-left: 24px;"> - </button>
            </div>
            <div style="min-width: 36px;margin: auto 24px;text-align: center;" class="nes-text is-primary">
              {{ startOptions.baseStates.get(baseState.varName) }}
            </div>
            <div>
              <button type="button" class="nes-btn" @click="changeState(1,baseState.varName)" style="margin-right: 24px;"> + </button>
              <button type="button" class="nes-btn" @click="changeState(10,baseState.varName)"> +10 </button>
            </div>          
          </div>
        </div>
        <div class="nes-container with-title outerBox">
          <div class="title">{{ starter.pname&&starter.pname.otherStates?starter.pname.otherStates:'otherStates' }}</div>
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
                :class="{'button': true, 'nes-pointer': true, 'selected': startOptions.special.get(button.specialName)}"
              >
                <div class="btnName">{{ button.name }}</div>
                <div class="btnSummary">{{ button.summary }}</div>
                <div class="btnCost">
                  <span>{{ starter.pname&&starter.pname.cost?starter.pname.cost:'cost' }}： </span>
                  <span :class="button.cost>0?'nes-text is-success':'nes-text is-error'">{{ button.cost }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="nes-container with-title outerBox">
            <div class="title">{{ starter.pname&&starter.pname.otherPartsName?starter.pname.otherPartsName:'otherPartsName' }}</div>
            <div class="innerBox">
              <div
                v-for="button in starter.otherParts"
                @click="otherSelect(button.specialName)"
                :class="{'button': true, 'nes-pointer': true, 'selected': startOptions.special.get(button.specialName)}"
              >
                <div class="btnName">{{ button.name }}</div>
                <div class="btnSummary">{{ button.summary }}</div>
                <div class="btnCost">
                  <span>{{ starter.pname&&starter.pname.cost?starter.pname.cost:'cost' }}： </span>
                  <span :class="button.cost>0?'nes-text is-success':'nes-text is-error'">{{ button.cost }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="button" :class="restPoint>=0?'nes-btn':'nes-btn is-disabled'" @click="next()">
        {{restPoint>=0?'开始':'点数不足'}}
      </button>
    </div>
    
  </div>
</template>

<style scoped>
.starter {
  /* width: 100%; */
  font-family: ipix;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background-color: #ffffff;
}
.starter::-webkit-scrollbar {
  width: 6px;
  height: 100%;
  transition: all .3s;
}
.starter::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  /* border-radius: 20px; */
  box-shadow: inset 0 0 5px #d8d8d8;
  background: #535353;
}
/*滚动条轨道*/
.starter::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px #d8d8d8;
  /* border-radius: 20px; */
  background: #ededed;
}
.restPoint {
  position: fixed;
  top: 24px;
  left: 50px;
  font-size: 16px;
  z-index: 10;
}
.starterContent {
  margin-top: 36px;
}
.baseState {
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  /* flex-wrap: wrap; */
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
.button {
  width: 110px;
  height: 110px;
  min-height: 60px;
  margin-right: 16px;
  margin-bottom: 8px;
  padding: 8px;
  font-size: 12px;
  /* transition: all .3s; */
}
.btnName {
  font-weight: bold;
  height: 20%;
}
.btnSummary {
  font-style: italic;
  color: gray;
  height: 60%;
}
.btnCost {
  height: 20%;
}
.selected {
  border: 4px solid #000;
}
.button:hover {
  /* border-bottom: 4px solid #000; */
  animation: flickerBack 1.5s step-start infinite ;
}
.button:hover::after {
  content: "";
  width: 0;
  height: 0;
  position: relative;
  left: calc(50% - 10px);
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #000000 transparent;
  animation: flicker 1.5s step-start infinite ;
}
.a-space {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@keyframes flicker {
  0% {
    opacity: 0
  }
  50% {
    opacity: 1
  }
  100% {
    opacity: 0
  }
}
@keyframes flickerBack {
  0% {
    background-color: #ffffff;
  }
  50% {
    background-color: #e7e7e7;
  }
  100% {
    background-color: #ffffff;
  }
}
</style>
