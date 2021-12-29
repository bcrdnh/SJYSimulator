<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setVar } from '../assets/utils.js'
import Player from './Player.vue'
import stateBorder from './StateBorder.vue'
import specialBorder from './SpecialBorder.vue'
import ev0to5 from '../assets/defaultDaram/event.json'
const player = ref(null)
const border = ref(null)
const router = useRouter()
const store = useStore()
const evPool = store.state.event.eventPool

onMounted(() => {
  start()
})

function beforeStart () {}

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
  evPool.addEventObj(ev0to5)
  const age = store.getters['sys/getStates']('age')
  const ageInc = () => store.dispatch('sys/changeVar', {varName: 'age', num: 1})
  console.log(age)
  if (age <= 5) {
    player.value.setDaram(evPool.getEvent(), () => {
      ageInc()
      turn0to5()
    })
  } else {
    player.value.setDaram([
      '{playerName} is really a bad gay',
      'he dead',
      'over!'
    ], () => {
      over()
    })
  }
}

</script>

<template>
  <div class="controller">
    <stateBorder ref="border"></stateBorder>
    <specialBorder></specialBorder>
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
