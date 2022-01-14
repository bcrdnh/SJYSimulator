<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { setVar, fadeIn, changePage } from '../../assets/utils.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import "swiper/css/effect-cards"
// import './style.css'
import SwiperCore, { EffectCards } from 'swiper';
import { onMounted } from 'vue'
SwiperCore.use([EffectCards]);
const store = useStore()
const router = useRouter()

onMounted(() => {
  fadeIn('.mySwiper', 0.3)
})

function start () {
  const starter = {
    name: 'SJYStory starter',
    point: 120,
    parts: [
      {
        name: '世界观设定',
        options: [
          {
            name: '地狱',
            summary: '在这里，你活不过五分钟。',
            specialName: 'sjg0',
            cost: -120
          },
          {
            name: '邪恶',
            summary: '似乎每一个人都非常的不友善。',
            specialName: 'sjg1',
            cost: -30
          },
          {
            name: '普通',
            summary: '普通的世界，有善良也有邪恶。',
            specialName: 'sjg2',
            cost: 0
          },
          {
            name: '善良',
            summary: '这个世界对你非常温柔。',
            specialName: 'sjg3',
            cost: 30
          },
          {
            name: '天堂',
            summary: '简直是天堂！',
            specialName: 'sjg4',
            cost: 120
          }
        ]
      },
      {
        name: '体质',
        options: [
          {
            name: '脆弱',
            summary: '打小你身体就不好，经常会生病。',
            specialName: 'tz0',
            cost: -30
          },
          {
            name: '一般',
            summary: '偶感风寒。',
            specialName: 'tz1',
            cost: 0
          },
          {
            name: '强壮',
            summary: '从来不会得病。',
            specialName: 'tz2',
            cost: 30
          }
        ]
      },
      {
        name: '心态',
        options: [
          {
            name: '悲观',
            summary: '悲观的你在出现意外时会掉更多的头发。',
            specialName: 'xt0',
            cost: -30
          },
          {
            name: '平平淡淡',
            summary: '生活总是有起有落。',
            specialName: 'xt1',
            cost: 0
          },
          {
            name: '乐观',
            summary: '乐观的人头发更浓密，大概。',
            specialName: 'xt2',
            cost: 30
          }
        ]
      },
      {
        name: '运气',
        options: [
          {
            name: '非常差',
            summary: '走在路上会经常会死掉。',
            specialName: 'yq0',
            cost: -80
          },
          {
            name: '差劲',
            summary: '走在路上会踩到讨厌的东西。',
            specialName: 'yq1',
            cost: -30
          },
          {
            name: '还行',
            summary: '走在路上会到达目的地。',
            specialName: 'yq2',
            cost: 0
          },
          {
            name: '不错',
            summary: '走在路上会捡到钱。',
            specialName: 'yq3',
            cost: 30
          },
          {
            name: '幸运',
            summary: '走在路上会捡到中大奖的彩票。',
            specialName: 'yq4',
            cost: 80
          }
        ]
      },
      {
        name: '商业头脑',
        options: [
          {
            name: '没有观念',
            summary: '你的金钱概念非常差劲，经常会被奸商欺骗。',
            specialName: 'sytn0',
            cost: -30
          },
          {
            name: '普通人',
            summary: '至少你还会使用余额宝。',
            specialName: 'sytn1',
            cost: 0
          },
          {
            name: '大师',
            summary: '许多上市公司的老板都会来找你取经。',
            specialName: 'sytn2',
            cost: 30
          }
        ]
      },
      {
        name: '运动能力',
        options: [
          {
            name: '笨拙',
            summary: '你笨手笨脚的，不是很擅长运动。',
            specialName: 'ydnl0',
            cost: -30
          },
          {
            name: '普通人',
            summary: '你的体育成绩不算出众，平均水平。',
            specialName: 'ydnl1',
            cost: 0
          },
          {
            name: '强健',
            summary: '曾经取得过12块奥运金牌。',
            specialName: 'ydnl2',
            cost: 30
          }
        ]
      }
    ],
    baseStates: [
      {
        varName: 'power',
        name: '力量',
        cost: 1,
        default: 80,
        max: 100,
        min: 80
      },
      {
        varName: 'stamina',
        name: '耐力',
        cost: 1,
        default: 80,
        max: 100,
        min: 80
      },
      {
        varName: 'inte',
        name: '智力',
        cost: 1,
        default: 80,
        max: 100,
        min: 80
      },
    ],
    fixedBaseStates: [
      {
        varName: 'health',
        name: '生命值',
        default: 100
      },
      {
        varName: 'hair',
        name: '头发',
        default: 100
      }
    ],
    otherPartsName: '额外选项',
    otherParts: [
      {
        name: '卷舌',
        summary: '你可以把舌头卷起来。',
        specialName: '卷舌',
        cost: 0
      },
      {
        name: '大力',
        summary: '你力气比一般人大一些。',
        specialName: '大力',
        cost: 10
      },
      {
        name: '永恒霸王',
        summary: '你有一瓶用不完的霸王洗发水。',
        specialName: '永恒霸王',
        cost: 10
      },
      {
        name: '帅',
        summary: '那是真的帅。',
        specialName: '帅',
        cost: 30
      },
      {
        name: '弱智',
        summary: '你是弱智。',
        specialName: '弱智',
        cost: 30
      },
      {
        name: '魔法天赋',
        summary: '你从小就可以使用一些魔法，但大家似乎都不相信魔法这种东西。',
        specialName: '魔法天赋',
        cost: 10
      },
      {
        name: '大豪斯',
        summary: '你有一栋世世代代相传的豪宅。',
        specialName: '大豪斯',
        cost: 30
      },
      {
        name: '破屋',
        summary: '你住在四处漏风的破房子中。',
        specialName: '破屋',
        cost: -30
      }
    ]
  }
  store.dispatch('sys/setStarter', starter)
  changePage({path: '/starter', query: {mainPage: '/SJYStory'}})
  // router.push({path: '/starter', query: {mainPage: '/SJYStory'}})
}

