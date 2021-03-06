import { randomNum, randomArr, judge, stateObj, randomState } from "../utils"
import { store } from '../../store'
const getVar = store.getters['sys/getStates']
const special = store.state.sys.globalVariable.special

export const endStartStage = [
  '23岁，你大学毕业了，参加了这次面试',
  '......',
  '大叔：嗯，好，我已经清楚了。',
  '他看着你的简历，听着你的讲述，看来他已经清楚了你的故事。',
  '他不再看桌上的简历，抬起头来，对你露出非常官方的微笑。',
  '大叔：你回去等通知吧。',
  '你离开了公司。',
  '两天后，你收到了正式入职的通知。',
  {
    content: '试用期为三周，单休。',
    clas: 'nes-text is-primary'
  },
  {
    content: '每周日的下午都会对你的业绩进行考核。',
    clas: 'nes-text is-primary'
  },
  {
    content: '每次考核都通过就可以转正了！',
    clas: 'nes-text is-primary'
  },
  '为了成功转正你下定决心，要在工作中好好展现自己。',
  '入职前一天晚上，你早早地就睡了。',
]

// export const dayStartPlot = [
//   '新的一天开始了！',
//   '今天是你入职的第{day}天！'
// ]
// export const weekendStartPlot = [
//   '新的一天开始了！',
//   '今天是你入职的第{day}天！',
//   '不过今天是周日，可以放松一下了。',
// ]

export const dayStartPlot = () => {
  const normalDay = [
    '新的一天开始了！',
    '今天是你入职的第{day}天！'
  ]
  const weekend = [
    '新的一天开始了！',
    '今天是你入职的第{day}天！',
    '不过今天是周日，可以放松一下了。',
  ]
  const newWeek = [
    '新的一天开始了！',
    '今天是你入职的第{day}天！',
    {
      content: '微信群似乎更新了！',
      clas: 'nes-text is-primary',
    },
  ]
  if (getVar('day') === 7 || getVar('day') === 14 || getVar('day') === 21) {
    return weekend
  }
  if (getVar('day') === 8 || getVar('day') === 15) {
    return newWeek
  }
  return normalDay
}

