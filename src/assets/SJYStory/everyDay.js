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
  let labels = ['继续睡', '上班', '出门探险']
  return labels
}
export const dayMorning_Darams = () => {
  let darams = [[''], ['']]
  darams[0] = doWork()
  darams[1] = doSleep()
  let evpool = [0]
  if (randomNum() < 20) {
    darams.push(fail) // 失败事件
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
      '你收拾收拾便出门上班了。',
      '你顺利地完成了今天的工作。',
      stateObj('money', 210),
      stateObj('work', 1),
      stateObj('hair', -70),
      randomState(3)
    ],
    [
      '你随便收拾了下就出门上班了。',
      '你昨天好像没没睡好。',
      '不太能集中注意力。',
      stateObj('money', 180),
      stateObj('work', 1),
      stateObj('hair', -70),
      randomState(3)
    ],
    [
      '你感到今天非常有干劲！',
      '你一口气做完了今天的工作！',
      stateObj('money', 240),
      stateObj('work', 1),
      stateObj('hair', -70),
      randomState(3)
    ]
  ]
  return darams[randomNum(0, 2)]
}
const doSleep = () => {
  const darams = [
    [
      '说实话，不是很想去上班。',
      '你再次躺下了，享受了一次回笼觉。',
      stateObj('hair', 30),
    ],
    [
      '你根本不想去上班，所以你又躺下了。',
      '......',
      '......睡不着。',
      '你太过在意工作的事情了所以睡得不是很踏实。',
      stateObj('hair', 25),
    ],
    [
      '上班有睡觉快乐吗？',
      '你将工作完全抛到脑后，安心地睡着了。',
      stateObj('hair', 35),
    ]
  ]
  return darams[randomNum(0, 2)]
}
const findFood = () => {
  if (!getVar('热干面')) {
    return [
      '你在公司附近逛了逛。',
      '在公司的楼下，你发现了一家热干面。',
      '这附近也没有什么好吃的了，也许之后午餐可以选择热干面？',
      {
        content: '可以在午餐时选择吃热干面了！',
        setVar: {
          varName: '热干面',
          content: true
        }
      },
      stateObj(hair, 40)
    ] // 初次找到事件
  }
  if (!getVar('麦当劳')) {
    return [
      '你去了公司附近的商场。',
      '也许是写字楼林立的地方总是缺少点生活气息。',
      '办公区附近的商场显得很冷清。',
      '你在那里找到了一家麦当劳。',
      '这家麦当劳看起来有些...奇怪。',
      '你走进了店中，没有一个人搭理你。',
      '所有人都在埋头吃着。',
      '你感到有些有些诡异，离开了这个地方。',
      {
        content: '可以在午餐时选择吃麦当劳了！',
        setVar: {
          varName: '麦当劳',
          content: true
        }
      },
      stateObj(hair, 45)
    ]
  }
  if (!getVar('盖浇饭')) {
    return [
      '你在公司后面的小街上闻到了食物的香味。',
      '公司写字楼后方的小街上并没有什么行人，所以也没什么店铺。',
      '只有偶尔会有附近的居民为了抄近道才穿过这里。',
      '可香味是从哪来的呢？你仔细的找了找，发现在街头的一个角落，有一家很小的门面。',
      '是一家很普通的售卖盖浇饭的店铺，店铺中毫不意外的没什么顾客。',
      '你试了试，味道确实不错，你决定以后多光顾光顾。',
      {
        content: '可以在午餐时选择吃盖浇饭了！',
        setVar: {
          varName: '盖浇饭',
          content: true
        }
      },
      stateObj(hair, 40)
    ] // 初次找到事件
  }
}
const findFish = () => {
  if (!getVar('bajielindao')) {
    return ['']
  }
}
const findPlace = () => {

}
const fail = [
  '你出想出门逛逛，毕竟自从你来到这个城市你还没有怎么出去玩玩。',
  '生活一直被工作所占满。',
  '你跟着网上的推荐出门走了走。',
  '......',
  '实在是有点无聊，这次的推荐不太靠谱。',
  '你失望地回家了。',
  stateObj('hair', -5)
]

