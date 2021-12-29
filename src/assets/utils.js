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
  return specialMap.get(name)
}

export function setVar (varName, content) {
  const store = useStore()
  store.dispatch('sys/setVar', {varName, content})
}

export function changeVar (varName, content) {
  const store = useStore()
  store.dispatch('sys/changeVar', {varName, content})
}