export const dayMorning_labels = () => {
  let labels = ['上班', '继续睡', '出门探险']
  return labels
}
export const dayMorning_Darams = () => {
  let darams = []
  darams.push(doWork())
  darams.push(doSleep())
  let evpool = ['normal event']
  if (randomNum() < 20) {
    darams.push(fail()) // 失败事件
    return darams
  }
  if (!getVar('鸡公煲')) {
    evpool.push('find food')
  }
  if (!getVar('究极摸鱼')) {
    evpool.push('find fish')
  }
  if (!getVar('FF14')) {
    evpool.push('find place')
  }
  switch (evpool[randomNum(0, evpool.length - 1)]) {
    case 'normal event':
      darams.push(randomArr(normalEvent())) // 普通事件
      break;
    case 'find food':
      darams.push(findFood())
      break;
    case 'find fish':
      darams.push(findFish())
      break;
    case 'find place':
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
      '你坐到工位上开始了你工作。',
      '你顺利地完成了今天的工作。',
      stateObj('money', 300),
      stateObj('work', 1),
      stateObj('hair', -50),
      randomState(3)
    ],
    [
      '你坐到工位上开始了你工作。',
      '注意力不是很集中。犯了不少错误。',
      stateObj('money', 250),
      stateObj('work', 1),
      stateObj('hair', -50),
      randomState(3)
    ],
    [
      '你感到今天非常有干劲！',
      '你一口气做完了今天的工作！',
      stateObj('money', 350),
      stateObj('work', 1),
      stateObj('hair', -50),
      randomState(3)
    ]
  ]
  return darams[randomNum(0, 2)]
}
const doSleep = () => {
  const darams = [
    [
      '说实话，不是很想去上班。',
      '你就地躺下，享受了一次回笼觉。',
      stateObj('hair', 30),
    ],
    [
      '你根本不想去上班，所以你躺平了。',
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
        clas: 'nes-text is-primary',
        setVar: {
          varName: '热干面',
          content: true
        }
      },
      stateObj('hair', 40)
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
        clas: 'nes-text is-primary',
        setVar: {
          varName: '麦当劳',
          content: true
        }
      },
      stateObj('hair', 45)
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
        clas: 'nes-text is-primary',
        setVar: {
          varName: '盖浇饭',
          content: true
        }
      },
      stateObj('hair', 40)
    ] // 初次找到事件
  }
  if (!getVar('海底捞')) {
    return [
      '你有一次去了公司附近的商场。',
      '那里有一家海底捞。',
      '你想起你的校园时光，你曾经还经常和室友一起吃。',
      {
        content: '可以在午餐时选择吃海底捞了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '海底捞',
          content: true
        }
      },
      stateObj('hair', 60),
      randomState(),
      randomState()      
    ]
  }
  if (!getVar('鸡公煲') && randomNum() < 75) {
    return [
      '你在一条小路上走着。',
      '事实上你并不知道自己在哪、这条路叫什么。',
      '但你还是慢慢地走着。',
      '没有在赶着完成什么，也没有急着前往哪里',
      '只是慢慢地、漫无目的地走',
      '一股食物香味吸引了你的注意',
      '你循着香味走去。',
      '你发现了鸡公煲。',
      {
        content: '可以在午餐时选择吃鸡公煲了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '鸡公煲',
          content: true
        }
      },
      stateObj('hair', 50),
      randomState(),
      randomState(),   
    ]
  }
  return randomArr(normalEvent())
}
const findFish = () => {
  if (!getVar('玩手机')) {
    return [
      '你想起来你每次都是在早上就完成每日任务，因此下午都很无聊。',
      '你决定去公司找找有没有什么下午空闲时可以做的事情。',
      '你决定观察你旁边的同事。',
      '他在......玩手机！',
      {
        content: '学会了玩手机！下午可以玩手机了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '玩手机',
          content: true
        }
      },
    ]
  }
  if (!getVar('锻炼身体')) {
    return [
      '你想起来你每次都是在早上就完成每日任务，因此下午都很无聊。',
      '你决定去公司找找有没有什么下午空闲时可以做的事情。',
      '你决定观察你旁边的同事。',
      '他在......闲逛！',
      {
        content: '学会了锻炼身体！下午可以锻炼身体了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '锻炼身体',
          content: true
        }
      },
    ]
  }
  if (!getVar('休息')) {
    return [
      '你想起来你每次都是在早上就完成每日任务，因此下午都很无聊。',
      '你决定去公司找找有没有什么下午空闲时可以做的事情。',
      '你决定观察你旁边的同事。',
      '他在......睡觉！',
      {
        content: '学会了休息！下午可以休息了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '休息',
          content: true
        }
      },
    ]
  }
  if (!getVar('巴结领导')) {
    return [
      '你想起来你每次都是在早上就完成每日任务，因此下午都很无聊。',
      '你决定去公司找找有没有什么下午空闲时可以做的事情。',
      '你决定观察你旁边的同事。',
      '他在......巴结领导！',
      {
        content: '学会了巴结领导！下午可以巴结领导了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '巴结领导',
          content: true
        }
      },
    ]
  }
  if (!getVar('究极摸鱼') && randomNum() < 75) {
    return [
      '你想起来你每次都是在早上就完成每日任务，因此下午都很无聊。',
      '你决定去公司找找有没有什么下午空闲时可以做的事情。',
      '你决定观察你旁边的同事。',
      '他在......他什么也没干！',
      '隔壁的同事突然看向了你！',
      '隔壁的同事：我已经......没有什么好教你的了。',
      '原来这一切他都知道！',
      '隔壁的同事：这已经，是我全部的摸鱼绝学了。',
      '隔壁的同事：记住啊{playerName}，摸鱼的真谛！',
      '隔壁的同事：就是放下一切。',
      '说完，他便离职了。',
      {
        content: '学会了终极的摸鱼技巧！下午可以使用究极摸鱼了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '究极摸鱼',
          content: true
        }
      },
    ]
  }
  return randomArr(normalEvent())
}
const findPlace = () => {
  if (!getVar('健身房')) {
    return [
      '你在住所附近转了转。',
      '发现了一家健身房。',
      '也许可以在下班之后来锻炼锻炼？',
      {
        content: '发现了健身房！下班后可以去健身房了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '健身房',
          content: true
        }
      },
    ]
  } 
  if (!getVar('酒吧')) {
    return [
      '你在住所附近转了转。',
      '发现了一家酒吧。',
      '也许可以在下班之后来玩玩？',
      {
        content: '发现了酒吧！下班后可以去酒吧了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '酒吧',
          content: true
        }
      },
    ]
  }
  if (!getVar('美发店')) {
    return [
      '你在住所附近转了转。',
      '发现了一家美发店。',
      '也许可以在下班之后来做做头发？',
      {
        content: '发现了美发店！下班后可以去美发店了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '美发店',
          content: true
        }
      },
    ]
  }
  if (!getVar('工地')) {
    return [
      '你在住所附近转了转。',
      '发现了一家工地。',
      '没想到公司居然还有房地产业务...而且还正在招募搬砖的工人？',
      {
        content: '发现了工地！下班后可以去工地了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: '工地',
          content: true
        }
      },
    ]
  }
  if (!getVar('FF14') && randomNum() < 75) {
    return [
      '你在住所附近转了转。',
      '......',
      '什么也没发现？这里已经没什么好玩的地方了。',
      '还是回家打游戏吧。',
      {
        content: '发现了FF14！下班后可以去FF14了！',
        clas: 'nes-text is-primary',
        setVar: {
          varName: 'FF14',
          content: true
        }
      },
    ]
  }
  return randomArr(normalEvent())
}
const fail = () => {
    return [
    '你出想出门逛逛，毕竟自从你来到这个城市你还没有怎么出去玩玩。',
    '生活一直被工作所占满。',
    '你跟着网上的推荐出门走了走。',
    '......',
    '实在是有点无聊，看来这次的推荐不太靠谱。',
    '你失望地回去了。',
    stateObj('hair', -5)
  ]
}
const normalEvent = () => {
    return [
    [
      '你出了门，坐上了与公司方向相反的公交。',
      '你没有安排目的地，期待着会到达什么样的地方。',
      '......',
      '堵车了。',
      '你一上午都堵在路上。',
      '你在车上休息了一上午。',
      stateObj('hair', 30)
    ],
    [
      '也没什么好玩的，去看电影吧。',
      ...randomArr([['看了电影《北京堡垒》。'],
      ['看了电影《流浪火星》。'],
      ['看了电影《狼出没之没有熊》。'],
      ['看了电影《逐梦洋葱圈》。']]),
      stateObj('hair', 15),
      randomState(3),
      randomState(3),
    ],
    [
      '去运动一下吧。',
      ...randomArr([['去羽毛球馆打了羽毛球。'],
      ['和别人一起打了篮球。'],
      ['去体育场一口气跑了1200米'],
      ['去体育场一口气跑了3200米']]),
      stateObj('hair', 15),
      stateObj('power', 3),
      stateObj('stamina', 3),
    ],
    [
      '好累啊，还是玩玩游戏算了。',
      ...randomArr([['玩了神兽世界。'],
      ['玩了刺客鸡条'],
      ['玩了GTA6'],
      ['玩了荒野之吹']]),
      stateObj('hair', 15),
      stateObj('inte', 6)
    ],
    [
      '出去找找有没有什么娱乐项目吧。',
      ...randomArr([['找到了一家宠物店。享受了撸猫的快感。'],
      ['发现了一家KTV，尽情歌唱了。'],
      ['发现了一家网吧，玩了游戏。为什么不在家玩呢？'],
      ['发现了剧本杀，和其它人一起剧本杀了。']]),
      stateObj('hair', 15),
      stateObj('charm', 3),
      stateObj('brave', 3),
    ]
  ]
}

export const dayNoon_labels = () => {
  let labels = ['公司食堂', '内卷', '外卖']
  if (getVar('热干面') && getVar('money') >= 30) {
    labels.push('热干面')
  }
  if (getVar('麦当劳') && getVar('money') >= 30) {
    labels.push('麦当劳')
  }
  if (getVar('盖浇饭') && getVar('money') >= 30) {
    labels.push('盖浇饭')
  }
  if (getVar('海底捞') && getVar('money') >= 200) {
    labels.push('海底捞')
  }
  if (getVar('鸡公煲') && getVar('money') >= 30) {
    labels.push('鸡公煲')
  }
  return labels
}

