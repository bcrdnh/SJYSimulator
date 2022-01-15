const state = () => ({
  daramID: 0,
  turn: 0,
  starter: {
    ID: 0,
    name: 'default starter',
    point: 100,
    parts: [
      {
        name: 'part 1',
        options: [
          {
            name: 'option 1',
            summary: 'this is option1',
            specialName: 'testSP0',
            cost: -10
          },
          {
            name: 'option 2',
            summary: 'this is option2',
            specialName: 'testSP1',
            cost: 0
          },
          {
            name: 'option 3',
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
            summary: 'this is ex option, effect v1',
            specialName: 'testSP3',
            cost: -20
          },
          {
            name: 'ex option 2',
            summary: 'this is ex option, effect v1',
            specialName: 'testSP4',
            cost: 20
          }
        ]
      },
      {
        name: 'part 3',
        options: [
          {
            name: 'ex option 3',
            summary: 'this is ex option, effect v2',
            specialName: 'testSP5',
            cost: -20
          },
          {
            name: 'ex option 4',
            summary: 'this is ex option, effect v2',
            specialName: 'testSP6',
            cost: 20
          }
        ]
      }
    ],
    otherPartsName: 'opart',
    otherParts: [
      {
        name: 'other 1',
        summary: 'this is other1',
        specialName: 'testO1',
        cost: -10
      },
      {
        name: 'other 2',
        summary: 'this is other2',
        specialName: 'testO2',
        cost: 10
      },
      {
        name: 'other 3',
        summary: 'this is other3',
        specialName: 'testO3',
        cost: -10
      },
      {
        name: 'other 4',
        summary: 'this is other4',
        specialName: 'testO4',
        cost: 0
      },
      {
        name: 'other 5',
        summary: 'this is other5',
        specialName: 'testO5',
        cost: 10
      },
    ],
    baseStates: [
      {
        varName: 'v1',
        name: 'pawa',
        cost: 5,
        default: 5,
        max: 10,
        min: 0
      },
      {
        varName: 'v2',
        name: 'stml',
        cost: 5,
        default: 5,
        max: 10,
        min: 0
      },
      {
        varName: 'v3',
        name: 'iqio',
        cost: 5,
        default: 5,
        max: 10,
        min: 0
      }
    ],
    fixedBaseStates: [
      {
        varName: 'fv1',
        name: 'tsfiv1',
        default: 5
      },
      {
        varName: 'fv2',
        name: 'tsfvvv23',
        default: 10
      },
      {
        varName: 'hv',
        name: 'effectOver',
        default: 100
      }
    ]
  },
  globalVariable: {
    baseStates: new Map(),
    special: new Map(),
    items: new Map()
  },
  states: {},
  items: {},
  playerName: '默认名称'
})

const getters = {
  getStates: state => varName => {
    if (!state.globalVariable.baseStates.has(varName)) console.error('[store/sys.js/getStates]:' + varName + ' is undifine in store!')
    return state.globalVariable.baseStates.get(varName)
  },
  getSpecial: state => specialName => {
    if (!state.globalVariable.special.has(specialName)) console.error('[store/sys.js/getSpecial]:' + specialName + ' is undifine in store!')
    return state.globalVariable.special.get(specialName)
  }
}

const actions = {
  finishStarter ({ commit }, startOprions) {
    commit('finishStarter', startOprions)
  },
  resetStarter ({ commit }) {
    commit('resetStarter')
  },
  setStarter ({ commit }, starter) {
    commit('setStarter', starter)
  },
  changeSpecial ({ commit }, context) {
    commit('changeSpecial', context)
  },
  setSpecial ({ commit }, context) {
    commit('setSpecial', context)
  },
  changeVar ({ commit }, context) {
    commit('changeVar', context)
  },
  setVar ({ commit }, context) {
    commit('setVar', context)
  },
  setItems ({ commit }, { id, value }) {
    commit('setStates', { id, value })
  },
}

const mutations = {
  finishStarter (state, startOptions) {
    if (!startOptions.baseStates instanceof Map) {
      console.error('[store/sys.js/finishStarter]:baseStates is not map!')
    } else {
      for (const [k, v] of startOptions.baseStates) {
        state.globalVariable.baseStates.set(k, v)
      }
      // state.globalVariable.baseStates = startOptions.baseStates
    }
    if (!startOptions.special instanceof Map) {
      console.error('[store/sys.js/finishStarter]:special is not map!')
    } else {
      for (const [k, v] of startOptions.special) {
        state.globalVariable.special.set(k, v)
      }
      // state.globalVariable.special = startOptions.special
    }
    state.globalVariable.baseStates.set('turn', 0)
  },
  resetStarter (state) {
    state.globalVariable = {
      baseStates: new Map(),
      special: new Map(),
      items: new Map()
    }
  },
  setStarter (state, starter) {
    state.starter = starter
  },
  changeVar (state, {varName, num}) {
    let baseStates = state.globalVariable.baseStates
    if (!baseStates.has(varName)) {
      console.error('[store/sys.js/changeVar]:' + varName + ' is undifine in store!')
    }
    if (typeof num === 'number') {
      baseStates.set(varName, baseStates.get(varName) + num)
    } else {
      baseStates.set(varName, num)
    }
  },
  setVar (state, {varName, content}) {
    // console.log(varName)
    // console.log(content)
    let baseStates = state.globalVariable.baseStates
    baseStates.set(varName, content)
  },
  changeSpecial (state, {name, num}) {
    let special = state.globalVariable.special
    if (typeof num !== 'Number') {
      num = 1
    }
    if (!special.has(name)) {
      console.error('[store/sys.js/changeSpecial]:' + name + ' is undifine in store!')
    }
    special.set(name, special.get(name) + num)
  },
  setSpecial (state, {name, num}) {
    if (typeof num !== 'Number') {
      num = 1
    }
    state.globalVariable.special.set(name, num)
  },
  setItems (state, { id, value }) {
    state.items[id] = value
  },
  setPlayerName (state, name) {
    state.playerName = name
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
