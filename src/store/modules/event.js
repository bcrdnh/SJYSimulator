import { randomNum, changeVar } from './../../assets/utils.js'
const state = () => ({
  eventPool: new EventPool(),
  wEventPool: new WeightEventPool(),
  tiggerPool: new TiggerPool(),
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
    return this
  }
  addEventObj (obj) {
    Object.values(obj).forEach(ev => {
      this.addEvent(ev)
    })
    return this
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
  addTigger (spName, event=['default tigger'], rate=100, repeatable=false, condition=()=>true) {
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
    console.warn('new tigger start!')
    let count = 0
    let event = ['didnt set tigger event']
    const setDaram = player.setDaram ? player.setDaram : player.value.setDaram
    for (const tig of this.pool) {
      console.log('now comes to new loop, now count is ' + count +',now mark is ' + this.mark)
      if (count++ < this.mark) continue
      console.log('didnt continue, now going to panduan')
      console.log('=====================================')
      console.log('special.has(tig[0]):' + special.has(tig[0]))
      console.log('!tig[1].triggered:' + !tig[1].triggered)
      console.log('tig[1].repeatable:' + tig[1].repeatable)
      console.log('(!tig[1].triggered || tig[1].repeatable):' + (!tig[1].triggered || tig[1].repeatable))
      console.log('tig[1].condition():' + tig[1].condition())
      console.log('=====================================')
      if (special.has(tig[0]) && (!tig[1].triggered || tig[1].repeatable) && tig[1].condition()) {
        this.mark = count
        event = tig[1].event
        tig[1].triggered = true
        console.log('tigger success, now count is ' + count +',now mark is ' + this.mark)
        console.log('and this time, event is:' + event)
        setDaram(event, () => {
          this.tigger(player, special, callback)
        })
        console.log('set over, try to break')
        return
      }
      console.log('tigger fail, loop')
    }
    this.mark = count
    console.log('loop over, function is over, now count is ' + count +',now mark is ' + this.mark)
    if (this.mark >= this.pool.size) {
      console.log('tigger over, try callback')
      this.mark = 0
      callback()
      return
    }
  }
  clear () {
    this.pool.clear()
    this.mark = 0
  }
}
