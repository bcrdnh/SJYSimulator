import { randomNum } from "../utils"
import store from '../../store'
const getVar = store.getters['sys/getStates']
const special = store.state.sys.globalVariable.special

const powerCorrection = () => {
  if (special.has('power+')) return 0.4
  if (special.has('power-')) return -0.4
  return 0
}
const staminaCorrection = () => {
  if (special.has('stamina+')) return 0.4
  if (special.has('stamina-')) return -0.4
  return 0
}
const inteCorrection = () => {
  if (special.has('inte+')) return 0.4
  if (special.has('inte-')) return -0.4
  return 0
}
const braveCorrection = () => {
  if (special.has('brave+')) return 0.4
  if (special.has('brave-')) return -0.4
  return 0
}
const charmCorrection = () => {
  if (special.has('charm+')) return 0.4
  if (special.has('charm-')) return -0.4
  return 0
}
const moneyCorrection = () => {
  if (special.has('money+')) return 0.1
  if (special.has('money-')) return -0.1
  return 0
}
const bodyCorrection = () => {
  if (special.has('body+')) return 0.4
  if (special.has('body-')) return -0.4
  return 0
}

export const endStartStage = [
  '23岁，你大学毕业了，参加了这次面试',
  '......',
  '大叔：嗯，好，我已经清楚了。',
  '他看着你的简历，听着你的讲述，看来他已经清楚了你的故事。',
  '他不再看桌上的简历，抬起头来，对你露出非常官方的微笑。',
  '大叔：你回去等通知吧。',
  '你离开了公司。',
  '两天后，你收到了正式入职的通知。',
  '试用期三个月，这家公司是你居住的城市内对你而言最好的选择了。',
  '为了成功转正你下定决心，要在工作中好好展现自己。',
  '入职前一天晚上，你早早地就睡了。',
]

export const dayStartPlot = [
  '新的一天开始了！',
  '今天是你入职的第{day}天！'
]

export const dayMorning_labels = () => {
  let labels = ['jixushuijiao', 'shangban', 'chuqutanxian']
  return labels
}
export const dayMorning_Darams = () => {
  let darams = [[''], ['']]
  darams[0] = doWork()
  darams[1] = doSleep()
  let evpool = [0]
  if (randomNum() < 20) {
    darams.push() // 失败事件
    return darams
  }
  if (!getVar('jigongbao')) {
    evpool.push(1)
  }
  if (!getVar('moyu')) {
    evpool.push(2)
  }
  if (!getVar('ff14')) {
    evpool.push(3)
  }
  switch (evpool[randomNum(0, evpool.length - 1)]) {
    case 0:
      darams.push() // 普通事件
      break;
    case 1:
      darams.push(findFood())
      break;
    case 2:
      darams.push(findFish())
      break;
    case 3:
      darams.push(findPlace())
      break;
    default:
      break;
  }
  return darams
}
const doWork = () => {
  const darams = [
    [
      '',
      '',
      stateObj('money', 210),
      stateObj('hair', -70),
      randomState(3)
    ],
    [
      '',
      '',
      stateObj('money', 180),
      stateObj('hair', -70),
      randomState(3)
    ],
    [
      '',
      '',
      stateObj('money', 240),
      stateObj('hair', -70),
      randomState(3)
    ]
  ]
  return darams[randomNum(0, 2)]
}
const doSleep = () => {
  const darams = [
    [
      '',
      '',
      stateObj('hair', 30),
    ],
    [
      '',
      '',
      stateObj('hair', 25),
    ],
    [
      '',
      '',
      stateObj('hair', 35),
    ]
  ]
  return darams[randomNum(0, 2)]
}
const findFood = () => {
  if (!getVar('reganmian')) {
    return [''] // 初次找到事件
  }
}
const findFish = () => {
  if (!getVar('bajielindao')) {
    return ['']
  }
}
const findPlace = () => {

}

export const dayNoon_labels = () => {
  let labels = ['gongsishitang']
  if (getVar('regammian') && getVar('money') >= 50) {
    labels.push('mdl')
  }
  if (getVar('maidanglao')) {
    labels.push('hdl')
  }
  if (getVar('gaijiaofan')) {
    labels.push('gjf')
  }
  if (getVar('haidilao')) {
    labels.push('hm')
  }
  if (getVar('jigongbao')) {
    labels.push('jgb')
  }
  return labels
}

