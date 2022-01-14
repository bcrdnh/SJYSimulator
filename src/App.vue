<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { changePage } from './assets/utils';
import fontURL from './assets/aura.ttf?url'
console.log(fontURL)
const router = useRouter()
const showDev = ref(true)

function defaultDaram () {
  changePage('/starter')
  // router.push('/starter')
}
function SJYStory () {
  changePage('/SJYStoryEnter')
  // router.push('/SJYStoryEnter')
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
    <div>版本号：2.0.4</div>
  </a-space>
  <div class="root nes-container is-rounded">
    <router-view></router-view>
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
}
</style>
