<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { setVar } from '../../assets/utils.js'
const store = useStore()
const router = useRouter()

function start () {
  const starter = {
    name: 'SJYStory starter',
    point: 100,
    parts: [
      {
        name: '世界观设定',
        options: [
          {
            name: '地狱',
            summary: '在这里，你活不过五分钟。',
            specialName: 'testSP4',
            cost: -120
          },
          {
            name: '邪恶',
            summary: '似乎每一个人都非常的不友善。',
            specialName: 'testSP3',
            cost: -30
          },
          {
            name: '普通',
            summary: '普通的世界，有善意也有邪恶。',
            specialName: 'testSP4',
            cost: 0
          },
          {
            name: '善良',
            summary: '这个世界对你非常温柔。',
            specialName: 'testSP4',
            cost: 30
          },
          {
            name: '天堂',
            summary: '简直是天堂！',
            specialName: 'testSP4',
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
            specialName: 'testSP3',
            cost: -30
          },
          {
            name: '一般',
            summary: '偶感风寒。',
            specialName: 'testSP4',
            cost: 0
          },
          {
            name: '强壮',
            summary: '从来不会得病。',
            specialName: 'testSP4',
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
            specialName: 'testSP3',
            cost: -30
          },
          {
            name: '平平淡淡',
            summary: '生活总是有起有落。',
            specialName: 'testSP4',
            cost: 0
          },
          {
            name: '乐观',
            summary: '乐观的人头发更浓密，大概。',
            specialName: 'testSP4',
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
            specialName: 'testSP3',
            cost: -80
          },
          {
            name: '差劲',
            summary: '走在路上会踩到讨厌的东西。',
            specialName: 'testSP4',
            cost: -30
          },
          {
            name: '还行',
            summary: '走在路上会到达目的地。',
            specialName: 'testSP4',
            cost: 0
          },
          {
            name: '不错',
            summary: '走在路上会捡到钱。',
            specialName: 'testSP4',
            cost: 30
          },
          {
            name: '幸运',
            summary: '走在路上会捡到中大奖的彩票。',
            specialName: 'testSP4',
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
            specialName: 'testSP3',
            cost: -30
          },
          {
            name: '普通人',
            summary: '至少你还会使用余额宝。',
            specialName: 'testSP4',
            cost: 0
          },
          {
            name: '大师',
            summary: '许多上市公司的老板都会来找你取经。',
            specialName: 'testSP4',
            cost: 30
          }
        ]
      },
      {
        name: '身体素质',
        options: [
          {
            name: '笨拙',
            summary: '你笨手笨脚的，不是很擅长运动。',
            specialName: 'testSP3',
            cost: -30
          },
          {
            name: '普通人',
            summary: '至少你还会使用余额宝。',
            specialName: 'testSP4',
            cost: 0
          },
          {
            name: '大师',
            summary: '许多上市公司的老板都会来找你取经。',
            specialName: 'testSP4',
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
      {
        varName: 'health',
        name: '',
        cost: 1,
        default: 100,
        max: 150,
        min: 50
      },
      {
        varName: 'hair',
        name: '',
        cost: 1,
        default: 100,
        max: 150,
        min: 50
      },
    ]
  }
  const part00 = {
    name: '特质(多选)',
    options: [
      {
        name: '卷舌',
        summary: '可以把舌头卷起来。',
        specialName: '卷舌',
        cost: 0
      },
      {
        name: '大力',
        summary: '你力气比一般人大一些。',
        specialName: '魔法天赋',
        cost: 10
      },
      {
        name: '魔法天赋',
        summary: '你从小就可以使用一些魔法，但大家似乎都不相信。',
        specialName: '魔法天赋',
        cost: 10
      },
      {
        name: '帅',
        summary: '真的帅。',
        specialName: '魔法天赋',
        cost: 30
      },
      {
        name: '魔法天赋',
        summary: '你从小就可以使用一些魔法，但大家似乎都不相信。',
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
      },
      {
        name: '卷发',
        summary: '头发自来卷。',
        specialName: '卷发',
        cost: -30
      }
    ]
  }
  store.dispatch('sys/setStarter', starter)
  router.push('/starter')
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
    <div class="chose">
      <a-card class="page">
        <div class="line xxl">name</div>
        <div class="line s">summary</div>
        <div class="divid"></div>
        <div class="line">
          <span style="margin-right: 36px;">llll : 20</span>
          <span style="margin-right: 36px;">stmn : 20</span>
          <span>inte : 20</span>
        </div>
        <div class="line">
          <span style="margin-right: 36px;">heal : 20</span>
          <span>hair : 20</span>
        </div>
        <div class="divid"></div>
        <div class="line">
          <div class="line xl">special</div>
          <div>special summary</div>
        </div>
        <div class="divid"></div>
        <a-button block>chose this!</a-button>
      </a-card>
      <a-card class="page">
        <div class="line xxl">name</div>
        <div class="line s">summary</div>
        <div class="divid"></div>
        <div class="line">
          <span style="margin-right: 36px;">llll : 20</span>
          <span style="margin-right: 36px;">stmn : 20</span>
          <span>inte : 20</span>
        </div>
        <div class="line">
          <span style="margin-right: 36px;">heal : 20</span>
          <span>hair : 20</span>
        </div>
        <div class="divid"></div>
        <div class="line">
          <div class="line xl">special</div>
          <div>special summary</div>
        </div>
        <div class="divid"></div>
        <a-button block>chose this!</a-button>
      </a-card>
      <a-card class="page">
        <div class="line xxl">name</div>
        <div class="line s">summary</div>
        <div class="divid"></div>
        <div class="line">
          <span style="margin-right: 36px;">llll : 20</span>
          <span style="margin-right: 36px;">stmn : 20</span>
          <span>inte : 20</span>
        </div>
        <div class="line">
          <span style="margin-right: 36px;">heal : 20</span>
          <span>hair : 20</span>
        </div>
        <div class="divid"></div>
        <div class="line">
          <div class="line xl">special</div>
          <div>special summary</div>
        </div>
        <div class="divid"></div>
        <a-button block>chose this!</a-button>
      </a-card>
      <a-card class="page">
        <div class="line xxl">name</div>
        <div class="line s">summary</div>
        <div class="divid"></div>
        <div class="line">
          <span style="margin-right: 36px;">llll : 20</span>
          <span style="margin-right: 36px;">stmn : 20</span>
          <span>inte : 20</span>
        </div>
        <div class="line">
          <span style="margin-right: 36px;">heal : 20</span>
          <span>hair : 20</span>
        </div>
        <div class="divid"></div>
        <div class="line">
          <div class="line xl">special</div>
          <div>special summary</div>
        </div>
        <div class="divid"></div>
        <a-button block>chose this!</a-button>
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.sjyEnter {
}
.page {
  /* height: 360px;
  width: 300px; */
  margin: 12px;
  /* padding: 12px;
  background-color: rgba(70, 70, 70, 0.14);
  border: 3px solid #f0f0f0;
  border-radius: 12px; */
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
</style>