function saveCrazySJY () {
  setVar('playerName', '狂暴家翊')
  const startOptions = {
    baseStates: new Map(),
    special: new Map()
  }
  // +30
  startOptions.baseStates.set('power', 120)
    .set('stamina', 100)
    .set('inte', 40)
    .set('health', 120)
    .set('hair', 90)
  startOptions.special.set('狂暴', 1)
  startOptions.special.set('弱智', 1)
  startOptions.special.set('大力', 1)
}
function saveWorkerSJY () {
  setVar('playerName', '苦工家翊')
  const startOptions = {
    baseStates: new Map(),
    special: new Map()
  }
  // +30
  startOptions.baseStates.set('power', 80)
    .set('stamina', 100)
    .set('inte', 120)
    .set('health', 80)
    .set('hair', 50)
  startOptions.special.set('吃苦耐劳', 1)
  startOptions.special.set('爱惜头发', 1)
}
function saveVampireSJY () {
  setVar('playerName', 'sjy')
  const startOptions = {
    baseStates: new Map(),
    special: new Map()
  }
  // +20
  startOptions.baseStates.set('power', 90)
    .set('stamina', 90)
    .set('inte', 90)
    .set('health', 90)
    .set('hair', 160)
  startOptions.special.set('帅', 1)
  startOptions.special.set('吸血鬼', 1)
  startOptions.special.set('大豪斯', 1)
}
</script>

