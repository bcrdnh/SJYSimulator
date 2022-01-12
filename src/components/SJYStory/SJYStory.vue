<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setVar, changeVar, newTiggerPool, newWeightEventPool, bondingSelect } from '../../assets/utils.js'
import Player from '../Player.vue'
import StateBorder from '../StateBorder.vue'
import SpecialBorder from '../SpecialBorder.vue'
import Selector from '../Selector.vue'
import { preloadPart0 } from '../../assets/SJYStory/preloadPlot.js'
import { NEv, SSRGoodEv, SRGoodEv, SRBadEv } from '../../assets/SJYStory/startStage.js'
import { endStartStage, dayStartPlot, dayMorning_labels, dayMorning_Darams } from '../../assets/SJYStory/everyDay.js'
const player = ref(null)
const border = ref(null)
const selector = ref(null)
const router = useRouter()
const store = useStore()

const getSpecial = store.getters['sys/getSpecial']
const getStates = store.getters['sys/getStates']
const special = store.state.sys.globalVariable.special

let luckCorrection = 0

onMounted(() => {
  beforeEvenyThingStart()
})
function beforeEvenyThingStart () {
  setVar('age', 6)
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
  if (special.has('yq0')) luckCorrection = -10
  if (special.has('yq1')) luckCorrection = -5
  if (special.has('yq3')) luckCorrection = 5
  if (special.has('yq4')) luckCorrection = 10
  preloadPart()
}

function preloadPart () {
  preloadPart0(player, selector, startStage)
}

function startStage () {
  // 开始的随机数据积累阶段
  const SSWEP = newWeightEventPool()
  SSWEP.addWEventObj(NEv, 65)
  SSWEP.addWEventObj(SRGoodEv, 15 + luckCorrection)
  SSWEP.addWEventObj(SSRGoodEv, 5 + luckCorrection)
  SSWEP.addWEventObj(SRBadEv, 15 - luckCorrection)
  if (getStates('age') < 22) {
    player.value.setDaram(SSWEP.getWEvent(), startStage)
    changeVar('age', 1)
  } else {
    player.value.setDaram(endStartStage, dayStart)
  }
}

function dayStart () {
  const tiggerPool = newTiggerPool()
  player.value.setDaram(dayStartPlot, () => {
    tiggerPool.tigger(player.value, store.state.sys.globalVariable.special, dayP1)
  })
}

function dayP1 () {
  bondingSelect(dayMorning_labels, dayMorning_Darams, player, selector, dayP2)
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

<style scoped>
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
