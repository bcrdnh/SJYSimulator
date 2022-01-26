<!-- 这真的有意义吗 -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setVar } from '../../assets/utils'

const clicked = ref(false)
const summarys = ref([
  '大概率都可以通过最终的考核，运气不太差的话。',
  '正常的难度，有一点点挑战。',
  '几乎不可能通过的难度。'
])
const difficulty = ref(0)
const router = useRouter()

function changeSummary () {

}
</script>

<template>
  <div class="start-menu" v-if="!clicked" @click="clicked=true">
    <div class="start-menu-logo">
      家翊模拟器
      <img src="./../../assets/png/strong_SJY.png">
    </div>
    <div class="start-menu-menu">
      press any button to start
    </div>
  </div>
  <div v-if="clicked">
    <div class="start-menu-radio-box">
      <h2>选择难度！</h2>
      <div class="start-menu-radio-box-line-radio" @mouseenter="changeSummary(0)">
        <label>
          <input type="radio" class="nes-radio" name="answer" v-model="difficulty" :value="0" checked />
          <span>简单</span>
        </label>        
      </div>

      <div class="start-menu-radio-box-line-radio" @mouseenter="changeSummary(1)">
        <label>
          <input type="radio" class="nes-radio" name="answer" v-model="difficulty" :value="1" />
          <span>普通</span>
        </label>
      </div>

      <div class="start-menu-radio-box-line-radio" @mouseenter="changeSummary(2)">
        <label>
          <input type="radio" class="nes-radio" name="answer" v-model="difficulty" :value="2" />
          <span>噩梦</span>
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
  font-family: zpix;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: relative;
}
.start-menu-logo {
  /* margin: 15% 0 160px 0; */
  position: absolute;
  top: 100px;
  font-style: italic;
  font-size: 44px;
}
.start-menu-radio-box {
  font-family: zpix;
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
  position: absolute;
  bottom: 100px;
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