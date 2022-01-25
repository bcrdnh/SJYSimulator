<script setup>
import { useStore } from 'vuex'
import { getSpecialByName } from '../assets/utils'
import Poptip from './Poptip.vue';
const store = useStore()
for (const s of store.state.sys.globalVariable.special) {
  console.log(s)
}
</script>

<template>
  <div class="stateBorder">
    <span v-for="s in store.state.sys.globalVariable.special">
      <Poptip
        placement="bottom" v-if="getSpecialByName(s[0]).display"
        :title="getSpecialByName(s[0]).summary?getSpecialByName(s[0]).summary:s[0]"
      >
        <div class="nes-badge" :color="getSpecialByName(s[0]).color?getSpecialByName(s[0]).color:'blue'">
          {{getSpecialByName(s[0]).displayName?getSpecialByName(s[0]).displayName:s[0]}}
          <span v-if="getSpecialByName(s[0]).stackable">:{{s[1]}}</span>
        </div>
      </Poptip>
    </span>
  </div>
</template>

<style scoped>
.stateBorder {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
</style>
