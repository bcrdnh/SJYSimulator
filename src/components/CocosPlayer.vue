<script setup>
import wurl from '../assets/web-mobile/index.html?url'
</script>

<template>
  <div class="cocosPlayer">
    <iframe :src="wurl" height="100%" width="100%"></iframe>
  </div>
</template>

<style scoped>
.cocosPlayer {
  width: 100%;
  height: 100%;
}
</style>
