import { randomNum, changeVar } from './../../assets/utils.js'
const state = () => ({
  eventPool: new EventPool(),
  wEventPool: new WeightEventPool(),
  afterPara: new Set([
    () => {
      changeVar('turn', 1)
    }
  ])
})

const getters = {
}

const actions = {
  // use {componentName_functionName}
  registerEvent ({ state, commit }, { name, event }) {
    if (state.Events.hasOwnProperty(name)) {
      console.error('syserr: already has this event:' + name)
    }
    commit('registerEvent', { name, event })
  }
}

const mutations = {
  registerEvent (state, { name, event }) {
    state.Events[name] = event
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

class EventPool {
  constructor () {
    this.pool = new Set()
  }
  addEvent (ev) {
    if (!ev instanceof Array) {
      console.error('[store/event.js/EventPool]:illegal event')
    }
    this.pool.add(ev)
    return this
  }
  addEventArr (arr) {
    for (const ev of arr) {
      this.addEvent(ev)
    }
  }
  addEventObj (obj) {
    Object.values(obj).forEach(ev => {
      this.addEvent(ev)
    })
  }
  getEvent () {
    if (this.pool.size <= 0) return
    return Array.from(this.pool)[randomNum(0, this.pool.size - 1)]
  }
  clearPool () {
    this.pool.clear()
  }
}

class WeightEventPool {
  constructor () {
    this.poolList = []
    this.weightList = []
  }
  addWEventPool (eventPool, weight) {
    this.poolList.push(eventPool)
    let sumw = 0
    for (const w of this.weightList) {
      sumw += w
    }
    this.weightList.push(weight + sumw)
  }
  addWEvent (event, weight) {
    this.addWEventPool(new EventPool().addEvent(event), weight)
  }
  addWEventArr (eventArr, weight) {
    this.addWEventPool(new EventPool().addEventArr(eventArr), weight)
  }
  addWEventObj (eventObj, weight) {
    this.addWEventPool(new EventPool().addEventObj(eventObj), weight)
  }
  getWEvent () {
    let sumw = 0
    for (const w of this.weightList) {
      sumw += w
    }
    const num = randomNum(0, sumw)
    let index = 0
    for (let i = 0; i < this.weightList.length; i++) {
      const weight = this.weightList[i]
      if (num <= weight) {
        index = i
        break
      }
    }
    return this.poolList[index].getEvent()
  }
  clearWPool () {
    this.poolList = []
    this.weightList = []
  }
}

class TiggerPool {
  constructor () {
    // 最后发现其实用数组更好，懒得换了
    this.pool = new Map()
    this.mark = 0
  }
  addTigger (spName, rate=100, event=['default tigger'], repeatable=false, condition=()=>true) {
    if (!this.pool.has(spName)) {
      this.pool.set(spName, {
        rate,
        event,
        repeatable,
        condition,
        triggered: false
      })      
    }
  }
  tigger (player, special, callback) {
    if (this.mark >= this.pool.size - 1) {
      callback()
      return
    }
    let count = 0
    let event = ['didnt set tigger event']
    const setDaram = player.value.setDaram || player.setDaram
    for (const tig of this.pool) {
      if (count++ < this.mark) continue
      if (special.has(tig[0]) && (!tig[1].triggered || tig[1].repeatable) && tig[1].condition()) {
        this.mark = count - 1
        event = tig[1].event
        setDaram(event, this.tigger(player, special, callback))
        break
      }
    }
  }
}
