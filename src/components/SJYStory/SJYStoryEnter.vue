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
  store.dispatch('sys/resetStarter')
})

function start () {
  const starter = {
    name: 'SJYStory starter',
    point: 120,
    pname: {
      restPoint: '剩余点数',
      name: '角色名称',
      baseStates: '基本属性',
      otherStates: '其它属性',
      otherPartsName: '额外选项'
    },
    parts: [
      {
        name: '力量',
        options: [
          {
            name: '无力',
            summary: '你没能打过豆腐。',
            specialName: 'power-',
            cost: -60
          },
          {
            name: '平凡',
            summary: '你偶尔会锻炼一下，保持着平均水准的力量。',
            specialName: 'testO1',
            cost: 0
          },
          {
            name: '强壮',
            summary: '你一拳可以打穿钢板。',
            specialName: 'power+',
            cost: 60
          },
        ]
      },
      {
        name: '耐力',
        options: [
          {
            name: '虚弱',
            summary: '打小你身体就不好。',
            specialName: 'stamina-',
            cost: -60
          },
          {
            name: '一般',
            summary: '你的耐力在同龄人中还算不错。',
            specialName: 'testO2',
            cost: 0
          },
          {
            name: '持久',
            summary: '你曾经跑3200米都没有喘气。',
            specialName: 'stamina+',
            cost: 60
          }
        ]
      },
      {
        name: '智力',
        options: [
          {
            name: '有点笨',
            summary: '你显得比其它人笨一点，就一点。',
            specialName: 'inte-',
            cost: -60
          },
          {
            name: '凡庸',
            summary: '你每次考试成绩都是中等水平。',
            specialName: 'testO3',
            cost: 0
          },
          {
            name: '聪明',
            summary: '你曾今证明了哥德巴赫猜想。',
            specialName: 'inte+',
            cost: 60
          }
        ]
      },
      {
        name: '魅力',
        options: [
          {
            name: '不修边幅',
            summary: '你不太注重自己的外表。',
            specialName: 'charm-',
            cost: -60
          },
          {
            name: '平庸',
            summary: '好歹你还知道用洗面奶洗脸。',
            specialName: 'testO4',
            cost: 0
          },
          {
            name: '超凡脱俗',
            summary: '超凡脱俗。',
            specialName: 'charm+',
            cost: 60
          },
        ]
      },
      {
        name: '勇气',
        options: [
          {
            name: '胆小',
            summary: '在需要上台演讲的场合会紧张。',
            specialName: 'brave-',
            cost: -60
          },
          {
            name: '还行',
            summary: '你在很多人面前也不会紧张。',
            specialName: 'testO5',
            cost: 0
          },
          {
            name: '大胆',
            summary: '无论有多少人在看着你，你都不会害怕。',
            specialName: 'brave+',
            cost: 60
          }
        ]
      },
    ],
    baseStates: [
      {
        varName: 'power',
        name: '力量',
        cost: 1,
        default: 30,
        max: 100,
        min: 0
      },
      {
        varName: 'stamina',
        name: '耐力',
        cost: 1,
        default: 30,
        max: 100,
        min: 0
      },
      {
        varName: 'inte',
        name: '智力',
        cost: 1,
        default: 30,
        max: 100,
        min: 0
      },
      {
        varName: 'charm',
        name: '魅力',
        cost: 1,
        default: 30,
        max: 100,
        min: 0
      },
      {
        varName: 'brave',
        name: '勇气',
        cost: 1,
        default: 30,
        max: 100,
        min: 0
      },
    ],
    fixedBaseStates: [
      {
        varName: 'money',
        name: '金钱',
        default: 200
      },
      {
        varName: 'maxHair',
        name: '头发',
        default: 150
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
      },
      {
        name: '旧书',
        summary: '你带了些旧书到工作地点。',
        specialName: '旧书',
        cost: -30
      },
      {
        name: '跑步机',
        summary: '你有一台跑步机。',
        specialName: '跑步机',
        cost: -30
      },
      {
        name: '愉快的童年',
        summary: '你的童年虽然不够完美，但足够幸运。',
        specialName: 'yq3',
        cost: 30
      },
      {
        name: '糟糕的童年',
        summary: '你承担了那个年纪不应该经历的事情。',
        specialName: 'yq1',
        cost: -30
      }
    ]
  }
  // setVar('health', 100)
  setVar('hair', 150)
  if (store.getters['sys/getStates']('difficulty') === 2) {
    setVar('workCheck0', 25)
    setVar('workCheck1', 45)
    setVar('workCheck2', 100)
  } else if (store.getters['sys/getStates']('difficulty') === 1) {
    setVar('workCheck0', 20)
    setVar('workCheck1', 35)
    setVar('workCheck2', 80)
  } else {
    setVar('workCheck0', 15)
    setVar('workCheck1', 30)
    setVar('workCheck2', 70)
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
    <h2>选择你的家翊！</h2>
    <swiper :effect="'cards'" :grabCursor="true" class="mySwiper" :loop="true">
        <swiper-slide>
          <div class="page nes-container with-title is-centered" :bodyStyle="{height: '100%'}">
            <div class="pageContent">
              <div class="xxl title">狂暴家翊</div>
              <div class="line s">长时间的加班让他失去了人性，变得非常狂暴</div>
              <div class="divid"></div>
              <div class="line">
                <span style="margin-right: 16px;">力量 : 120</span>
                <span style="margin-right: 16px;">耐力 : 100</span>
                <span>智力 : 40</span>
              </div>
              <div class="line">
                <span style="margin-right: 16px;">生命值 : 120</span>
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
              <button type="button" class="nes-btn is-disabled">再也做不好了</button>
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
                <span style="margin-right: 16px;">力量 : 80</span>
                <span style="margin-right: 16px;">耐力 : 100</span>
                <span>智力 : 120</span>
              </div>
              <div class="line">
                <span style="margin-right: 16px;">生命值 : 80</span>
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
              <button type="button" class="nes-btn is-disabled">再也做不好了</button>
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
                <span style="margin-right: 16px;">力量 : 90</span>
                <span style="margin-right: 16px;">耐力 : 90</span>
                <span>智力 : 90</span>
              </div>
              <div class="line">
                <span style="margin-right: 16px;">生命值 : 90</span>
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
              <button type="button" class="nes-btn is-disabled">再也做不好了</button>
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
                <span style="margin-right: 16px;">力量 : 80</span>
                <span style="margin-right: 16px;">耐力 : 80</span>
                <span>智力 : 80</span>
              </div>
              <div class="line">
                <span style="margin-right: 16px;">生命值 : 100</span>
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
              <button type="button" class="nes-btn" @click="start()">选择这个！</button>
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
  flex-direction: column;
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
