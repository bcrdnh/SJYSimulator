import { specialMap } from "./specialMap"
import { store } from '../store'
import { router } from "../router"
import { gsap } from "gsap"

// 闭区间，整数
export function randomNum (minNum = 0, maxNum = 100) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}
export function randomArr (arr, warr = []) {
  if (warr.length === 0 || warr.length !== arr.length) {
    return arr[randomNum(0, arr.length - 1)]
  } else {
    let sum = 0
    for (const w of warr) {
      sum += w
    }
    let target = randomNum(1, sum)
    for (const index in warr) {
      if (target < warr[index]) {
        return arr[index]
      }
    }
  }
}

export function judge (judgeFunc, truePlot = ['t'], falsePlot = ['f']) {
  if (judgeFunc()) {
    return truePlot
  } else {
    return falsePlot
  }
}

export const stateObj = (name, x) => {
  const special = store.state.sys.globalVariable.special
  const powerCorrection = () => {
    let correction = 0
    if (special.has('power+')) correction += 0.4
    if (special.has('power-')) correction -= 0.4
    return correction
  }
  const staminaCorrection = () => {
    let correction = 0
    if (special.has('stamina+')) correction += 0.4
    if (special.has('stamina-')) correction -= 0.4
    return correction
  }
  const inteCorrection = () => {
    let correction = 0
    if (special.has('inte+')) correction += 0.4
    if (special.has('inte-')) correction -= 0.4
    return correction
  }
  const braveCorrection = () => {
    let correction = 0
    if (special.has('brave+')) correction += 0.4
    if (special.has('brave-')) correction -= 0.4
    return correction
  }
  const charmCorrection = () => {
    let correction = 0
    if (special.has('charm+')) correction += 0.4
    if (special.has('charm-')) correction -= 0.4
    return correction
  }
  switch (name) {
    case 'power':
      return {
        content: x > 0 ? '力量上升' : '力量下降',
        clas: x > 0 ? 'nes-text is-primary' : 'nes-text is-error',
        changeVar: {
          varName: 'power',
          num: x + Math.floor(powerCorrection() * Math.abs(x))
        }
      }
    case 'stamina':
      return {
        content: x > 0 ? '耐力上升' : '耐力下降',
        clas: x > 0 ? 'nes-text is-primary' : 'nes-text is-error',
        changeVar: {
          varName: 'stamina',
          num: x + Math.floor(staminaCorrection() * Math.abs(x))
        }
      }
    case 'inte': 
      return {
        content: x > 0 ? '智力上升' : '智力下降',
        clas: x > 0 ? 'nes-text is-primary' : 'nes-text is-error',
        changeVar: {
          varName: 'inte',
          num: x + Math.floor(inteCorrection() * Math.abs(x))
        }
      }
    case 'charm':
      return {
        content: x > 0 ? '魅力上升' : '魅力下降',
        clas: x > 0 ? 'nes-text is-primary' : 'nes-text is-error',
        changeVar: {
          varName: 'charm',
          num: x + Math.floor(charmCorrection() * Math.abs(x))
        }
      }
    case 'barve': 
      return {
        content: x > 0 ? '勇气上升' : '勇气下降',
        clas: x > 0 ? 'nes-text is-primary' : 'nes-text is-error',
        changeVar: {
          varName: 'brave',
          num: x + Math.floor(braveCorrection() * Math.abs(x))
        }
      }
    case 'money':
      return {
          content: x > 0 ? '获得金钱' : '付出金钱',
          clas: x > 0 ? 'nes-text is-primary' : 'nes-text is-error',
          changeVar: {
            varName: 'money',
            num: x
          }
      }
    case 'hair':
      return {
        content: x > 0 ? '头发再生' : '脱发了',
        clas: x > 0 ? 'nes-text is-primary' : 'nes-text is-error',
        changeVar: {
          varName: 'hair',
          num: x
        }
      }
    case 'work':
        return {
          content: x > 0 ? '获得业绩' : '失去业绩',
          clas: x > 0 ? 'nes-text is-primary' : 'nes-text is-error',
          changeVar: {
            varName: 'work',
            num: x
          }
        }
    default:
      break;
  }
}
export const randomState = (x = 3) => {
  return stateObj(['power', 'stamina', 'inte', 'charm', 'brave'][randomNum(0, 4)], x)
}

