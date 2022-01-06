<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setVar } from '../assets/utils.js'
import Player from './Player.vue'
import stateBorder from './StateBorder.vue'
import specialBorder from './SpecialBorder.vue'
import selector from './Selector.vue'
import ev0to5 from '../assets/defaultDaram/event.js'
const player = ref(null)
const border = ref(null)
const selector = ref(null)
const router = useRouter()
const store = useStore()
const evPool = store.state.event.eventPool
const wevp = store.state.event.wEventPool
const getSpecial = store.getters['sys/getSpecial']
const getStates = store.getters['sys/getStates']

onMounted(() => {
  start()
})

function start () {
  setVar('playerName', 'sjy')
  setVar('age', 0)
  border.value.addDisplayVar('v1', '数据1')
  border.value.addDisplayVar('v2', '数据2')
  const part = [
    '{playerName} is a bad gay',
    'he borned, he is {age} years old',
    'start'
  ]
  const callback = () => {
    turn0to5()
  }
  player.value.setDaram(part, callback)
}
function over () {
  router.push('/')
}

function turn0to5 () {
  let luckCorrection = 0
  if (getSpecial('testSP0')) luckCorrection = 10
  if (getSpecial('testSP2')) luckCorrection = -10
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
    ], over())
  }
  let luckCorrection = 0
  if (getSpecial('testSP0')) luckCorrection = 10
  if (getSpecial('testSP2')) luckCorrection = -10
  dayPart0()
}

function dayPart0 () {
  if (getSpecial('testO1')) {
    
  }
}
function dayPart1 () {
  selector.value.setSelect([
    {
      name: 'gowork',
      action: () => {
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
        ], dayPart2())
      }
    },
    {
      name: 'gobed',
      action: () => {
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
        ], dayPart2())
      }
    }
  ])
}
function dayPart2 () {
  player.value.setDaram([
    'after one day',
    'u tried, u lose 10 vp',
    {
      content: 'u lose 10 vp',
      clas: 'red',
      changeVar: {
        varName: 'vp',
        num: -10
      }
    }
  ], turnLoop())
}
</script>

<template>
  <div class="controller">
    <stateBorder ref="border"></stateBorder>
    <specialBorder></specialBorder>
    <selector ref="selector"></selector>
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
