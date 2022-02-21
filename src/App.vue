<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Poptip from './components/Poptip.vue';
import { router } from './router';
const store = useStore()

onMounted(() => {
  store.dispatch('sys/resetStarter')
})
function restart () {
  router.push('/')
  store.dispatch('sys/resetStarter')
}
</script>

<template>
  <div class="devMenu">
    <Poptip title="重开">
      <img src="./assets/png/buxudong.png" alt="重开" width="24" @click="restart()">
    </Poptip>
    <div>版本号：4.0.2</div>
  </div>
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
  user-select: none;
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
