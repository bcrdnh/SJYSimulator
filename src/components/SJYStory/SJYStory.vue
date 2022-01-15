<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setVar, changeVar, newTiggerPool, newWeightEventPool, bondingSelect } from '../../assets/utils.js'
import Player from '../Player.vue'
import StateBorder from '../StateBorder.vue'
import SpecialBorder from '../SpecialBorder.vue'
import Selector from '../Selector.vue'
import fixedSelector from '../fixedSelector.vue'
import { preloadPart0 } from '../../assets/SJYStory/preloadPlot.js'
import { NEv, SSRGoodEv, SRGoodEv, SRBadEv } from '../../assets/SJYStory/startStage.js'
import { endStartStage, dayStartPlot, dayMorning_labels, dayMorning_Darams, dayNoon_labels, dayNoon_Darams, dayAfternoon_labels, dayAfternoon_Darams, dayEvening_labels, dayEvening_Darams } from '../../assets/SJYStory/everyDay.js'
const player = ref(null)
const border = ref(null)
const selector = ref(null)
const router = useRouter()
const store = useStore()

const getSpecial = store.getters['sys/getSpecial']
const getStates = store.getters['sys/getStates']
const special = store.state.sys.globalVariable.special
const tiggerPool = newTiggerPool()

let luckCorrection = 0

onMounted(() => {
  beforeEvenyThingStart()
})
function beforeEvenyThingStart () {
  // console.log(store.state.sys)
  setVar('playerName', store.state.sys.playerName)
  setVar('age', 6)
  setVar('day', 1)
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
  player.value.setDaram(dayStartPlot, () => {
    tiggerPool.tigger(player.value, store.state.sys.globalVariable.special, dayP1)
  })
}

function dayP1 () {
  player.value.setDaram(['你决定......'], () => {
    bondingSelect(dayMorning_labels(), dayMorning_Darams(), player, selector, dayP2)
  })
}

function dayP2 () {
  player.value.setDaram(['到午休时间了，该吃点什么呢？'], () => {
    bondingSelect(dayNoon_labels(), dayNoon_Darams(), player, selector, dayP3)
  })
}

function dayP3 () {
  player.value.setDaram(['午休结束了，到了下午的工作时间了。'], () => {
    bondingSelect(dayAfternoon_labels(), dayAfternoon_Darams(), player, selector, dayP4)
  })
}

function dayP4 () {
  player.value.setDaram(['下班了，你决定.....'], () => {
    bondingSelect(dayEvening_labels(), dayEvening_Darams(), player, selector, dayOver)
  })
}

function dayOver () {
  changeVar('day', 1)
  if (getStates('day') > 1) (
    player.value.setDaram(['{playerName}短暂的一生结束了。'], () => {
      router.push('/')
    })
  )
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
    <fixedSelector ref="selector"></fixedSelector>
    <Player ref="player" class="player"></Player>
  </div>
</template>

<style scoped>
.controller {
  font-family: zpix;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  padding: 24px;
}
.player {
  flex: 1;
  width: 100%;
}
</style>
