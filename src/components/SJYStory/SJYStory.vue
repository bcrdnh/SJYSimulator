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

function start () {
  tiggerPool.addTigger('testO1', [
    'tigger testO1, it tigger every turn'
  ], 100, true)
  tiggerPool.addTigger('testO2', [
    'tigger testO2, it tigger 50%',
    {
      content: "try gain 20 v1",
      clas: "blue",
      changeVar: {
        varName: "v1",
        num: 20
      }
    }
  ], 50, true)
  tiggerPool.addTigger('testO3', [
    'tigger testO3, it tigger once'
  ], 100, false)
  tiggerPool.addTigger('testO4', [
    'tigger testO4, it tigger when v1 > 50'
  ], 100, false, () => getStates('v1') > 50)
  const part = [
    '{playerName} is a bad gay',
    'he borned, he is {age} years old',
    'start'
  ]
  const callback = () => {
    // turn0to5()
    dayPart0()
  }
  player.value.setDaram(part, callback)
}
function over () {
  router.push('/')
}

function turn0to5 () {
  let luckCorrection = 0
  if (special.has('testSP0')) luckCorrection = 10
  if (special.has('testSP2')) luckCorrection = -10
  wevp.addWEventArr([ev0to5.ev01, ev0to5.ev03], 50 + luckCorrection)
  wevp.addWEventArr([ev0to5.ev02, ev0to5.ev04], 50)
  const age = getStates('age')
  const ageInc = () => store.dispatch('sys/changeVar', {varName: 'age', num: 1})
  if (age <= 5) {
    player.value.setDaram(wevp.getWEvent(), () => {
      ageInc()
      turn0to5()
    })
  } else {
    turnLoop()
  }
}

function turnLoop () {
  if (getStates('hv') <= 0) {
    player.value.setDaram([
      '{playerName} dead!',
      'over'
    ], () => {
      over()
    })
  }
  let luckCorrection = 0
  if (special.has('testSP0')) luckCorrection = 10
  if (special.has('testSP2')) luckCorrection = -10
  dayPart0()
}

function dayPart0 () {
  tiggerPool.tigger(player.value, store.state.sys.globalVariable.special, dayPart1)
}
function dayPart1 () {
  player.value.lock()
  selector.value.setSelect([
    {
      name: 'gowork',
      action: () => {
        console.log('u clicked button')
        // player.value.clear()
        player.value.unlock()
        player.value.setDaram([
          'u decide go to work',
          'u worked',
          {
            content: "u gain 3 v1",
            clas: "blue",
            changeVar: {
              varName: "v1",
              num: 3
            }
          }
        ], () => {
          console.log('buttonover')
          dayPart2()
        })
      }
    },
    {
      name: 'gobed',
      action: () => {
        player.value.unlock()
        player.value.setDaram([
          'u decide go to bed',
          'u sleeped',
          {
            content: "u gain 3 v2",
            clas: "blue",
            changeVar: {
              varName: "v2",
              num: 3
            }
          }
        ], () => {
          dayPart2()
        })
      }
    }
  ])
  selector.value
}
function dayPart2 () {
  player.value.setDaram([
    'after one day',
    'u tried, u lose 10 hv',
    {
      content: 'u lose 10 hv',
      clas: 'red',
      changeVar: {
        varName: 'hv',
        num: -10
      }
    }
  ], () => {
    turnLoop()
  })
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
