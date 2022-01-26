import { bondingSelect } from '../../assets/utils.js'

export const preloadPlot0 = [
  '？？？：你好？',
  '？？？：喂？听得到吗？同学？',
  '{playerName}：嗯？',
  '你是{playerName}',
  '你回过神来，你对面的桌子后坐着一排穿着正装的秃头中年大叔。',
  '你环顾四周，发现你正坐在一间会议室里。',
  '会议室的墙上挂着横幅“XX公司校园招聘会”',
  '而你，正坐在那群大叔的对面。',
  '你在参加这次面试。',
  '你刚才似乎是走神了，对面的大叔在等待你的回复。',
]

export const preloadPlot1_labels = [
  '圆个场',
  '讲个冷笑话',
  '辱骂他们' ,
]

export const preloadPlot1_darams = [
  ['你决定圆个场'],
  [
    '{playerName}：你知道医生怎么说吗？',
    '{playerName}：doctor',
    '……',
    '沉默',
    {
      content: "被突然的沉默伤害到了，头发-5。",
      clas: "nes-text is-error",
      changeVar: {
        varName: "hair",
        num: -5
      }
    },
    {
      content: "沉默锻炼了你的耐力。",
      clas: "nes-text is-primary",
      changeVar: {
        varName: "stamina",
        num: 1
      }
    },
    '真烂啊，你自己都看不下去了，你只能圆个场。',
  ],
  [
    '你感到一股力量充满了全身',
    '{playerName}：傻逼！',
    '你很惊讶自己怎么会这么说。',
    '对面显然更惊讶，对面试有所不满的人他们也见过，却没见过如此突然的。',
    {
      content: "你很害怕，头发-5。",
      clas: "nes-text is-error",
      changeVar: {
        varName: "hair",
        num: -5
      }
    },
    {
      content: "你很勇哦。勇气上升。",
      clas: "nes-text is-primary",
      changeVar: {
        varName: "brave",
        num: 1
      }
    },
    '但对方不愧是社会人，他们很快就冷静了下来，甚至给了你一个台阶。',
    '大叔：你说什么？我刚才没听清。'
  ]
]

const preloadPlot2 = [
  '{playerName}：抱歉，第一次面试，我有点紧张。',
  '大叔：没事，紧张是正常的。',
  '对方接受了你的说法。',
  '大叔：好，接下来做一下自我介绍吧。',
  '{playerName}：好的，我……',
  '你开始回想起你那不长也不短的人生。' ,
  '小学之前的事情都忘记了，大概从6岁开始的事情你还有印象。',
  '你记得...'
]

const preloadPlot3 = [
  '大叔：嗯，好，我已经清楚了。',
  '他不再看桌上的简历，抬起头来，对你露出非常官方的微笑。',
  '大叔：你回去等通知吧。',
  '你离开了公司。',
  '两天后，你收到了正式入职的通知。',
  '试用期三个月，这家公司是你居住的城市内对你而言最好的选择了。',
  '为了成功转正你下定决心，要在工作中好好展现自己。',
  '入职前一天晚上，你早早地就睡了。'
]

export const preloadPart0 = (player, selector, next) => {
  player.value.setDaram(preloadPlot0, () => {
    preloadPart1(player, selector, next)
  })
}
const preloadPart1 = (player, selector, next) => {
  bondingSelect(
    preloadPlot1_labels,
    preloadPlot1_darams,
    player,
    selector,
    () => {
      preloadPart2(player, selector, next)
    }
  )
}
const preloadPart2 = (player, selector, next) => {
  player.value.setDaram(preloadPlot2, next)
}