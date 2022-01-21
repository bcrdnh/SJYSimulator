<!-- 这真的有意义吗 -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setVar } from '../../assets/utils'

const clicked = ref(false)
const summarys = ref([
  'a',
  'b',
  'c'
])
const difficulty = ref(0)
const router = useRouter()

function changeSummary () {

}
</script>

<template>
  <div class="start-menu" v-if="!clicked" @click="clicked=true">
    <div class="start-menu-logo">
      logo
    </div>
    <div class="start-menu-menu">
      press any button to start
    </div>
  </div>
  <div v-if="clicked">
    <div class="start-menu-radio-box">
      <div class="start-menu-radio-box-line-radio" @mouseenter="changeSummary(0)">
        <label>
          <input type="radio" class="nes-radio" name="answer" v-model="difficulty" :value="0" checked />
          <span>Yes</span>
        </label>        
      </div>


      <div class="start-menu-radio-box-line-radio" @mouseenter="changeSummary(1)">
        <label>
          <input type="radio" class="nes-radio" name="answer" v-model="difficulty" :value="1" />
          <span>No</span>
        </label>
      </div>


      <div class="start-menu-radio-box-line-radio" @mouseenter="changeSummary(2)">
        <label>
          <input type="radio" class="nes-radio" name="answer" v-model="difficulty" :value="2" />
          <span>Yes</span>
        </label>        
      </div>


      <div class="start-menu-radio-box-line">
        {{summarys[difficulty]}}
      </div>

      <div class="start-menu-radio-box-line">
        <button type="button" class="nes-btn" @click="setVar('difficulty', difficulty);router.push('/SJYStoryEnter')">Start</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.start-menu {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.start-menu-logo {
  margin: 15% 0 30% 0;
  font-style: italic;
  font-size: 44px;
}
.start-menu-radio-box {
  margin: 15% 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.start-menu-radio-box-line {
  margin: 12px 0;
}
.start-menu-radio-box-line-radio {
  margin: 12px 0 12px -16px;
}
.start-menu-menu {
  animation: flicker 1.5s step-start infinite ;
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
</style>