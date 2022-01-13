<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { changePage } from './assets/utils';
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
  <div class="root">
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
  background-color: rgb(255, 255, 255);
  border-radius: 50px;
  box-shadow: 2px 2px 16px #8888885b;
  overflow: hidden;
}
#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgb(113, 204, 196) 50%, rgba(255,255,255,0) 0) 0 0,
  radial-gradient(circle closest-side, rgb(113, 204, 196) 53%, rgba(255,255,255,0) 0) 0 0,
  radial-gradient(circle closest-side, rgb(113, 204, 196) 50%, rgba(255,255,255,0) 0) 55px 0 rgb(251, 243, 226);
  background-size: 110px 200px;
  background-repeat: repeat-x;
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
