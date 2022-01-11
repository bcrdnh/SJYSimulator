<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setVar } from '../../assets/utils.js'
import Player from '../Player.vue'
import StateBorder from '../StateBorder.vue'
import SpecialBorder from '../SpecialBorder.vue'
import Selector from '../Selector.vue'
import ev0to5 from '../../assets/defaultDaram/event.js'
const player = ref(null)
const border = ref(null)
const selector = ref(null)
const router = useRouter()
const store = useStore()

const evPool = store.state.event.eventPool
const wevp = store.state.event.wEventPool
const tiggerPool = store.state.event.tiggerPool
const getSpecial = store.getters['sys/getSpecial']
const getStates = store.getters['sys/getStates']
const special = store.state.sys.globalVariable.special

onMounted(() => {
  beforeEvenyThingStart()
})

function beforeEvenyThingStart () {
  setVar('age', 0)
  border.value.addDisplayVar('power', '力量')
  border.value.addDisplayVar('stamina', '耐力')
  border.value.addDisplayVar('inte', '智力')
  border.value.addDisplayVar('health', '生命值')
  border.value.addDisplayVar('hair', '头发')
    tiggerPool.addTigger('破屋', [
    '由于昨晚住在破屋中，没能睡好，头发-2',
    {
      content: "头发-2",
      clas: "red",
      changeVar: {
        varName: "hair",
        num: -2
      }
    }
  ], 15, true)
  tiggerPool.addTigger('永恒霸王', [
    '使用霸王洗发液洗头，由于洗发液用不完所以不会心疼，多洗了两次头。头发增加了一些',
    {
      content: "头发+2",
      clas: "blue",
      changeVar: {
        varName: "hair",
        num: 2
      }
    }
  ], 15, true)
}

function startStage () {
  // 开始的随机数据积累阶段
  
}

function dayStart () {
  tiggerPool.tigger(player.value, store.state.sys.globalVariable.special, dayP1)
}

function dayP1 () {
  
}

function dayP2 () {
  
}

function dayP3 () {
  
}

function dayP4 () {
  
}

function dayOver () {
  
}

function checkEnd () {
  if (getStates('health') <= 0) {
    router.push('/')
  }  
  return false
}
</script>

<template>
  <div class="controller">
    <StateBorder ref="border"></StateBorder>
    <SpecialBorder></SpecialBorder>
    <Selector ref="selector"></Selector>
    <Player ref="player" class="player"></Player>
  </div>
</template>

<style>
.controller {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  border: 4px solid #f0f0f0;
  border-radius: 24px;
  padding: 24px;
}
.player {
  flex: 1;
  width: 100%;
}
</style>
