<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

function defaultDaram () {
  router.push('/starter')
}
function SJYStory () {
  router.push('/SJYStoryEnter')
}

</script>

<template>
  <a-space>
    <a-button @click="defaultDaram()">test</a-button>
    <a-button @click="SJYStory()">SJYStory</a-button>
  </a-space>
  <router-view></router-view>
</template>

<style>
body {
  margin: 0px;
}
#app {
  background-color: rgba(50, 50, 50, 0.1);
}
</style>