// =====================
// special
export function getSpecialByName (name) {
  if (!specialMap.has(name)) console.error('[util/getSpecialByName]:no this special:' + name)
  return specialMap.get(name)
}
export function setSpecial (name) {
  if (!specialMap.has(name)) {
    console.error('[utils/setSpecialByName]: ' + name + ' is not definition in specialMap')
  }
  store.dispatch('sys/setSpecial', {name, num: 1})
}
export function changeSpecial (name, num) {
  store.dispatch('sys/changeSpecial', {name, num})
}

// =====================
// states
export function setVar (varName, content) {
  store.dispatch('sys/setVar', {varName, content})
}
export function changeVar (varName, content) {
  store.dispatch('sys/changeVar', {varName, num: content})
}

// ===================
// 显示选项
export function bondingSelect (labels, darams, player, selector, next) {
  let param = []
  const setSelect = selector.value.setSelect ? selector.value.setSelect : selector.setSelect
  const unlock = player.value.unlock ? player.value.unlock : player.unlock
  const lock = player.value.lock ? player.value.lock : player.lock
  const setDaram = player.value.setDaram ? player.value.setDaram : player.setDaram
  for (const name of labels) {
    param.push(
      {
        name: name,
        action: () => {
          unlock()
          setDaram(darams[labels.indexOf(name)], () => {
            next()
          })
        }
      }
    )
  }
  lock()
  setSelect(param)
}

// 偷懒
export function newEventPool () {
  return new EventPool()
}
export function newWeightEventPool () {
  return new WeightEventPool()
}
export function newTiggerPool () {
  return new TiggerPool()
}

// ====================
// 动画效果
//   每次切换页面加个动画效果,固定找类叫root的dom操作
export function changePage (path) {
  gsap.fromTo(".anime-div", {
    opacity: 1
  },{
    opacity: 0,
    duration: 1.5,
    ease: "steps(4)",
    onComplete: () => {
      router.push(path)
      gsap.fromTo(".anime-div", {
        opacity: 0
      }, {
        opacity: 1,
        duration: 1.5,
        ease: "steps(4)",
        delay: 0.3
      })
    }
  })
}
// 从下方淡入
export function fadeIn (target, delay = 0) {
  gsap.fromTo(target, {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.2,
    delay
  })
}

class EventPool {
  constructor () {
    this.pool = new Set()
  }
  addEvent (ev) {
    if (!ev instanceof Array) {
      console.error('[util.js/EventPool]:illegal event')
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
    if (weight <= 0) weight = 1
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
    // console.warn('new tigger start!')
    let count = 0
    let event = ['didnt set tigger event']
    const setDaram = player.setDaram ? player.setDaram : player.value.setDaram
    for (const tig of this.pool) {
      // console.log('now comes to new loop, now count is ' + count +',now mark is ' + this.mark)
      if (count++ < this.mark) continue
      // console.log('didnt continue, now going to panduan')
      // console.log('=====================================')
      // console.log('special.has(tig[0]):' + special.has(tig[0]))
      // console.log('!tig[1].triggered:' + !tig[1].triggered)
      // console.log('tig[1].repeatable:' + tig[1].repeatable)
      // console.log('(!tig[1].triggered || tig[1].repeatable):' + (!tig[1].triggered || tig[1].repeatable))
      // console.log('tig[1].condition():' + tig[1].condition())
      // console.log('=====================================')
      if (special.has(tig[0]) && (!tig[1].triggered || tig[1].repeatable) && tig[1].condition()) {
        this.mark = count
        event = tig[1].event
        tig[1].triggered = true
        // console.log('tigger success, now count is ' + count +',now mark is ' + this.mark)
        // console.log('and this time, event is:' + event)
        if (randomNum(1, 100) <= tig[1].rate) {
          setDaram(event, () => {
            this.tigger(player, special, callback)
          })          
        } else {
          continue
        }
        // console.log('set over, try to break')
        return
      }
      // console.log('tigger fail, loop')
    }
    this.mark = count
    // console.log('loop over, function is over, now count is ' + count +',now mark is ' + this.mark)
    if (this.mark >= this.pool.size) {
      // console.log('tigger over, try callback')
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