const MCDAddictionDaram = [
  '',
  '',
  '',
  stateObj('hair', -10)
]
export const dayNoon_Darams = () => {
  let darams = [['', '', '']]
  if (getVar('reganmian')) {
    let eatReganmian = [
      '',
      '',
      ''
    ]
    if (special.has('MDCAddiction')) {
      eatReganmian = MCDAddictionDaram
    } else if (special.has('dislikeReganmian')) {
      eatReganmian.push('')
      eatReganmian.push('')
      eatReganmian.push(stateObj('hair', 10))
      eatReganmian.push(stateObj('money', -20))
    } else {
      eatReganmian.push(stateObj('hair', 40))
      eatReganmian.push(stateObj('money', -20))
      if (getVar('reganmianTime') <= 5) {
        eatReganmian.push({
          content: '......',
          changeVar: {
            varName: 'reganmianTime',
            num: 1
          }
        })        
      } else {
        eatReganmian.push('')
        eatReganmian.push('')
        eatReganmian.push({
          content: '',
          setSpecial: {
            name: 'dislikeReganmian',
            num: 1
          }
        })
      }
    }
    darams.push(eatReganmian)
  }
  if (getVar('maidanglao')) {
    let eatMCD = [
      '',
      '',
      ''
    ]
    if (special.has('MDCAddiction')) {
      eatMCD = [
        '',
        '',
        '',
        stateObj('hair', 12),
        stateObj('money', -30)
      ]
    } else {
      eatReganmian.push(stateObj('hair', 45))
      eatReganmian.push(stateObj('money', -30))
      if (getVar('MDCTime') <= 10) {
        eatReganmian.push({
          content: '......',
          changeVar: {
            varName: 'MDCTime',
            num: 1
          }
        })
      } else {
        eatReganmian.push('')
        eatReganmian.push('')
        eatReganmian.push({
          content: '',
          setSpecial: {
            name: 'MDCAddiction',
            num: 1
          }
        })
      }
    }
  }
  if (getVar('gaijiaofan')) {
    if (special.has('MDCAddiction')) {
      darams.push(MCDAddictionDaram)
    } else {
      darams.push([
        '',
        '',
        stateObj('hair', 40),
        stateObj('money', -30)
      ])
    }
  }
  if (getVar('haidilao')) {
    if (special.has('MDCAddiction')) {
      darams.push(MCDAddictionDaram)
    } else {
      darams.push([
        '',
        '',
        stateObj('hair', 60),
        stateObj('money', -100),
        randomState(),
        randomState()
      ])
    }
  }
  if (getVar('jigongbao')) {
    if (special.has('MDCAddiction')) {
      darams.push(MCDAddictionDaram)
    } else {
      darams.push([
        '',
        '',
        stateObj('hair', 50),
        stateObj('money', -50)
      ])
    }
  }
  return darams
}

export const dayAfternoon_labels = () => {
  const labels = ['jixugongzuo']
  if (getVar('wanshouji')) {
    label.push('')
  }
  if (getVar('duanlianshenti')) {
    label.push('')
  }
  if (getVar('xiuxi')) {
    label.push('')
  }
  if (getVar('bajielindao')) {
    label.push('')
  }
  if (getVar('jiujimoyu')) {
    label.push('')
  }
  return labels
}

export const dayAfternoon_Darams = () => {
  const darams = [
    [
      '', 
      '', 
      stateObj('work', 1)
    ],
  ]
  if (getVar('bajielindao')) {
    darams.push([
      '',
      '',
      {
        content: '',
        clas: '',
        changeVar: {
          name: '',
          num: ''
        }
      }
    ])
  }
  if (getVar('wanshouji')) {
    darams.push([
      '',
      '',
      {
        content: '',
        clas: 'nes-text is-primary',
        changeVar: {
          name: 'power',
          num: 3 + Math.floor(powerCorrection() * 3)
        }
      }
    ])
  }
  if (getVar('xuexi')) {
    darams.push([
      '',
      '',
      {
        content: '',
        clas: 'nes-text is-primary',
        changeVar: {
          name: 'inte',
          num: 3 + Math.floor(inteCorrection() * 3)
        }
      }
    ])
  }
  if (getVar('rumalindao')) {
    darams.push([
      '',
      '',
      {
        content: '',
        clas: 'nes-text is-primary',
        changeVar: {
          name: 'charm',
          num: 3 + Math.floor(charmCorrection() * 3)
        }
      }
    ])
  }
  if (getVar('moyu')) {
    darams.push([
      '',
      '',
      {
        content: '',
        clas: 'nes-text is-primary',
        changeVar: {
          name: 'brave',
          num: 3 + Math.floor(braveCorrection() * 3)
        }
      }
    ])
  }
  return 
}

