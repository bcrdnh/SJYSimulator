<script setup>
import { ref } from 'vue';
import { changePage } from './assets/utils';

const showDev = ref(true)

function defaultDaram () {
  changePage('/starter')
  // router.push('/starter')
}
function SJYStory () {
  changePage('/SJYStoryEnter')
  // router.push('/SJYStoryEnter')
}
function toCocos () {
  changePage('/cocosPlayer')
}

</script>

<template>
  <div class="devBtn">
    <a-button shape="circle" @click="showDev=!showDev">Dev</a-button>
  </div>
  <a-space class="devMenu" v-if="showDev">
    <a-button @click="changePage('/')">restart</a-button>
    <a-button @click="defaultDaram()">test</a-button>
    <a-button @click="SJYStory()">SJY Story</a-button>
    <!-- <a-button @click="toCocos()">test Cocos</a-button> -->
    <div>版本号：3.0.1</div>
  </a-space>
  <div  class="root nes-container is-rounded">
    <div class="anime-div">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
body {
  margin: 0px;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.root {
  height: 90%;
  width: 90%;
  min-width: 420px;
  overflow: hidden;
}
.anime-div {
  height: 100%;
  width: 100%;
}
#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.devBtn {
  position: fixed;
  top: 0px;
  left: 0px;
}
.devMenu {
  position: fixed;
  top: 0px;
  left: 40px;
  display: flex;
  flex-direction: row;
  z-index: 10;
}
</style>
