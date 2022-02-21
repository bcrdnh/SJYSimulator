<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  setVar,
  changeVar,
  newTiggerPool,
  newWeightEventPool,
  bondingSelect,
  randomNum,
  randomArr,
  randomState,
  stateObj
} from '../../assets/utils.js'
import Player from '../Player.vue'
import InfoBorder from './InfoBorder.vue'
import FixedSelector from '../FixedSelector.vue'
import ComplexBorder from './ComplexBorder.vue'
import { preloadPart0 } from '../../assets/SJYStory/preloadPlot.js'
import { NEv, SSRGoodEv, SRGoodEv, SRBadEv } from '../../assets/SJYStory/startStage.js'
import {
  endStartStage,
  dayStartPlot,
  dayMorning_labels,
  dayMorning_Darams,
  dayNoon_labels,
  dayNoon_Darams,
  dayAfternoon_labels,
  dayAfternoon_Darams,
  dayEvening_labels,
  dayEvening_Darams,
  afterOneDay,
  assessment,
  weekendStartPlot,
  beforeWeekendEvening,
  weekendEvening_labels,
  weekendEvening_darams,
  noHair1,
  noHair2,
  endGamePlot,
  beforeDayP1,
  beforeDayP1SSR,
  beforeDayP2,
  afterDayP4,
  weekendMorning_labels,
  weekendMorning_darams
} from '../../assets/SJYStory/everyDay.js'
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
  
  if (!getStates('playerName')) {
    // 说明是直接刷新或者通过URL进入
    store.dispatch('sys/loadGlobalVariable')
  }
  // setVar('playerName', store.state.sys.playerName)
  setVar('age', 6)
  setVar('day', 1)
  setVar('work', 0)
  setVar('reganmianTime', 0)
  setVar('MDCTime', 0)
  setVar('gymTime', 0)
  setVar('barTime', 0)
  setVar('热干面', false)
  setVar('麦当劳', false)
  setVar('盖浇饭', false)
  setVar('海底捞', false)
  setVar('鸡公煲', false)
  setVar('玩手机', false)
  setVar('锻炼身体', false)
  setVar('休息', false)
  setVar('巴结领导', false)
  setVar('究极摸鱼', false)
  setVar('健身房', false)
  setVar('酒吧', false)
  setVar('美发店', false)
  setVar('工地', false)
  setVar('FF14', false)
  border.value.addDisplayVar('power', '力量')
  border.value.addDisplayVar('stamina', '耐力')
  border.value.addDisplayVar('inte', '智力')
  border.value.addDisplayVar('charm', '魅力')
  border.value.addDisplayVar('brave', '勇气')
  tiggerPool.addTigger('破屋', [
    '破屋四处漏风，你感到很冷。头发减少。',
    {
      content: "头发-2",
      clas: "nes-text is-error",
      changeVar: {
        varName: "hair",
        num: -2
      }
    }
  ], 15, true)
  tiggerPool.addTigger('大豪斯', [
    '你看着自己的大房子，感觉非常爽。',
    {
      content: "头发+2",
      clas: "nes-text is-primary",
      changeVar: {
        varName: "hair",
        num: 2
      }
    }
  ], 15, true)
  tiggerPool.addTigger('永恒霸王', [
    '使用霸王洗发液洗头！头发增加了一些。',
    {
      content: "头发+2",
      clas: "nes-text is-primary",
      changeVar: {
        varName: "hair",
        num: 2
      }
    }
  ], 20, true)
  tiggerPool.addTigger('帅', [
    '你被自己帅哭了。',
    {
      content: "魅力上升！",
      clas: "nes-text is-primary",
      changeVar: {
        varName: "charm",
        num: 2
      }
    }
  ], 20, true)
  tiggerPool.addTigger('旧书', [
    '你翻了翻你的旧书，你感受到了知识的力量！',
    {
      content: "力量上升！",
      clas: "nes-text is-primary",
      changeVar: {
        varName: "power",
        num: 2
      }
    }
  ], 20, true)
  tiggerPool.addTigger('跑步机', [
    '你久违地打算用用跑步机。',
    '跑步机太久不用，坏了...',
    '你尝试修复它。',
    {
      content: "智力上升！",
      clas: "nes-text is-primary",
      changeVar: {
        varName: "inte",
        num: 2
      }
    }
  ], 20, true)
  tiggerPool.addTigger('存钱罐', [
    '你检查了下存钱罐，哇，有好多钱。',
    '不存钱也会有钱吗？',
    {
      content: "获得金钱！",
      clas: "nes-text is-primary",
      changeVar: {
        varName: "money",
        num: 50
      }
    }
  ], 20, true)
  tiggerPool.addTigger('电饼铛', [
    '你用电饼铛做了两个手抓饼。加了四根香肠。',
    '吃得很爽。随机属性上升！',
    randomState(3),
    randomState(3)
  ], 40, true)
  if (special.has('yq1')) luckCorrection = -5
  if (special.has('yq3')) luckCorrection = 5
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
  if (getStates('age') < 23) {
    player.value.setDaram(SSWEP.getWEvent(), startStage)
    changeVar('age', 1)
  } else {
    player.value.setDaram(endStartStage, dayStart)
  }
}

