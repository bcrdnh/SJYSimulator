<script setup>
import { useStore } from 'vuex';
const getStates = useStore().getters['sys/getStates']
</script>

<template>
  <div class="info-border">
    <div class="chat-title">
      <div class="chat-title-exit">&lt;</div>
      <div class="chat-title-title"></div>
      <div class="chat-title-option">...</div>
    </div>
    <div class="chat-content">
      <div class="nes-balloon from-left">
        今天是第{{getStates('day')}}天！将在本周日下午进行！
        <span class="nes-text is-primary">需要的为{{getStates('workCheck0')}}</span>
        2
      </div>
      <div class="nes-balloon from-left" v-if="getStates('day')<=7">
        2
        <span class="nes-text is-primary"></span>
        2
      </div>
      <div class="nes-balloon from-left" v-if="getStates('day')>7&&getStates('day')<=14">
        2
        <span class="nes-text is-primary"></span>
        2
      </div>
      <div class="nes-balloon from-left" v-if="getStates('day')>14">
        2
        <span class="nes-text is-primary"></span>
        2
      </div>
      <div class="nes-balloon from-right margin-left-auto">33</div>
    </div>
  </div>
</template>

<style scoped>
.margin-left-auto {
  align-self: flex-end;
  user-select: none;
}
.info-border {
  height: 100%;
  width: 100%;
}
.chat-title {
  height: 50px;
  display: flex;
  padding: 0 24px;
}
.chat-title-exit {
  margin: auto 0;
}
.chat-title-title {
  margin: auto;
}
.chat-title-option {
  margin: auto 0;
}
.chat-content {
  height: calc(100% - 50px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.chat-content::-webkit-scrollbar {
  width: 6px;
  height: 100%;
  transition: all .3s;
}
.chat-content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  /* border-radius: 20px; */
  box-shadow: inset 0 0 5px #d8d8d8;
  background: #535353;
}
/*滚动条轨道*/
.chat-content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px #d8d8d8;
  /* border-radius: 20px; */
  background: #ededed;
}
</style>