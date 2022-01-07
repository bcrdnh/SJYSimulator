import { store } from '../../store'
const special = store.state.sys.globalVariable.special

let v1up = 10
let v1lose = -5
if (special.has('testSP3')) {
  v1up = 8
  v1lose = -6
}
if (special.has('testSP4')) {
  v1up = 12
  v1lose = -4
}

let v2up = 8
let v2lose = -4
if (special.has('testSP5')) {
  v2up = 6
  v2lose = -5
}
if (special.has('testSP6')) {
  v2up = 10
  v2lose = -3
}

const ev0to5 = {
  ev01: [
    "this is ev01",
    "when u {age} years old something happend",
    {
      "content": "u gain" + v1up + "v1",
      "clas": "blue",
      "changeVar": {
        "varName": "v1",
        "num": v1up
      }
    }
  ],
  ev02: [
    "this is ev02",
    "{age} years old something happend",
    {
      "content": "u gain" + v2up + "v2",
      "clas": "blue",
      "changeVar": {
        "varName": "v2",
        "num": v2up
      }
    }
  ],
  ev03: [
    "this is ev03",
    "when {age} years old...",
    {
      "content": "u lose" + Math.abs(v1lose) + "v1",
      "clas": "blue",
      "changeVar": {
        "varName": "v1",
        "num": v1lose
      }
    }
  ],
  ev04: [
    "this is ev04",
    "when {age} years old he lose his dick",
    {
      "content": "u lose" + Math.abs(v2lose) + "v2",
      "clas": "blue",
      "changeVar": {
        "varName": "v2",
        "num": v2lose
      }
    }
  ]
}

export default ev0to5