export const dayEvening_labels = () => {
  let labels = ['go home']
  if (getVar('jsf')) {
    labels.push('jsf')
  }
  if (getVar('gd')) {
    labels.push('gd')
  }
  if (getVar('gcw')) {
    labels.push('gcw')
  }
  if (getVar('dns')) {
    labels.push('dns')
  }
  if (getVar('ff14')) {
    labels.push('ff14')
  }
  labels.push('walk')
  return 
}

export const dayEvening_Darams = () => {
  let darams = [[''],]
  return darams
}

const afterOneDay = [
  '时间不早了，你躺倒在床上。',
  '积攒了一天的疲劳让你很快就睡着了......',
  {

  },
  '......',
  '......',
  '......'
]

export const weekendMorning_labels = () => {
  return ['好好休息', '去加班']
}

export const weekendMorning_darams = () => {
  const darams = [
    [
      '',
      '',
      {
        content: '',
        clas: '',
        changeVar: {
          name: 'hair',
          num: 15
        }
      }
    ],
    [
      '',
      '',
    ]
  ]
  if (getVar('day') === 7 ) {
    darams[1].push(
      {
        content: '',
        clas: '',
        changeVar: {
          name: 'work',
          num: getVar('inte') >= 50 ? Math.floor((getVar('inte') - 50) / 10) : 1
        }
      }
    )
  } 
  if (getVar('day') === 14) {
    const state = (getVar('charm') + getVar('brave')) / 2
    darams[1].push(
      {
        content: '',
        clas: '',
        changeVar: {
          name: 'work',
          num: state >= 50 ? Math.floor((state - 50) / 10) : 1
        }
      }
    )
  }
  if (getVar('day') === 21) {
    const state = (getVar('power') + getVar('stamina')) / 2
    darams[1].push(
      {
        content: '',
        clas: '',
        changeVar: {
          name: 'work',
          num: state >= 50 ? Math.floor((state - 50) / 10) : 1
        }
      }
    )
  }
  return darams
}

const stateObj = (name, x) => {
  switch (name) {
    case 'power':
      return {
        content: x > 0 ? '' : '',
        clas: x > 0 ? '' : '',
        changeVar: {
          name: 'power',
          num: x + Math.floor(powerCorrection() * Math.abs(x))
        }
      }
    case 'stamina':
      return {
        content: x > 0 ? '' : '',
        clas: x > 0 ? '' : '',
        changeVar: {
          name: 'stamina',
          num: x + Math.floor(staminaCorrection() * Math.abs(x))
        }
      }
    case 'inte': 
      return {
        content: x > 0 ? '' : '',
        clas: x > 0 ? '' : '',
        changeVar: {
          name: 'inte',
          num: x + Math.floor(inteCorrection() * Math.abs(x))
        }
      }
    case 'charm':
      return {
        content: x > 0 ? '' : '',
        clas: x > 0 ? '' : '',
        changeVar: {
          name: 'charm',
          num: x + Math.floor(charmCorrection() * Math.abs(x))
        }
      }
    case 'barve': 
      return {
        content: x > 0 ? '' : '',
        clas: x > 0 ? '' : '',
        changeVar: {
          name: 'brave',
          num: x + Math.floor(braveCorrection() * Math.abs(x))
        }
      }
    case 'money':
      return {
          content: x > 0 ? '' : '',
          clas: x > 0 ? '' : '',
          changeVar: {
            name: 'money',
            num: x
          }
      }
    case 'hair':
      return {
        content: x > 0 ? '' : '',
        clas: x > 0 ? '' : '',
        changeVar: {
          name: 'hair',
          num: x
        }
      }
    case 'work':
        return {
          content: x > 0 ? '' : '',
          clas: x > 0 ? '' : '',
          changeVar: {
            name: 'work',
            num: x
          }
        }
    default:
      break;
  }
}
const randomState = (x = 3) => {
  return stateObj(['', '', '', '', ''][randomNum(0, 4)], x)
}

export const weekendAfternoon_labels = () => {
  if (getVar('day') === 7) {
    return ['', '', '', '']
  }
  if (getVar('day') === 14) {
    return ['', '', '', '']
  }
  if (getVar('day') === 21) {
    return ['', '', '', '']
  }
}

export const weekendAfternoon_darams = () => {
  if (getVar('day') === 7) {
    return [
      [],
      [],
      [],
      []
    ]
  }
  if (getVar('day') === 14) {
    return [
      [],
      [],
      [],
      [],
    ]
  }
  if (getVar('day') === 21) {
    return [
      [],
      [],
      [],
      []
    ]
  }
}