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
        name: '世界',
        options: [
          {
            name: '危机四伏',
            summary: 'this is option1',
            specialName: 'testSP0',
            cost: -10
          },
          {
            name: '风平浪静',
            summary: 'this is option2',
            specialName: 'testSP1',
            cost: 0
          },
          {
            name: '充满',
            summary: 'this is option3',
            specialName: 'testSP2',
            cost: 10
          },
        ]
      },
      {
        name: 'part 2',
        options: [
          {
            name: 'ex option 1',
            summary: 'this is ex option',
            specialName: 'testSP3',
            cost: -60
          },
          {
            name: 'ex option 2',
            summary: 'this is ex option',
            specialName: 'testSP4',
            cost: 60
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
    name: 'part 2',
    options: [
      {
        name: 'ex option 1',
        summary: 'this is ex option',
        specialName: 'testSP3',
        cost: -60
      },
      {
        name: 'ex option 2',
        summary: 'this is ex option',
        specialName: 'testSP4',
        cost: 60
      }
    ]
  }
  store.dispatch('sys/setStarter', starter)
  router.push('/starter')
}

function saveCrazySJY () {
  setVar('playerName', 'sjy')
  const startOptions = {
    baseStates: new Map(),
    special: new Map()
  }
  // +80
  startOptions.baseStates.set('power', 120)
    .set('stamina', 100)
    .set('inte', 50)
    .set('health', 150)
    .set('hair', 100)
  startOptions.special.set('a', 1)
}

function saveWorkerSJY () {
  setVar('playerName', 'sjy')
  const startOptions = {
    baseStates: new Map(),
    special: new Map()
  }
  // +50
  startOptions.baseStates.set('power', 80)
    .set('stamina', 100)
    .set('inte', 120)
    .set('health', 100)
    .set('hair', 50)
  startOptions.special.set('b', 1)
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
  startOptions.special.set('b', 1)
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