export const dayNoon_labels = () => {
  let labels = ['gongsishitang']
  if (getVar('热干面') && getVar('money') >= 50) {
    labels.push('热干面')
  }
  if (getVar('麦当劳')) {
    labels.push('麦当劳')
  }
  if (getVar('盖浇饭')) {
    labels.push('盖浇饭')
  }
  if (getVar('海底捞')) {
    labels.push('海底捞')
  }
  if (getVar('鸡公煲')) {
    labels.push('鸡公煲')
  }
  return labels
}

const MCDAddictionDaram = [
  '只有麦当劳才能被称作食物！',
  '只有麦当劳才能拯救我们！',
  '只有麦当劳！',
  stateObj('hair', -10)
]
export const dayNoon_Darams = () => {
  let darams = [['你选择去公司食堂吃饭。', '虽然不是很好吃，但好在不要钱', '你吃完了。']]
  if (getVar('热干面')) {
    let eatReganmian = [
      '你来到了那家热干面。',
      '虽然不是很好吃，但足够饱腹。',
    ]
    if (special.has('MDCAddiction')) {
      eatReganmian = MCDAddictionDaram
    } else if (special.has('dislikeReganmian')) {
      eatReganmian.push('你实在是吃腻了这家热干面。')
      eatReganmian.push('你硬着头皮吃完了。')
      eatReganmian.push(stateObj('hair', 10))
      eatReganmian.push(stateObj('money', -20))
    } else {
      eatReganmian.push(stateObj('hair', 40))
      eatReganmian.push(stateObj('money', -20))
      if (getVar('reganmianTime') <= 5) {
        eatReganmian.push({
          content: '你吃完了。',
          changeVar: {
            varName: 'reganmianTime',
            num: 1
          }
        })        
      } else {
        eatReganmian.push('你已经吃腻了这家热干面了。')
        eatReganmian.push({
          content: '得到特质“讨厌热干面”',
          setSpecial: {
            name: 'dislikeReganmian',
            num: 1
          }
        })
      }
    }
    darams.push(eatReganmian)
  }
  if (getVar('麦当劳')) {
    let eatMCD = [
      '你再次来到这家麦当劳，点了个套餐。',
      '你犹豫了下，还是吃了下去。',
      '......',
      '好像也没什么不一样，和其它麦当劳一样的味道。',
      '看来是你想多了。'
    ]
    if (special.has('MDCAddiction')) {
      eatMCD = [
        '是麦当劳！',
        '必须...进食...',
        '你不顾一切地低头吃了起来。',
        stateObj('hair', 12),
        stateObj('money', -30)
      ]
    } else {
      eatReganmian.push(stateObj('hair', 45))
      eatReganmian.push(stateObj('money', -30))
      if (getVar('MDCTime') <= 10) {
        eatReganmian.push({
          content: '你吃完了。',
          changeVar: {
            varName: 'MDCTime',
            num: 1
          }
        })
      } else {
        eatReganmian.push('你感到...似乎有什么东西变得不一样了。')
        eatReganmian.push('吃了这么多次，你已经不再抵触这家麦当劳。')
        eatReganmian.push('应该说...你好像...变得越来越想吃。')
        eatReganmian.push('你开始无法思考，在你的脑中只有三个字在回响。')
        eatReganmian.push('麦当劳。')
        eatReganmian.push({
          content: '得到特质“麦当劳的诅咒”',
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
      if (randomNum() < 75) {
        darams.push([
          '你来到了那家街角的盖浇饭。',
          '老板热情的招呼你进去吃饭。',
          stateObj('hair', 40),
          stateObj('money', -30)
        ])        
      } else {
        darams.push([
          '你来到了那家街角的盖浇饭。',
          '今天没有开门。',
          '你随便吃了点别的就回去了。',
          stateObj('hair', 35),
          stateObj('money', -30)
        ])  
      }
    }
  }
  if (getVar('海底捞')) {
    if (special.has('MDCAddiction')) {
      darams.push(MCDAddictionDaram)
    } else {
      let eatHDL = [
        '真的要吃这么奢侈吗？',
        '算了，来都来了，你还是吃了点。',
        stateObj('hair', 60),
        stateObj('money', -100),
        randomState(),
        randomState()
      ]
      if (randomNum() < 50) {
        eatHDL.push(randomState())
      }
      darams.push(eatHDL)
    }
  }
  if (getVar('鸡公煲')) {
    if (special.has('MDCAddiction')) {
      darams.push(MCDAddictionDaram)
    } else {
      darams.push([
        '你享用了鸡公煲。',
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