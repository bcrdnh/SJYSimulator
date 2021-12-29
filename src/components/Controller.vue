<script>
import Player from './Player.vue'
export default {
  components: {
    Player
  },
  data () {
    return {
    }
  }
}
</script>

<template>
  <div class="controller">
    <Player ref="player"></Player>
  </div>
</template>

<style>
.player {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.msgBox {
  overflow: auto;
}
</style>
