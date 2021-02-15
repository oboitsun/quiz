const hardCodedQuestions = {
  VISIONARY: [
    'I see possibilities in impossible situations',
    'Innovative ideas come to me easily',
    'I like to find better ways to do things',
    'I think in broad concepts',
    'Managing details is frustrating for me',
    'I often think, “just go for it!”',
    'I’ll do something even if I know I’ll fail',
  ],

  STRUCTURIST: [
    'I am a planner',
    'I am good at executing a plan',
    'Im a builder',
    'I create procedures',
    'I enjoy managing the details of a process',
  ],
  ENHANCER: [
    'I’m inspired to create by the ideas of others',
    'I enjoy decorating or accessorizing',
    'I prefer to collaborate than solve a problem on my own',
    'I like being given a concept to improve',
    'It is easy for me to suggest novel improvements',
  ],

  PROTECTOR: [
    'I am a good proofreader',
    'Following procedures is most important',
    'I see risks in situations',
    'I am a good troubleshooter',
    'I advise others in areas where caution is required',
  ],

  PROMOTER: [
    'I can create stories on the fly',
    'I am a relationship builder',

    'I match resources to needs',
    'I am very persuasive',
    'I enjoy selling',
  ],
}
let qTitle = document.getElementById('qTitle')
let qContent = document.getElementById('qContent')
let qContainer = document.getElementById('qContainer')
let bContainer = document.getElementById('bContainer')
let quizChart = document.getElementById('quizChart')
let chartLegends = document.getElementById('chartLegends')
let chartLetter = [...document.getElementsByClassName('chart-letter')]
let quizFinish = document.getElementById('quizFinish')
let fCategory = document.getElementById('fCategory')
let button = [...document.getElementsByClassName('button')]
let qIndex = 0
function StartQuiz(qObj) {
  let questionArr = []

  quizChart.style.height = '0'
  chartLegends.style.display = 'none'
  qContainer.style.display = 'flex'
  bContainer.style.display = 'flex'
  quizFinish.style.display = 'none'
  for (let val of Object.values(qObj)) {
    questionArr.push(val)
  }
  questionArr = questionArr.flat()
  questionArr = questionArr.sort((q) => Math.random() - 0.5)
  return questionArr
}
function questionChanges(i, qArray) {
  if (i === 0) {
    let whichIs = Object.keys(hardCodedQuestions).find((key) => {
      let qst = hardCodedQuestions[key].indexOf(questionArray[qIndex])
      if (qst > -1) return key
    })
    let currBar = bars.find((it) => it.type === whichIs)
    button.forEach((it) => (it.style.background = currBar.color))
  }
  document.getElementById('qTitle').textContent = `Question ${i + 1} of ${
    qArray.length
  }`
  document.getElementById('qContent').textContent = qArray[i]

  if (i >= qArray.length) {
    showfinishiQuiz()
  }
}
function questionInit(i, qArray, event) {
  let whichIs = Object.keys(hardCodedQuestions).find((key) => {
    let qst = hardCodedQuestions[key].indexOf(questionArray[qIndex])
    if (qst > -1) return key
  })
  let currBar = bars.find((it) => it.type === whichIs)
  button.forEach((it) => (it.style.background = currBar.color))

  if (event && whichIs) currBar.setHeight(event.target.value)
  if (qIndex < qArray.length) {
    questionChanges(i + 1, qArray)
    return ++qIndex
  }
}

function showfinishiQuiz() {
  qContainer.style.display = 'none'
  quizChart.height = '440px'
  chartLegends.style.display = 'flex'
  chartLegends.style.visibility = 'visible'
  bContainer.style.display = 'none'
  quizChart.style.height = '100%'
  quizChart.style.maxHeight = '350px'
  quizFinish.style.display = 'flex'
  let getTop = bars.sort((a, b) => b.maxHeight - a.maxHeight)
  document.getElementById(
    'topBar'
  ).textContent = `Your personality type is: \n\n ${getTop[0].type}`

  bars.forEach((it) => it.showHeight())
}

const Bar = function (id, type, color) {
  const bar = {}
  bar.color = color
  bar.type = type
  bar.el = document.getElementById(id)
  bar.maxHeight = 5
  bar.setHeight = function (h) {
    this.maxHeight = this.maxHeight + h * 2
  }
  bar.showHeight = function () {
    this.el.style.display = 'block'
    this.el.style.height = '100%'
    this.el.style.maxHeight = `${this.maxHeight}%`
  }
  return bar
}
const questionArray = StartQuiz(hardCodedQuestions)
const bVis = Bar('bar-vis', 'VISIONARY', '#fad0c4')
const bEnhance = Bar('bar-enhance', 'ENHANCER', '#a1c4fd')
const bProtect = Bar('bar-protect', 'PROTECTOR', '#f6d365')
const bPromote = Bar('bar-promote', 'PROMOTER', '#f093fb')
const bStr = Bar('bar-str', 'STRUCTURIST', '#38f9d7')
let bars = [bVis, bEnhance, bStr, bProtect, bPromote]

document.addEventListener('click', (event) => {
  switch (event.target.className) {
    case 'button':
      questionInit(qIndex, questionArray, event)
    default:
      break
  }
})
questionChanges(qIndex, questionArray)