const MCDAddictionDaram = () => {
    return [
    '只有麦当劳才能被称作食物！',
    '只有麦当劳才能拯救我们！',
    '只有麦当劳！',
    stateObj('hair', -10)
  ]
}
export const dayNoon_Darams = () => {
  let darams = [
    [
      '你选择去公司食堂吃饭。',
      '虽然不是很好吃，但好在不要钱。',
      '你吃完了。',
      stateObj('hair', 20)
    ],
    [
      '吃饭？吃什么饭，我{playerName}今天就要卷死他们！',
      '你一点都没有离开工位的样子，在工位上埋头苦干。',
      stateObj('hair', -35),
      stateObj('work', 1),
      stateObj('money', 100)
    ],
    [
      '点个外卖吧...',
      ...randomArr([[
        '你点了一份健身餐。',
        '也太少了吧...',
        stateObj('hair', 5),
        stateObj('stamina', 3),
        stateObj('power', 3), 
      ], [
        '你点了肯德基！吃得很爽！',
        stateObj('hair', 20),
        stateObj('stamina', 5),
        stateObj('power', 5), 
      ]], [80, 20])
    ]
  ]
  if (getVar('热干面')) {
    let eatReganmian = [
      '你来到了那家热干面。',
      '虽然不是很好吃，但足够饱腹。',
    ]
    if (special.has('MDCAddiction') && !special.has('讨厌麦当劳')) {
      eatReganmian = MCDAddictionDaram()
    } else if (special.has('dislikeReganmian')) {
      eatReganmian.push('你实在是吃腻了这家热干面。')
      eatReganmian.push('你硬着头皮吃完了。')
      eatReganmian.push(stateObj('hair', 10))
      eatReganmian.push(stateObj('money', -30))
    } else {
      eatReganmian.push(stateObj('hair', 40))
      eatReganmian.push(stateObj('money', -30))
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
    if (special.has('MDCAddiction') && !special.has('讨厌麦当劳')) {
      eatMCD = [
        '是麦当劳！',
        '必须...进食...',
        '你不顾一切地低头吃了起来。',
        stateObj('hair', 12),
        stateObj('money', -30)
      ]
    } else {
      eatMCD.push(stateObj('hair', 45))
      eatMCD.push(stateObj('money', -30))
      if (getVar('MDCTime') <= 10) {
        eatMCD.push({
          content: '你吃完了。',
          changeVar: {
            varName: 'MDCTime',
            num: 1
          }
        })
      } else {
        eatMCD.push('你感到...似乎有什么东西变得不一样了。')
        eatMCD.push('吃了这么多次，你已经不再抵触这家麦当劳。')
        eatMCD.push('应该说...你好像...变得越来越想吃。')
        eatMCD.push('你开始无法思考，在你的脑中只有三个字在回响。')
        eatMCD.push('麦当劳。')
        eatMCD.push({
          content: '得到特质“麦当劳的诅咒”',
          setSpecial: {
            name: 'MDCAddiction',
            num: 1
          }
        })
      }
    }
    darams.push(eatMCD)
  }
  if (getVar('盖浇饭')) {
    if (special.has('MDCAddiction') && !special.has('讨厌麦当劳')) {
      darams.push(MCDAddictionDaram())
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
    if (special.has('MDCAddiction') && !special.has('讨厌麦当劳')) {
      darams.push(MCDAddictionDaram())
    } else {
      let eatHDL = [
        '真的要吃这么奢侈吗？',
        '算了，来都来了，你还是吃了点。',
        stateObj('hair', 60),
        stateObj('money', -200),
        randomState(5),
        randomState(5),
        randomState(5)
      ]
      if (randomNum() < 50) {
        eatHDL.push(randomState())
      }
      darams.push(eatHDL)
    }
  }
  if (getVar('鸡公煲')) {
    if (special.has('MDCAddiction') && !special.has('讨厌麦当劳')) {
      darams.push(MCDAddictionDaram())
    } else {
      darams.push([
        '你享用了鸡公煲。',
        stateObj('hair', 50),
        stateObj('money', -30),
        randomState(5),
        randomState(5),
        randomState(5),
        randomState(5),
        randomState(5)
      ])
    }
  }
  return darams
}

export const dayAfternoon_labels = () => {
  let labels = ['继续工作', '学习']
  if (getVar('玩手机')) {
    labels.push('玩手机')
  }
  if (getVar('锻炼身体')) {
    labels.push('锻炼身体')
  }
  if (getVar('休息')) {
    labels.push('休息')
  }
  if (getVar('巴结领导')) {
    labels.push('巴结领导')
  }
  if (getVar('究极摸鱼')) {
    labels.push('究极摸鱼')
  }
  return labels
}

export const dayAfternoon_Darams = () => {
  let darams = [
    [
      '也没什么别的想干的。', 
      '还是继续工作吧', 
      stateObj('hair', -35),
      stateObj('work', 1),
      stateObj('money', 100)
    ],
    [
      '帮老板打工根本就没有意义！',
      '你决定学习知识，充实自己，帮自己打工。',
      stateObj('hair', -20),
      stateObj('inte', 5),
    ]
  ]
  if (getVar('玩手机')) {
    darams.push([
      '你开始一边躲避老板的检查一边玩手机。',
      ...randomArr([
        [
          stateObj('charm', 5),
          stateObj('brave', 5)
        ],
        [
          '很好，老板根本没有发现。',
          stateObj('charm', 7),
          stateObj('brave', 7)
        ],
        [
          '今天老板来的次数非常的多。',
          stateObj('charm', 4),
          stateObj('brave', 4)
        ]
      ], [60, 20, 20]),
      ...judge(() => {
        return getVar('inte') > 50
      }, [
        '你发挥了你的智力，更好地躲避了老板的检查。',
        stateObj('charm', 5),
        stateObj('brave', 5)
      ], [
        {
          content: '如果有更多智力的话，也许就能更好的躲避领导的检查了。',
          clas: 'nes-text is-primary'
        }
      ]),
      ...judge(() => {
        return getVar('inte') > 80
      }, [
        '你充分发挥了你的智力，你完美躲避了老板的每一次检查。',
        stateObj('charm', 5),
        stateObj('brave', 5)
      ], [
        '......'
      ])
    ])
  }
  if (getVar('锻炼身体')) {
    darams.push([
      '你站了起来，在办公室里闲逛。',
      ...randomArr([
        [
          stateObj('power', 5),
          stateObj('stamina', 5)
        ],
        [
          stateObj('power', 7),
          stateObj('stamina', 7)
        ],
        [
          stateObj('power', 4),
          stateObj('stamina', 4)
        ]
      ], [60, 20, 20]),
      ...judge(() => {
        return getVar('inte') > 50
      }, [
        '你发挥了你的智力，锻炼效果提升。',
        stateObj('power', 5),
        stateObj('stamina', 5)
      ], [
        {
          content: '有更多智力的话，锻炼效果也许提升。',
          clas: 'nes-text is-primary'
        }
      ]),
      ...judge(() => {
        return getVar('inte') > 80
      }, [
        '你充分发挥了你的智力，锻炼效果进一步提升。',
        stateObj('power', 5),
        stateObj('stamina', 5)
      ], [
        '......'
      ])
    ])
  }
  if (getVar('休息')) {
    darams.push([
      '你趴在桌子上，打算睡一会',
      ...randomArr([
        [
          '领导总是到办公室里巡视，你没睡好。',
          stateObj('hair', 20),
        ],
        [
          stateObj('hair', 40)
        ]
      ], [75, 25]),
      ...judge(() => {
        return getVar('brave') > 50
      }, [
        '你很勇敢，领导来了也不怕。',
        stateObj('hair', 10),
      ], [
        {
          content: '如果更勇敢的话，也许可以睡更久。',
          clas: 'nes-text is-primary'
        }
      ]),
      ...judge(() => {
        return getVar('brave') > 50
      }, [
        '你非常勇敢，甚至带着领导一起睡。',
        stateObj('hair', 10),
      ], [
        '......'
      ])
    ])
  }
  if (getVar('巴结领导')) {
    darams.push([
      '你一下午都跟在领导后面。',
      stateObj('work', 3),
      ...randomArr([
        [
          '......'
        ],
        [
          '他看起来心情不错，给了你一点小费？',
          stateObj('money', 30)
        ]
      ], [75, 25]),
      ...judge(() => {
        return getVar('charm') > 50 && getVar('brave') > 50
      }, [
        '你的魅力与勇敢打动了他。获得更多业绩与小费！',
        stateObj('work', 1),
        stateObj('money', 10),
      ], [
        {
          content: '要是有足够的魅力和勇敢的话，也许能让领导刮目相看？',
          clas: 'nes-text is-primary'
        }
      ]),
      ...judge(() => {
        return getVar('charm') > 80 && getVar('brave') > 80
      }, [
        '你的强大魅力与勇敢让领导折服。获得更多业绩与小费！',
        stateObj('work', 1),
        stateObj('money', 10),
      ], [
        '......'
      ])
    ])
  }
  if (getVar('究极摸鱼')) {
    darams.push([
      '你想起曾今同事的面孔，闭上了眼睛。',
      '在你睁开眼睛的时候，太阳已经快落山了。',
      '这，就是究极的摸鱼，工作时间不过是眨眼之间。',
      stateObj('hair', 20),
      stateObj('money', 50),
      randomState(10),
      randomState(10),
      randomState(10),
      randomState(10),
      randomState(10),
    ])
  }
  return darams
}

export const dayEvening_labels = () => {
  let labels = ['回家吧', '加班', '买本书看看']
  if (getVar('健身房') && getVar('money') >= 200) {
    labels.push('健身房')
  }
  if (getVar('酒吧') && getVar('money') >= 200) {
    labels.push('酒吧')
  }
  if (getVar('美发店') && getVar('money') >= 50) {
    labels.push('美发店')
  }
  if (getVar('工地')) {
    labels.push('工地')
  }
  if (getVar('FF14')) {
    labels.push('FF14')
  }
  return labels
}

export const dayEvening_Darams = () => {
  let darams = [
    [
      '还是早点回家收拾收拾躺床上吧。',
      '你哪里也没去，直接回家了。',
      stateObj('hair', 30)
    ],
    [
      '老板！',
      '我要继续加班！',
      '你这样喊道。',
      '你加班到12点。',
      stateObj('hair', -35),
      stateObj('work', 1),
      stateObj('money', 100),
    ],
    [
      '你到楼下买了两本杂志翻了翻。',
      '还挺有意思。',
      stateObj('money', -50),
      stateObj('inte', 5)
    ],
  ]
  if (getVar('健身房')) {
    let gym = [
      '你进入了健身房，每个器材都玩了玩。',
      '不知道健身效果如何，但你确实练得满头大汗了。',
      stateObj('money', -200),
      stateObj('hair', -30),
      stateObj('power', 10),
      stateObj('stamina', 10),
      ...judge(() => {
        return getVar('charm') > 70 && getVar('brave') > 70
      }, [
        '你出色的魅力和勇气让教练瞩目，他给你提了一些建议。',
        stateObj('power', 5),
        stateObj('stamina', 5),
      ], [
        {
          content: '如果有更多的魅力和勇气的话，就可以有更好的效果了吧。',
          clas: 'nes-text is-primary'
        }
      ]),
      ...judge(() => {
        return special.has('gymTalent')
      }, [
        '你是健身达人！你熟练地使用着这里的器材。效果提高。',
        stateObj('power', 5),
        stateObj('stamina', 5),
      ], [
        {
          content: '训练更多次的话，效果也许会提示。',
          clas: 'nes-text is-primary',
          changeVar: {
            varName: 'gymTime',
            num: 1
          }
        }
      ]),
      ...judge(() => {
        return special.has('gymSuperman')
      }, [
        '你是健身超人！你可以跑跑步机上最高的速度，举起最重配重的杠铃！',
        stateObj('power', 5),
        stateObj('stamina', 5),
      ], [
        '......'
      ])
    ]
    if (getVar('gymTime') > 3 && !special.has('gymTalent')) {
      gym.push({
        content: '由于经常锻炼，变成了健身达人！',
        clas: 'nes-text is-primary',
        setSpecial: {
          name: 'gymTalent',
          num: 1
        }
      })
    }
    if (getVar('gymTime') > 6 && !special.has('gymSuperman')) {
      gym.push({
        content: '由于更经常的锻炼，变成了健身超人！',
        clas: 'nes-text is-primary',
        setSpecial: {
          name: 'gymSuperman',
          num: 1
        }
      })
    }
    darams.push(gym)
  }
  if (getVar('酒吧')) {
    let bar = [
      '你决定去酒吧玩玩。',
      '陌生的人群在闪烁的灯光里狂乱舞动。',
      '虽然你也不知道好玩在哪里，但你还是挤了进去。',
      stateObj('money', -200),
      stateObj('hair', -30),
      stateObj('charm', 10),
      stateObj('brave', 10),
      ...judge(() => {
        return getVar('inte') > 100
      }, [
        '你的智力让你看起来有一种独特的气质，吸引了很多人。',
        stateObj('charm', 5),
        stateObj('brave', 5),
      ], [
        {
          content: '如果有更多的智力的话，就可以有更好的效果了吧。',
          clas: 'nes-text is-primary'
        }
      ]),
      ...judge(() => {
        return special.has('barTalent')
      }, [
        '你是酒吧达人！你懂得该怎么玩！获得更多属性！',
        stateObj('charm', 5),
        stateObj('brave', 5),
      ], [
        {
          content: '如果来更多次的话，也许可以更习惯这里的氛围。',
          clas: 'nes-text is-primary',
          changeVar: {
            varName: 'barTime',
            num: 1
          }
        }
      ]),
      ...judge(() => {
        return special.has('barSuperman')
      }, [
        '你是酒吧超人！你是全场最耀眼的那一个！获得更多属性！',
        stateObj('charm', 5),
        stateObj('brave', 5),
      ], [
        '......'
      ])
    ]
    if (getVar('barTime') > 3 && !special.has('barTalent')) {
      bar.push({
        content: '你变得习惯酒吧的氛围，你是酒吧达人！获得特质“酒吧达人”！',
        clas: 'nes-text is-primary',
        setSpecial: {
          name: 'barTalent',
          num: 1
        }
      })
    }
    if (getVar('barTime') > 6 && !special.has('barSuperman')) {
      bar.push({
        content: '你变得更习惯酒吧的氛围，你是酒吧超人！获得特质“酒吧超人”！',
        clas: 'nes-text is-primary',
        setSpecial: {
          name: 'barSuperman',
          num: 1
        }
      })
    }
    darams.push(bar)
  }
  if (getVar('美发店')) {
    darams.push([
      '你在街边看到了一家美发店。',
      '最近高强度的工作让你掉了不少头发。',
      '也许该保养一下头发了。',
      stateObj('money', -50),
      stateObj('hair', 50),
      ...judge(() => {
        return getVar('day') > 10
      }, [
        '你参加了店里的活动，买一送一。',
        '你的两个头都得到了保养。',
        stateObj('hair', 50),
      ], [
        {
          content: '在第十天之后，店里似乎会举办活动呢。',
          clas: 'nes-text is-primary'
        }
      ])
    ])
  }
  if (getVar('工地')) {
    darams.push([
      '你想了想，为了生活，还是继续努力吧。',
      '你前往了工地，顶着寒风，你开始搬砖。',
      stateObj('work', 1),
      stateObj('power', 3),
      stateObj('stamina', 3),
      ...judge(() => {
        return getVar('stamina') > 90
      }, [
        '你强大的耐力让你没有那么疲劳。',
        stateObj('hair', -10),
      ], [
        {
          content: '如果有更强大的耐力的话，也许就能不那么累了吧。',
          clas: 'nes-text is-primary'
        },
        stateObj('hair', -20),
      ]),
      ...judge(() => {
        return getVar('power') > 90
      }, [
        '你强大的力量让你多搬了两趟。',
        stateObj('money', 200),
      ], [
        {
          content: '如果有更强大的力量的话，也许就能多搬两趟了。',
          clas: 'nes-text is-primary'
        },
        stateObj('money', 100),
      ]),
    ])
  }
  if (getVar('FF14')) {
    darams.push([
      '去哪里玩都没有在家打游戏好玩！',
      stateObj('hair', -10),
      randomState(10),
      randomState(10),
      randomState(10),
      randomState(10),
    ])
  }
  return darams
}

export const afterOneDay = () => {
  return !special.has('超级枕头') ? 
    [
      '时间不早了，你躺倒在床上。',
      '积攒了一天的疲劳让你很快就睡着了......',
      '......',
      '......',
      '......'
    ] :
    [
      '时间不早了，你躺倒在床上。',
      '积攒了一天的疲劳让你很快就睡着了......',
      '但你睡在超级枕头上！超级爽！',
      stateObj('hair', 30),
      '......',
      '......'
    ]
}

export const weekendMorning_labels = () => {
  return ['好好休息', '去加班']
}

export const weekendMorning_darams = () => {
  const base1 = 40
  const base2 = 50
  const base3 = 60
  const darams = [
    [
      '难得的周末，还是在家睡觉吧。',
      '你继续休息。',
      {
        content: '身体的疲劳清空了，头发恢复。',
        clas: 'nes-text is-primary',
        changeVar: {
          varName: 'hair',
          num: 100
        }
      }
    ],
    [
      '今天就要评定了，趁着这个机会，还是再努力一下吧。',
      '你起身前往公司。',
      '周日早上的工作似乎与平时不太一样。',
    ]
  ]
  if (getVar('day') === 7 ) {
    darams[1].push('今天的工作充分发挥了你的智力，你也获得了比平时多一些的业绩。')
    darams[1].push(
      {
        content: '根据你的智力，你获得了' + Math.ceil(Math.max(getVar('inte') - base1, 1) / 10) + '点业绩。',
        clas: 'nes-text is-primary',
        changeVar: {
          varName: 'work',
          num: Math.ceil(Math.max(getVar('inte') - base1, 1) / 10)
        }
      }
    )
  } 
  if (getVar('day') === 14) {
    const state = (getVar('charm') + getVar('brave')) / 2
    darams[1].push('今天的工作充分发挥了你的魅力与勇气，你也获得了比平时多一些的业绩。')
    darams[1].push(
      {
        content: '根据你的魅力与勇气，你获得了' + Math.ceil(Math.max(state - base2, 1) / 10) + '点业绩。',
        clas: 'nes-text is-primary',
        changeVar: {
          varName: 'work',
          num: Math.ceil(Math.max(state - base2, 1) / 10)
        }
      }
    )
  }
  if (getVar('day') === 21) {
    const state = (getVar('power') + getVar('stamina')) / 2
    darams[1].push('今天的工作充分发挥了你的力量与耐力，你获得了比平时多一些的业绩。')
    darams[1].push(
      {
        content: '根据你的力量与耐力，你获得了' + Math.ceil(Math.max(state - base3, 1) / 10) + '点业绩。',
        clas: 'nes-text is-primary',
        changeVar: {
          varName: 'work',
          num: Math.ceil(Math.max(state - base3, 1) / 10)
        }
      }
    )
  }
  return darams
}

export const assessmentPlot = (player, sussesCallback, gameOver) => {
  const overWord = [
    [
      '今天是考核你业绩的日子。',
      '你在公司的会议室坐着，等待最后的结果。',
      '......',
      '你的业绩不够，你没能通过这次考核。',
      '你虽然收到了一定的打击，但你很快就振作了起来',
      '也没什么大不了的，工作可以再找。',
      '你走在返回住所的路上，同时在手机上物色着下一份工作。',
      '你没有注意到向你逼近的大卡车......',
      '{playerName}短暂的一生结束了。',
    ],
    [
      '今天是考核你业绩的日子。',
      '你在公司的会议室坐着，等待最后的结果。',
      '......',
      '你的业绩不够，你没能通过这次考核。',
      '你虽然收到了一定的打击，但你很快就振作了起来',
      '也没什么大不了的，工作可以再找。',
      '你走在返回住所的路上，同时在手机上物色着下一份工作。',
      '你没有注意到向你逼近的大卡车......',
      '......',
      '你睁开眼睛，你发现你居然...还活着？',
      '你回顾四周，发现自己在一个中世界风格的地方。',
      '原来是你穿越到了二次元。',
      '你迫不及待的出门探险，想要邂逅二次元的帅哥美女。',
      '你被1级的哥布林干掉了。',
      '{playerName}短暂的一生结束了。',
    ],
    [
      '今天是考核你业绩的日子。',
      '你在公司的会议室坐着，等待最后的结果。',
      '......',
      '你的业绩不够，你没能通过这次考核。',
      '你受到了打击。',
      '自己居然连这么简单的工作都没法完成。',
      '你非常自责。',
      '你站在大桥上，思考人生。',
      '最终，你还是跳了下去。',
      '{playerName}短暂的一生结束了。',
    ],
    [
      '今天是考核你业绩的日子。',
      '你在公司的会议室坐着，等待最后的结果。',
      '......',
      '你的业绩不够，你没能通过这次考核。',
      '你受到了打击。',
      '自己居然连这么简单的工作都没法完成。',
      '你非常自责。',
      '你站在大桥上，思考人生。',
      '也许也没什么大不了的，工作没了还能再找。',
      '你振作了起来。却没想到，突然吹来一阵大风。',
      '你没能站稳，掉了下去。',
      '{playerName}短暂的一生结束了。',
    ],
  ]
  const pass = [
    '今天是考核你业绩的日子。',
    '你在公司的会议室坐着，等待最后的结果。',
    '......',
    '你通过了这次考核！',
    '太好了，你不禁松了一口气。',
    '你开心地离开了公司。'
  ]
  const workCheck = ['workCheck0', 'workCheck1', 'workCheck2'][getVar('day') / 7 - 1]
  return getVar('work') < getVar(workCheck) ? randomArr(overWord) : pass
}

export const assessment = () => {
  const workCheck = ['workCheck0', 'workCheck1', 'workCheck2'][getVar('day') / 7 - 1]
  console.log(workCheck)
  return getVar('work') >= getVar(workCheck)
}

export const beforeWeekendEvening = () => {
  let p1 =  [
    '下班了，明天就是休息日了。你感到轻松了些。',
    '你到附近的公园逛了逛，你发现有一个可疑的小摊。',
    '你凑近看了看，发现有很多奇奇怪怪的东西。',
  ]
  if (getVar('money') < 500) {
    p1.push('你实在是没什么钱了，你看了看就离开了。')
  } else {
    p1.push('均价500，价格还挺贵。你发现还是有些有用的东西，你决定买一个...')
  }
  return p1
}

export const weekendEvening_labels = () => {
  if (getVar('day') === 6) {
    return ['陈旧的电子书', '陈旧的枕头', '陈旧的电饼铛']
  }
  if (getVar('day') === 13) {
    return ['崭新的易筋经', '崭新的自拍杆', '崭新的存钱罐']
  }
  if (getVar('day') === 20) {
    return ['奇怪的手机', '奇怪的药物', '奇怪的彩票']
  }
}

export const weekendEvening_darams = () => {
  if (getVar('day') < 7) {
    return [
      [
        '电子书和其它两个东西完全不在一个价位上啊。',
        '你毫不犹豫的选择了电子书。',
        '虽然现在的生活中，看书已经不怎么常见了。',
        {
          content: '获得特质“电子书”',
          clas: 'nes-text is-primary',
          setSpecial: {
            name: '电子书',
            num: 1
          }
        },
        stateObj('money', -500)
      ],
      [
        '买个枕头吧，最近比较疲劳，提升下睡眠质量吧。',
        '你选择了枕头，你发现......这个枕头？！不是一般的枕头！',
        '这柔软的手感......这是早已失传的技术！超级枕头！',
        {
          content: '获得特质“超级枕头”',
          clas: 'nes-text is-primary',
          setSpecial: {
            name: '超级枕头',
            num: 1
          }
        },
        stateObj('money', -500)
      ],
      [
        '你想想自己每天早上起床后急急忙忙地就去上班了，也没时间吃点东西。',
        '就买个电饼铛吧。',
        '你可以每天早上做早饭吃了！',
        {
          content: '获得特质“电饼铛”',
          clas: 'nes-text is-primary',
          setSpecial: {
            name: '电饼铛',
            num: 1
          }
        },
        stateObj('money', -500)
      ]
    ]
  }
  if (7 < getVar('day') < 14) {
    return [
      [
        '这个...怎么看都是那种。',
        '只有封面，里面其实是空白的笔记本。',
        '......',
        '你抱着怀疑的态度翻开了它',
        '里面居然密密麻麻得写满了字！居然是真货！',
        {
          content: '你学会了易筋经！',
          clas: 'nes-text is-primary',
          setSpecial: {
            name: '易筋经',
            num: 1
          }
        },
        stateObj('money', -500)
      ],
      [
        '你购买了自拍杆。',
        {
          content: '获得特质“自拍杆”',
          clas: 'nes-text is-primary',
          setSpecial: {
            name: '自拍杆',
            num: 1
          }
        },
        stateObj('money', -500)
      ],
      [
        '存点钱吧，每天这么辛苦，挣来的钱要好好珍惜。',
        '虽然这年头存钱罐可不常见。',
        '用辛苦挣来的钱买了存钱罐！',
        {
          content: '获得特质“存钱罐”',
          clas: 'nes-text is-primary',
          setSpecial: {
            name: '存钱罐',
            num: 1
          }
        },
        stateObj('money', -500)
      ]
    ]
  }
  if (14 < getVar('day') < 21) {
    return [
      [
        '连手机都有卖的吗...',
        '你购买了奇怪的手机。',
        stateObj('money', -500),
        '等等，这个奇怪的APP是？是可以催眠别人的邪恶APP！上面写着只可以使用一次。',
        '这么好的机会，可要好好利用啊。你的心中升起了一股邪念。',
        '领导天天让你加班，你觉得该治治它了！你催眠了你的领导！让它狠狠地...',
        '替你加班！',
        '获得大量业绩。',
        stateObj('work', 15)
      ],
      [
        '你买了来路不明的药丸。',
        stateObj('money', -500),
        '要吃下去吗？你的内心有点犹豫，但不吃的话钱就浪费了。',
        '你吃了下去。',
        '你的视野开始扭曲，头也开始痛了起来，世界仿佛颠倒了过来，你晕了过去。',
        '你醒来的时候已经到家了。',
        '你赶紧检查了一下自己的身体状况，你发现自己没有什么异常。',
        '甚至感觉...轻松了不少。还变英俊了。',
        '身体素质大幅度上升！',
        stateObj('power', 30),
        stateObj('stamina', 30),
        stateObj('inte', 30),
        stateObj('charm', 30),
        stateObj('brave', 30)
      ],
      [
        '你购买了奇怪的彩票。',
        stateObj('money', -500),
        '为什么要买彩票啊，能中奖的话，就不会拿来卖而是直接去兑奖了吧...',
        '但你还是抱着一丝希望查了查。',
        '果然没中。',
        '你失望地叹了口气。',
        '突然，彩票上的数字发生了变化，变成了中奖的号码，金额是...2000。',
        '你感到有些震惊，你赶紧去兑奖，兑换成功了。',
        stateObj('money', 2000),
        '你非常开心，但还是有一丝丝遗憾，反正都可以自己变了，为什么不多中点呢？'
      ]
    ]
  }
}

export const noHair1 = [
  '快看那个人没有头发！',
  '你突然听到了有人在议论。',
  '......你感觉大家的目光都在你身上',
  '该不会说的是......',
  '你赶紧找了面镜子，发现自己的头发全都掉光了。',
  '你震惊得晕倒了过去，醒来的时候已经晚上了。',
  {
    content: '短暂的休息让你恢复了30根头发。',
    clas: 'nes-text is-primary',
    changeVar: {
      varName: 'hair',
      num: 30
    }
  },
  '......'
]

export const noHair2 = [
  '快看那个人没有头发！',
  '你突然听到了有人在议论。',
  '......你感觉大家的目光都在你身上',
  '该不会说的是......',
  '你赶紧找了面镜子，发现自己的头发全都掉光了。',
  '你震惊得晕倒了过去，醒来的时候已经第二天早上了。',
  {
    content: '短暂的休息让你恢复了30根头发。',
    clas: 'nes-text is-primary',
    changeVar: {
      varName: 'hair',
      num: 30
    }
  },
  '......'
]

const lastTurnWork = (s1, s2 = 0) => {
  let state = s1 + s2
  const stage1 = Math.min(100, state) // 4 50:2
  const stage2 = Math.min(50, state -= stage1) // 2.5 50:2.5
  const stage3 = Math.min(50, state -= stage2) // 3.33 50:3.33
  const stage4 = state - stage3 // 50: 5
  return Math.floor(stage1 / 25 + stage2 / 20 + stage3 / 15 + stage4 / 10)
}

export const endGamePlot = () => [
  '终于，你来到了最后的一次考核',
  '这次考核是你能否通过试用期的关键，同时也是最难的一次考核。',
  '最终的考核将从多方面评定你的业绩。',
  '毕竟你需要经常加班，所以首先是对你的体能进行检测！',
  '你拥有{power}点力量，{stamina}点耐力！',
  {
    'content': '你获得了' + lastTurnWork(getVar('power'), getVar('stamina')) + '点奖励业绩！',
    'clas': 'nes-text is-primary',
    'changeVar': {
      'varName': 'work',
      'num': lastTurnWork(getVar('power'), getVar('stamina'))
    }
  },
  '接下来是对工作能力的评定，你拥有{inte}点智力。',
  {
    'content': '你获得了' + lastTurnWork(getVar('inte') * 1.8) + '点奖励业绩！',
    'clas': 'nes-text is-primary',
    'changeVar': {
      'varName': 'work',
      'num': lastTurnWork(getVar('inte') * 1.8)
    }
  },
  '接下来是对人际关系的评定，你拥有{charm}点魅力，{brave}点勇气。',
  {
    'content': '你获得了' + lastTurnWork(getVar('charm') + getVar('brave')) + '点奖励业绩！',
    'clas': 'nes-text is-primary',
    'changeVar': {
      'varName': 'work',
      'num': lastTurnWork(getVar('charm') + getVar('brave'))
    }
  },
  '接下来是对你经济状况的考察，你拥有{money}点金币。',
  {
    'content': '你获得了' + lastTurnWork(getVar('money') * 0.2) + '点奖励业绩！',
    'clas': 'nes-text is-primary',
    'changeVar': {
      'varName': 'work',
      'num': lastTurnWork(getVar('money') * 0.2)
    }
  },
  '对你的考察结束了。',
  '辛苦了！{playerName}！',
  '你的努力工作不会白费！老板已经换了新车！新房子！',
  '而你，就要开始新的工作了！快回去工作吧！',
  '......',
  '根据难度，你获得了难度加成。',
  {
    'content': '你获得了' + Math.ceil(getVar('work') * ((getVar('difficulty') + 1) / 10)) + '点难度奖励！',
    'clas': 'nes-text is-primary',
    'changeVar': {
      'varName': 'work',
      'num': Math.ceil(getVar('work') * (getVar('difficulty') * 3 / 10))
    }
  },
  // TODO:加点结束语
]

export const beforeDayP1 = () => [
  [
    '你昨晚做了个噩梦，你梦到自己被吃掉了。',
    stateObj('hair', -5)
  ],
  [
    '你昨晚做了个噩梦，你梦到自己在外面裸奔。',
    stateObj('charm', -3)
  ],
  [
    '你昨晚做了个噩梦，你梦到自己脑袋被电梯门夹住了。',
    stateObj('inte', -3)
  ],
  [
    '你昨晚做了个噩梦，你梦到自己被判一辈子只能吃热干面。',
    stateObj('stamina', -3)
  ],
  [
    '你昨晚做了个噩梦，你梦到自己被开除了。',
    stateObj('work', -1)
  ],
  [
    '你昨晚做了个梦，你梦到自己成功通过了试用期。',
    stateObj('work', 1)
  ],
  [
    '你昨晚做了个梦，你梦到你是领导，而你现在的领导被你呼来唤去。',
    stateObj('brave', 3)
  ],
  [
    '你昨晚做了个梦，你梦到自己在上高数课。',
    stateObj('inte', 3)
  ],
  [
    '你昨晚做了个梦，你在梦里吃了很多炸鸡。',
    stateObj('hair', 5)
  ],
  [
    '你昨晚做了个梦，你梦到自己加班到凌晨。',
    '淦，你是真的加班到凌晨。',
    stateObj('work', 1)
  ],
  [
    '昨晚睡前你喝了一杯热牛奶。',
    '这使你昨晚睡得很香。',
    stateObj('hair', 5)
  ],
  [
    '昨晚睡前你喝了一杯热牛奶。',
    '奶里有毒！',
    stateObj('stamina', 3)
  ],
  [
    '今天起得比平时早了些。',
    '你用这些时间打理了一下自己。',
    stateObj('charm', 3)
  ],
  [
    '今天起得比平时早了些。',
    '你用这些时间锻炼了一下身体。',
    stateObj('power', 3)
  ],
  [
    '今天起得比平时早了些。',
    '你用这些时间有睡了一觉，成功起得比平时晚了点。',
    stateObj('brave', 3)
  ],
  [
    '今天起得比平时早了些。',
    '你用这些时间拯救了地球，顺便吃了个早饭。',
    randomState(),
    randomState(),
    randomState()
  ],
  [
    '今天起得比平时晚了点。',
    '你顾不上整理一下，不修边幅地出门了。',
    stateObj('charm', -3)
  ],
  [
    '今天起得比平时晚了点。',
    '完全没时间吃早餐，甚至还要跑着上楼。',
    stateObj('stamina', -3)
  ],
  [
    '今天起得比平时晚了点。',
    '一大早就非常疲劳。',
    stateObj('hair', -5)
  ],
  [
    '因为你起得晚了点，引起了美国德克萨斯州的一场龙卷风。',
    '美国向你发出了警告。',
    randomState(-3),
    randomState(-3),
    randomState(-3)
  ],
]

export const beforeDayP1SSR = () => [
  [
    '这里应该是一个稀有事件。',
    '但我还没想好怎么写，总之先给奖励。',
    randomState(5),
    randomState(5),
    randomState(5)
  ]
]

export const beforeDayP2 = () => [
  [
    '11：59，下班前领导突然又加了很多工作。',
    '你不得不加班。',
    stateObj('stamina', 3)
  ],
  [
    '11：59，甲方突然提出了修改的要求。',
    '你不得不推迟吃饭。',
    stateObj('stamina', -3)
  ],
  [
    '11：59，电梯突然坏了。',
    '你不得不饿一会了。',
    stateObj('hair', -5)
  ],
  [
    '11：59。',
    '你早就干完了，好好地休息了下。',
    stateObj('hair', 5)
  ],
  [
    '11：59，甲方突然提出了修改的要求。',
    '你暴打了他，现在没要求了。',
    stateObj('power', 3),
    stateObj('charm', -3)
  ],
  [
    '11：59，甲方突然提出了修改的要求。',
    '你暴打了他，现在没要求也没甲方了。',
    stateObj('power', 3),
    stateObj('charm', -3)
  ],
  [
    '11：59，公司突然来了一群北极熊，原来他们是甲方，你们吵了起来。',
    stateObj('charm', -3)
  ],
  [
    '11：59，公司突然来了一群北极熊，他们吃了几个人就离开了。',
    '它们觉得你很好吃。',
    '公司觉得你还有价值，没有让北极熊吃掉你。',
    stateObj('brave', -3),
    stateObj('charm', 3)
  ],
  [
    '11：59，公司突然来了一群北极熊，他们是来食堂吃饭的。',
    '它们觉得你很好吃。',
    '公司觉得你还有价值，没有让北极熊吃掉你。',
    stateObj('brave', -3),
    stateObj('charm', 3)
  ],
  [
    '11：59，公司突然来了一群北极熊，他们到处挑衅。',
    '你实在看不惯，与北极熊开始了搏斗。',
    ...judge(() => {
      return special.has('北极熊克星')
    }, [
      '你暴打了北极熊，他们灰头土脸地离开了。',
      stateObj('power', 5),
      stateObj('brave', 5),
      stateObj('charm', 5)
    ], [
      '你没打过它们，毕竟它们是熊，你被吃了两口。',
      stateObj('hair', -10),
    ])
  ],
]

export const afterDayP4 = () => [
  [
    '走在回家的路上，你突然感觉很饿。',
    '你决定去吃点肯缺德基，吃得很爽。',
    stateObj('hair', 5),
  ],
  [
    '走在回家的路上，你突然感觉很饿。',
    '你决定喝一杯蜜雪溜冰城，喝得很爽。',
    stateObj('hair', 5),
  ],
  [
    '走在回家的路上，你突然感觉很饿。',
    '你吃了华菜士，肚子…不行了…',
    stateObj('hair', -5),
  ],
  [
    '走在回家的路上，你突然感觉很饿。',
    '你吃了麦当劳。',
    '不要…吃…麦当劳…',
    '你听到了奇怪的声音，你感觉很恐怖。',
    stateObj('hair', -5),
  ],
  [
    '走在回家的小路上，突然跳出来两个蒙面的人！',
    '他们说要想过去的话，就交出身上的钱！',
    ...judge(() => {
      return special.has('大力')
    }, [
      '你力气很大！',
      '你与他们开始战斗！你打败了他们！',
      '还抢走了他们的钱！太坏了！',
      stateObj('money', 100),
      stateObj('brave', 5),
      stateObj('charm', 5)
    ], randomArr([
        [
          '你立刻报警并协助警察将他们缉拿归案。',
          '警察叔叔表扬了你。',
          stateObj('brave', 3),
          stateObj('charm', 3)
        ],
        [
          '你与他们开始了战斗！你被打败了。',
          '只有乖乖交出身上的钱。',
          stateObj('hair', -150),
        ]
      ])
    )
  ],
]
