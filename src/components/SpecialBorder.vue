<script setup>
import { useStore } from 'vuex'
import { getSpecialByName } from '../assets/utils'
const store = useStore()
for (const s of store.state.sys.globalVariable.special) {
  console.log(s)
}
</script>

<template>
  <a-space class="stateBorder">
    <span v-for="s in store.state.sys.globalVariable.special">
      <a-tooltip placement="bottom" v-if="getSpecialByName(s[0]).display">
        <template #title>{{getSpecialByName(s[0]).summary?getSpecialByName(s[0]).summary:s[0]}}</template>
        <a-tag :color="getSpecialByName(s[0]).color?getSpecialByName(s[0]).color:'blue'">
          {{getSpecialByName(s[0]).displayName?getSpecialByName(s[0]).displayName:s[0]}}
          <span v-if="getSpecialByName(s[0]).stackable">:{{s[1]}}</span>
        </a-tag>
      </a-tooltip>
    </span>
  </a-space>
</template>

<style>
.stateBorder {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
</style>