function dayStart () {
  if (getStates('day') % 7 !== 0) {
    player.value.setDaram(dayStartPlot, dayP1)
  } else {
    player.value.setDaram(weekendStartPlot, dayP1)
  }
  // checkEnd()
}

function dayP1 () {
  if (getStates('hair') <= 0) {
    player.value.setDaram(noHair1, dayOver)
    return
  }
  const dayP1Event = () => {
    if (getStates('day') % 7 !== 0) {
      player.value.setDaram(['你决定......'], () => {
        bondingSelect(dayMorning_labels(), dayMorning_Darams(), player, selector, dayP2)
      })
    } else {
      player.value.setDaram(['你决定......'], () => {
        bondingSelect(weekendMorning_labels(),
        weekendMorning_darams(),
        player,
        selector,
        getStates('day') === 21 ? lastTurn : dayP2)
      })
    }
  }
  const beforeDayP1SSREvent = () => {
    if (randomNum() < 3) {
      player.value.setDaram(randomArr(beforeDayP1SSR()), dayP1Event)
    } else {
      dayP1Event()
    }
  }
  const beforeDayP1Event = () => {
    if (randomNum() < 40 && getStates('day') !== 1) {
      player.value.setDaram(randomArr(beforeDayP1()), beforeDayP1SSREvent)
    } else {
      beforeDayP1SSREvent()
    }

  }
  beforeDayP1Event()
}

function dayP2 () {
  if (getStates('hair') <= 0) {
    player.value.setDaram(noHair1, dayOver)
    return
  }
  const beforeDayP2Event = () => {
    if (randomNum() < 40) {
      player.value.setDaram(randomArr(beforeDayP2()), dayP2Event)
    } else {
      dayP2Event()
    }
  }
  const dayP2Event = () => {
    player.value.setDaram(['该找个地方吃饭了...'], () => {
      bondingSelect(dayNoon_labels(), dayNoon_Darams(), player, selector, dayP3)
    })
  }
  beforeDayP2Event()
}

function dayP3 () {
  if (getStates('hair') <= 0) {
    player.value.setDaram(noHair2, dayStart)
    return
  }
  if (getStates('day') % 7 !== 0) {
    player.value.setDaram(['下午了。'], () => {
      bondingSelect(dayAfternoon_labels(), dayAfternoon_Darams(), player, selector, dayP4)
    })
  } else {
    assessment(player.value, dayP4, gameOver)
  }
}

function dayP4 () {
  if (getStates('hair') <= 0) {
    player.value.setDaram(noHair2, dayStart)
    return
  }
  const dayP4Event = () => {
    if (getStates('day') !== 6 && getStates('day') !== 13 && getStates('day') !== 20) {
      player.value.setDaram(['下班了，你决定.....'], () => {
        bondingSelect(dayEvening_labels(), dayEvening_Darams(), player, selector, () => {
          tiggerPool.tigger(player.value, store.state.sys.globalVariable.special, afterDayP4Event)
        })
      })
    } else {
      if (getStates('money') < 400) {
        player.value.setDaram(beforeWeekendEvening(), afterDayP4Event)
      } else {
        player.value.setDaram(beforeWeekendEvening(), () => {
          bondingSelect(weekendEvening_labels(), weekendEvening_darams(), player, selector, afterDayP4Event)
        })
      }
    }    
  }
  const afterDayP4Event = () => {
    if (randomNum() < 40) {
      player.value.setDaram(randomArr(afterDayP4()), dayOver)
    } else {
      dayOver()
    }
  }
  dayP4Event()
}

function lastTurn () {
  player.value.setDaram(endGamePlot(), () => {
    router.push('/')
  })
}

function dayOver () {
  changeVar('day', 1)
  player.value.setDaram(afterOneDay(), () => {
    dayStart()
  })
}

function checkHair () {
  if (getStates('hair') <= 0) {
    
  }  
  return false
}

function gameOver (word = ['{playerName}短暂的一生结束了。']) {
  player.value.setDaram(word, () => {
    router.push('/')
  })
}
</script>

<template>
  <div class="controller">
    <!-- <StateBorder v-if="false"></StateBorder>
    <SpecialBorder v-if="false"></SpecialBorder> -->
    <div class="mediaPart">
      <div class="info-border-content">
        <InfoBorder></InfoBorder>
      </div>
      <ComplexBorder ref="border" class="complexBorder"></ComplexBorder>
    </div>
    <FixedSelector ref="selector"></FixedSelector>
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
.mediaPart {
  height: fit-content;
  margin-bottom: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.player {
  flex: 1;
  width: calc(100% - 8px);
  min-height: 350px;
  margin: 0 8px 8px 0;
}
.complexBorder {
  flex: 1;
  margin: 0 8px 8px 0;
}
.info-border-content {
  flex: 1;
  max-height: 250px;
  border: 4px solid #000000;
  margin: 0 8px 8px 0;
}
</style>
