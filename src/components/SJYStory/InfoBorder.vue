<script setup>
import { useStore } from 'vuex';
const getStates = useStore().getters['sys/getStates']
</script>

<template>
  <div class="info-border">
    <div class="chat-title">
      <div class="chat-title-exit">&lt;</div>
      <div class="chat-title-title">公司微信群</div>
      <div class="chat-title-option">...</div>
    </div>
    <div class="chat-content">
      <div class="nes-balloon from-left">
        今天是第{{getStates('day')}}天！考核将在本周日下午进行！
        <span class="nes-text is-primary">需要的业绩为{{getStates('workCheck0')}}点。</span>
        加油吧！
      </div>
      <div class="nes-balloon from-left" v-if="getStates('day')<=7">
        通知：本周工作剩余很多，可以在周日上午自愿加班，来点聪明人，
        <span class="nes-text is-primary">可以根据智力获得更多业绩。</span>
        @全体成员
      </div>
      <div class="nes-balloon from-left" v-if="getStates('day')>7&&getStates('day')<=14">
        通知：本周日需要拍摄公司宣传片，可以在周日上午自愿加班，
        <span class="nes-text is-primary">可以根据魅力和勇气获得更多业绩。</span>
        @全体成员
      </div>
      <div class="nes-balloon from-left" v-if="getStates('day')>14">
        通知：本周日部门办公地点调动，需要搬家，来点力气大的帮忙。
        <span class="nes-text is-primary">可以根据力量和耐力获得更多业绩。</span>
        @全体成员
      </div>
      <div class="nes-balloon from-right margin-left-auto">收到</div>
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