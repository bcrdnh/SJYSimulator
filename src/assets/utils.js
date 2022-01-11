import { useStore } from "vuex"
import { specialMap } from "./specialMap"

// 闭区间
export function randomNum (minNum = 0, maxNum = 100) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}

export function getDaramRouteById (id) {
  const list = {
    0: '/defaultDaram'
  }
  return list[id]
}

export function getSpecialByName (name) {
  if (!specialMap.has(name)) console.error('[util/getSpecialByName]:no this special:' + name)
  return specialMap.get(name)
}

export function setSpecial (name) {
  if (!specialMap.has(name)) {
    console.error('[utils/setSpecialByName]: ' + name + ' is not definition in specialMap')
  }
  const store = useStore()
  store.dispatch('sys/setSpecial', {name, num: 1})
}

export function changeSpecial (name, num) {
  const store = useStore()
  store.dispatch('sys/changeSpecial', {name, num})
}

export function setVar (varName, content) {
  const store = useStore()
  store.dispatch('sys/setVar', {varName, content})
}

export function changeVar (varName, content) {
  const store = useStore()
  store.dispatch('sys/changeVar', {varName, content})
}

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
