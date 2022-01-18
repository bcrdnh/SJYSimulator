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
  let labels = ['work']
  if (getVar('fpark')) {
    labels.push('fpark')
  }
  if (getVar('fwb')) {
    labels.push('fwb')
  }
  if (getVar('fhs')) {
    labels.push('fhs')
  }
  if (getVar('fwhatever')) {
    labels.push('fwhatever')
  }
  labels.push('play')
  return [
    '上班',
    '翘班'
  ]
}

export const dayMorning_Darams = () => {
  const workPart0 = [
    'something happened',
    {
      content: '',
      changeVar: {
        varName: 'temp',
        num: 10
      }
    }
  ]
  let darams = [['u go to work',]]
  if (randomNum(0, 100) < 10) {
    darams[0].push(workPart0)    
  }
  if (getVar('fpark')) {
    darams.push(['fpark'])
  }
  if (getVar('fwb')) {
    darams.push(['fwb'])
  }
  if (getVar('fhs')) {
    darams.push(['fhs'])
  }
  if (getVar('fwhatever')) {
    darams.push(['fwhatever'])
  }
  // 没时间优化了
  if (!getVar('fpark') && randomNum(0, 100) < 50) {
    darams.push[
      'u find park!',
      {
        content: 'u can go park',
        clas: '',
        setVar: {
          varName: 'fpark',
          content: true
        }
      }
    ]
  } else if (!getVar('fwb') && randomNum(0, 100) < 50) {

  } else if (!getVar('fhs') && randomNum(0, 100) < 50) {

  } else if (!getVar('whatever') && randomNum(0, 100) < 50) {

  } else {

  }
  return [
    [
      '你上班。'
    ],
    [
      '你玩了个爽。'
    ]
  ]
}

export const dayNoon_labels = () => {
  let labels = ['rgm']
  if (getVar('mdl')) {
    labels.push('mdl')
  }
  if (getVar('hdl')) {
    labels.push('hdl')
  }
  if (getVar('gjf')) {
    labels.push('gjf')
  }
  if (getVar('hm')) {
    labels.push('hm')
  }
  if (getVar('jgb')) {
    labels.push('jgb')
  }
  return [
    '热干面',
    '盖浇饭'
  ]
}

export const dayNoon_Darams = () => {
  const goHomePart0 = [
    'something happened',
    {
      content: '',
      changeVar: {
        varName: 'temp',
        num: 10
      }
    }
  ]
  let darams = [['u go home',]]
  if (randomNum(0, 100) < 10) {
    darams[0].push(goHomePart0)    
  }
  if (getVar('')) {
    darams.push([''])
  }
  if (getVar('')) {
    darams.push([''])
  }
  if (getVar('')) {
    darams.push([''])
  }
  if (getVar('')) {
    darams.push([''])
  }
  if (!getVar('')) {

  } else if (!getVar('') && randomNum(0, 100) < 50) {

  } else if (!getVar('') && randomNum(0, 100) < 50) {
    
  } else if (!getVar('') && randomNum(0, 100) < 50) {
    
  } else if (!getVar('') && randomNum(0, 100) < 50) {
    
  } else {
    
  }
  return [
    ['呸，真难吃。'],
    ['一般般吧。']
  ]
}

export const dayAfternoon_labels = () => {
  return [
    '上班',
    '翘班'
  ]
}

export const dayAfternoon_Darams = () => {
  return [
    [
      '你上班。'
    ],
    [
      '你玩了个爽。'
    ]
  ]
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
  return [
    '回家吧',
    '出去玩'
  ]
}

export const dayEvening_Darams = () => {
  if (!getVar('mdl')) {

  } else if (!getVar('')) {

  } else if (!getVar('')) {
    
  } else if (!getVar('')) {
    
  } else if (!getVar('')) {
    
  } else {
    
  }
  return [
    [
      '你上班。'
    ],
    [
      '你玩了个爽。'
    ]
  ]
}