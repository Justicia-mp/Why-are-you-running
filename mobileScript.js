import { updateGround, setupGround } from "./ground.js"
import { updateWoman, setupWoman, getWomanRect, setWomanLose } from "./mobileWoman.js"
import { updateCar, setupCar, getCarRects } from "./mobileCar.js"
import { updatePalm, setupPalm } from "./palm.js"
import { updateCloud, setupCloud } from "./clouds.js"
import { updateMoney, setupMoney, getMoneyRects } from "./mobileMoney.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const moneyElem = document.querySelector("[data-money-name]")
const highScoreElem = document.querySelector("[data-highscore]")
const startScreenElem = document.querySelector("[data-start-screen]")
const startScreen2Elem = document.querySelector("[data-start-screen2]")
const endScreenElem = document.querySelector("[data-end-screen]")


setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("click", handleStart, { once: true })

let money
let lastTime
let speedScale
let score
let endScreen = document.querySelector("[data-end-screen]")
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  
  const delta = time - lastTime
  updateMoney(delta, speedScale)
  updateGround(delta, speedScale)
  updateWoman(delta, speedScale)
  updateCar(delta, speedScale)
  updatePalm(delta, speedScale)
  updateSpeedScale(delta)
  audio.BACK.play()
  updateScore(delta)
  updateCloud(delta,speedScale)
  if (checkLose()) return handleLose()
  if (checkMoney()) return moneyColl(setupMoney())

  lastTime = time
  window.requestAnimationFrame(update)
}


function checkLose() {
  const womanRect = getWomanRect()
  return getCarRects().some(rect => isCollision(rect, womanRect))

}

function checkMoney() {
    const womanRect = getWomanRect()
    return getMoneyRects().some(rect => isCollision(rect, womanRect))
}

function moneyColl() {
    setWomanLose()
    window.requestAnimationFrame(update)
    upMon()
    function soundCoin(){
      var audio = new Audio('audio/coin.wav');
      audio.play();
      audio.volume = 0.05;
     
    }
    soundCoin()
}
  
function upMon(){
    money += 10
    moneyElem.textContent = money
}


function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
  
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

let highScore
let offHighScore


function updateHScore(){
  highScore = localStorage.getItem('score')
  highScoreElem.textContent =Math.floor(highScore)  
  offHighScore = highScoreElem.textContent
}


function updateScore(delta) {
  let officialScore=score += delta * 0.01
  scoreElem.textContent = Math.floor(officialScore)
  localStorage.setItem('score', officialScore)
}
console.log(localStorage)
console.log(highScore)

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  money = 0
  moneyElem.textContent = "0"
  highScore = 0
  setupMoney()
  updateHScore()
  setupGround()
  setupWoman()
  setupCar()
  setupPalm()
  setupCloud()
  startScreenElem.classList.add("hide")
  startScreen2Elem.classList.add("hide")
  endScreenElem.classList.add("hide")
  
  window.requestAnimationFrame(update)
}

function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
      worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
      worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }
  
    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
  }
  

function handleLose() {
  setWomanLose()

  setTimeout(() => {
    document.addEventListener("click", handleStart, { once: true })
   
    endScreenElem.classList.remove("hide")
    endScreen.textContent ="GAME OVER"
  }, 100)

  function soundEnd(){
    var audio = new Audio('audio/War.mp3');
    audio.play();
    audio.volume = 0.1;
    audio.preload = 'auto';
  }
  soundEnd()


}



var audio = {
  BACK: new Audio ('audio/WAYR.mp3')

}