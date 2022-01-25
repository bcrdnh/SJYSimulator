<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import xiangsu_aixin from '../../assets/png/xiangsu_aixin.png?url'
import xiangsu_biaoqing from '../../assets/png/xiangsu_biaoqing.png?url'
import xiangsu_mao from '../../assets/png/xiangsu_mao.png?url'
import StateBorder from '../StateBorder.vue'
import Poptip from './../Poptip.vue'
import { getSpecialByName } from '../../assets/utils'
const stateInStore = useStore().getters['sys/getStates']
const sborder = ref()
const store = useStore()

// const maxHealth = ref(store.getters['sys/getStates']('maxHealth'))
// const health = store.getters['sys/getStates']('health')
// const maxHair = store.getters['sys/getStates']('maxHair')
// const hair = ref(store.getters['sys/getStates']('hair'))
const nowBorder = ref(0)

function addDisplayVar (name, displayName) {
  console.log(sborder)
  sborder.value.addDisplayVar(name, displayName)
}
function addVar (name) {
  sborder.value.addVar(name)
}
function removeDisplayVar (name) {
  sborder.value.removeDisplayVar(name)
}

defineExpose({
  addDisplayVar,
  addVar,
  removeDisplayVar
})
</script>

<template>
  <div class="complexBorder">
    <div class="tab">
      <label class="tabLine">
        <input type="radio" class="nes-radio" name="answer" v-model="nowBorder" :value="0" checked />
        <span><img :src="xiangsu_aixin" width="24" height="24" /></span>
      </label>
      <label class="tabLine">
        <input type="radio" class="nes-radio" name="answer" v-model="nowBorder" :value="1" />
        <span><img :src="xiangsu_biaoqing" width="24" height="24" /></span>
      </label>
      <label class="tabLine">
        <input type="radio" class="nes-radio" name="answer" v-model="nowBorder" :value="2" />
        <span><img :src="xiangsu_mao" width="24" height="24" /></span>
      </label>
    </div>
    <div class="content">
      <div v-show="0===nowBorder" class="heal">
        <div class="healLine">
          <span class="progressName">头发: </span>
          <Poptip 
            positon="bottom"
            :title="stateInStore('hair') / stateInStore('maxHair')"
          >
            <progress class="nes-progress progress" :value="stateInStore('hair')" :max="stateInStore('maxHair')"></progress>
          </Poptip>
        </div>
        <div class="healLine">
          <span class="progressName"><i class="nes-icon coin"></i>: </span>
          <span style="margin: auto 0;">{{stateInStore('money')}}</span>
        </div>
        <div class="healLine">
          <span class="progressName"><i class="nes-icon trophy"></i>: </span>
          <span style="margin: auto 0;">{{stateInStore('work')}}</span>
        </div>
      </div>
      <div v-show="1===nowBorder" class="heal">
        <StateBorder ref="sborder"></StateBorder>
      </div>
      <div v-show="2===nowBorder" class="special">
        <span v-for="s in store.state.sys.globalVariable.special" style="margin-right: 8px;">
          <Poptip
            position="bottom"
            v-if="getSpecialByName(s[0]).display"
            :title="getSpecialByName(s[0]).summary?getSpecialByName(s[0]).summary:s[0]"
          >
            <div class="nes-badge">
              <span class="is-primary">{{getSpecialByName(s[0]).displayName?getSpecialByName(s[0]).displayName:s[0]}}</span>
              <span class="is-primary" v-if="getSpecialByName(s[0]).stackable">:{{s[1]}}</span>
            </div>
          </Poptip>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.complexBorder {
  display: flex;
  flex-direction: column;
  border: 4px solid #000000;
  min-width: 220px;
  user-select: none;
}
.tab {
  display: flex;
  flex-direction: row;
  height: 50px;
  padding: 8px;
  border-bottom: 2px solid #000000;
}
.tabLine::after {
  content: '';
  border-left: 2px solid;
  margin-left: 16px;
}
.btn {
  width: 50px;
  border-radius: 5px 5px 0 0;
  margin: 0 4px;
}
.content {
  flex: 1;
  padding: 8px;
  height: calc(100% - 50px);
  overflow-y: auto;
  user-select: none;
  padding: 0 24px;
}
.content::-webkit-scrollbar {
  width: 6px;
  height: 100%;
  transition: all .3s;
}
.content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  /* border-radius: 20px; */
  box-shadow: inset 0 0 5px #d8d8d8;
  background: #535353;
}
/*滚动条轨道*/
.content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px #d8d8d8;
  /* border-radius: 20px; */
  background: #ededed;
}
.heal {
  max-width: 320px;
}
.healLine {
  display: flex;
  margin-bottom: 16px;
  min-height: 36px;
}
.progressName {
  margin: auto 0;
}
.progress {
  flex: 1;
  height: auto;
}
.special {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* overflow-y: auto; */
  height: 100%;
}
</style>
<style>
.ant-tooltip-inner {
  font-family: zpix;
}
</style>