<template>
  <div class="sjyEnter">
    <swiper :effect="'cards'" :grabCursor="true" class="mySwiper" :loop="true">
        <swiper-slide>
          <div class="page nes-container with-title is-centered" :bodyStyle="{height: '100%'}">
            <div class="pageContent">
              <div class="xxl title">狂暴家翊</div>
              <div class="line s">长时间的加班让他失去了人性，变得非常狂暴</div>
              <div class="divid"></div>
              <div class="line">
                <span style="margin-right: 24px;">力量 : 120</span>
                <span style="margin-right: 24px;">耐力 : 100</span>
                <span>智力 : 40</span>
              </div>
              <div class="line">
                <span style="margin-right: 24px;">生命值 : 120</span>
                <span>头发 : 90</span>
              </div>
              <div class="divid"></div>
              <div class="line">
                <div class="line xl">特质——狂暴</div>
                <div>这种家翊非常狂暴，攻击性极强。</div>
                <div class="line xl">特质——弱智</div>
                <div>这种家翊没什么智力。</div>
                <div class="line xl">特质——大力</div>
                <div>小心家翊可怕的怪力！。</div>
              </div>
              <div class="divid"></div>
            </div>
            <div class="pageFooter">
              <button type="button" class="nes-btn is-disabled">开发中</button>
              <!-- <a-button class="chosethisBtn" block disabled>开发中</a-button> -->
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="page nes-container with-title is-centered" :bodyStyle="{height: '100%'}">
            <div class="pageContent">
              <div class="title xxl">苦工家翊</div>
              <div class="line s">他还在加班！他已经三天没下班了！</div>
              <div class="divid"></div>
              <div class="line">
                <span style="margin-right: 24px;">力量 : 80</span>
                <span style="margin-right: 24px;">耐力 : 100</span>
                <span>智力 : 120</span>
              </div>
              <div class="line">
                <span style="margin-right: 24px;">生命值 : 80</span>
                <span>头发 : 50</span>
              </div>
              <div class="divid"></div>
              <div class="line">
                <div class="line xl">特质——吃苦耐劳</div>
                <div>他经常加班并且不敢发出任何怨言，老板很喜欢他。</div>
                <div class="line xl">特质——爱惜头发</div>
                <div>他非常的爱惜他的头发，虽然不多。</div>
              </div>
              <div class="divid"></div>          
            </div>
            <div class="pageFooter">
              <button type="button" class="nes-btn is-disabled">开发中</button>
              <!-- <a-button class="chosethisBtn" block disabled>开发中</a-button> -->
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="page nes-container with-title is-centered" :bodyStyle="{height: '100%'}">
            <div class="pageContent">
              <div class="title xxl">吸血鬼家翊</div>
              <div class="line s">为什么是吸血鬼？</div>
              <div class="divid"></div>
              <div class="line">
                <span style="margin-right: 24px;">力量 : 90</span>
                <span style="margin-right: 24px;">耐力 : 90</span>
                <span>智力 : 90</span>
              </div>
              <div class="line">
                <span style="margin-right: 24px;">生命值 : 90</span>
                <span>头发 : 160</span>
              </div>
              <div class="divid"></div>
              <div class="line">
                <div class="line xl">特质——吸血鬼</div>
                <div>他是吸血鬼。为什么是吸血鬼？</div>
                <div class="line xl">特质——帅</div>
                <div>他长得非常的帅。</div>
                <div class="line xl">特质——大豪斯</div>
                <div>作为吸血鬼，他理所当然的拥有一座豪宅。</div>
              </div>
              <div class="divid"></div>
            </div>
            <div class="pageFooter">
              <button type="button" class="nes-btn is-disabled">开发中</button>
              <!-- <a-button class="chosethisBtn" block disabled>开发中</a-button> -->
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="page nes-container with-title is-centered" :bodyStyle="{height: '100%'}">
            <div class="pageContent">
              <div class="title xxl">自定义</div>
              <div class="line s">自定义你的角色</div>
              <div class="divid"></div>
              <div class="line">
                <span style="margin-right: 24px;">力量 : 80</span>
                <span style="margin-right: 24px;">耐力 : 80</span>
                <span>智力 : 80</span>
              </div>
              <div class="line">
                <span style="margin-right: 24px;">生命值 : 100</span>
                <span>头发 : 100</span>
              </div>
              <div class="divid"></div>
              <div class="line">
                <div class="line xl">自定义！</div>
                <div>使用点数自定义你的属性与特质！</div>
              </div>
              <div class="divid"></div>
            </div>
            <div class="pageFooter">
              <button type="button" class="nes-btn">选择这个！</button>
              <!-- <a-button class="chosethisBtn" @click="start()" block>选择这个！</a-button> -->
            </div>
          </div>
        </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.sjyEnter {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page {
  width: 350px;
  height: 480px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}
.pageContent {
  font-family: zpix;
  height: 80%;
}
.pageFooter {
  height: 20%;
}
.line {
  margin-bottom: 6px;
}
.divid {
  margin: 12px;
}
.xxl {
  font-weight: bold;
  font-size: 20px;
  line-height: 1.5715;
}
.xl {
  font-weight: bold;
  font-size: 16px;
}
.s {
  font-style: italic;
  color: gray;
}
.chose {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.swiper {
  width: 350px;
  height: 480px;
}
.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
}
</style>
<style>
.swiper-3d .swiper-slide-shadow {
  background: rgba(0, 0, 0, 0);
}
</style>
