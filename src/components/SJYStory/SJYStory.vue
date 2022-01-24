<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setVar, changeVar, newTiggerPool, newWeightEventPool, bondingSelect, randomNum, randomArr } from '../../assets/utils.js'
import Player from '../Player.vue'
import StateBorder from '../StateBorder.vue'
import SpecialBorder from '../SpecialBorder.vue'
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
  noHair1,
  noHair2,
  endGamePlot,
  beforeDayP1,
  beforeDayP1SSR
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
  // console.log(store.state.sys)
  setVar('playerName', store.state.sys.playerName)
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
    '由于昨晚住在破屋中，没能睡好，头发-2',
    {
      content: "头发-2",
      clas: "red",
      changeVar: {
        varName: "hair",
        num: -2
      }
    }
  ], 10, true)
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
  ], 10, true)
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
  if (getStates('age') < 22) {
    player.value.setDaram(SSWEP.getWEvent(), startStage)
    changeVar('age', 1)
  } else {
    player.value.setDaram(endStartStage, dayStart)
  }
}

function dayStart () {
  if (getStates('day') % 7 !== 0) {
    player.value.setDaram(dayStartPlot, () => {
      tiggerPool.tigger(player.value, store.state.sys.globalVariable.special, dayP1)
    })    
  } else {
    player.value.setDaram(weekendStartPlot, () => {
      tiggerPool.tigger(player.value, store.state.sys.globalVariable.special, dayP1)
    })
  }
  // checkEnd()
}

function dayP1 () {
  if (getStates('hair') <= 0) {
    player.value.setDaram(noHair1, dayOver)
    return
  }
  if (randomNum() < 40) {
    player.value.setDaram(randomArr(beforeDayP1), () => {})
  }
  if (randomNum() < 3) {
    player.value.setDaram(randomArr(beforeDayP1SSR), () => {})
  }
  if (getStates('day') % 7 !== 0) {
    player.value.setDaram(['你决定......'], () => {
      bondingSelect(dayMorning_labels(), dayMorning_Darams(), player, selector, () => {})
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
  dayP2()
}

function dayP2 () {
  if (getStates('hair') <= 0) {
    player.value.setDaram(noHair1, dayOver)
    return
  }
  player.value.setDaram(['到中午了。'], () => {
    bondingSelect(dayNoon_labels(), dayNoon_Darams(), player, selector, dayP3)
  })
  // checkEnd()
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
  // checkEnd()
}

function dayP4 () {
  if (getStates('hair') <= 0) {
    player.value.setDaram(noHair2, dayStart)
    return
  }
  if (getStates('day') !== 6 && getStates('day') !== 13 && getStates('day') !== 20) {
    player.value.setDaram(['下班了，你决定.....'], () => {
      bondingSelect(dayEvening_labels(), dayEvening_Darams(), player, selector, dayOver)
    })
  } else {
    if (getStates('money') < 400) {
      player.value.setDaram(beforeWeekendEvening(), dayOver)
    } else {
      player.value.setDaram(beforeWeekendEvening(), () => {
        bondingSelect(weekendEvening_labels(), weekendEvening_darams(), player, selector, dayOver)
      })
    }
  }
  // checkEnd()
}

function lastTurn () {
  const power = getStates('power')
  const stamina = getStates('stamina')
  const inte = getStates('inte')
  const charm = getStates('charm')
  const brave = getStates('brave')
  player.value.setDaram([
    '终于，你来到了最后的一次考核',
    '这次考核是你能否通过试用期的关键，同时也是最难的一次考核。',
    '最终的考核将从多方面评定你的业绩。',
    '毕竟你需要经常加班，所以首先是对你的体能进行检测！',
    '你拥有{power}点力量，{stamina}点耐力！',
    {
      'content': '你获得了' + stateToWork(power, stamina) + '点业绩！',
      'clas': 'nes-text is-primary',
      'changeVar': {
        'varName': 'work',
        'num': stateToWork(power, stamina)
      }
    },
    '接下来是对工作能力的评定，你拥有{}点智力。',
    {
      'content': '你获得了' + stateToWork(inte) + '点业绩！',
      'clas': 'nes-text is-primary',
      'changeVar': {
        'varName': 'work',
        'num': stateToWork(inte)
      }
    },
    '接下来是对人际关系的评定，你拥有{charm}点魅力，{brave}点勇气。',
    {
      'content': '你获得了' + stateToWork(inte) + '点业绩！',
      'clas': 'nes-text is-primary',
      'changeVar': {
        'varName': 'work',
        'num': stateToWork(inte)
      }
    },
    '接下来是对你经济状况的考察，你拥有{money}点金币。',
    {
      'content': '你获得了' + stateToWork(inte) + '点业绩！',
      'clas': 'nes-text is-primary',
      'changeVar': {
        'varName': 'work',
        'num': stateToWork(inte)
      }
    },
  ])
}

function stateToWork (s1, s2 = 0) {

}

function dayOver () {
  changeVar('day', 1)
  player.value.setDaram(afterOneDay, () => {
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
      <ComplexBorder ref="border" class="complexBorder"></ComplexBorder>
      <div class="info-border-content">
        <InfoBorder></InfoBorder>
      </div>
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
  height: 40%;
  margin-bottom: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.player {
  flex: 1;
  width: 100%;
  height: 60%;
}
.complexBorder {
  width: 40%;
  margin-right: 8px;
}
.info-border-content {
  flex: 1;
  border: 4px solid #000000;
}
</style>
