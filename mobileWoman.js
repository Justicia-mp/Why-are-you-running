import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const womanElem = document.querySelector("[data-woman]")
const JUMP_SPEED = 0.5
const GRAVITY = 0.00215
const WOMAN_FRAME_COUNT = 2
const FRAME_TIME = 100

let btnJump = document.getElementById("jump-btn")

let isJumping
let womanFrame
let currentFrameTime
let yVelocity
export function setupWoman() {
  isJumping = false
  womanFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(womanElem, "--bottom", 0)
  btnJump.removeEventListener("click", mobJump)
  btnJump.addEventListener("click", mobJump)
}

export function updateWoman(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getWomanRect() {
  return womanElem.getBoundingClientRect()
}

export function setWomanLose() {
  womanElem.src = "imgs/woman-lose.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    womanElem.src = `imgs/woman-stationary.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    womanFrame = (womanFrame + 1) % WOMAN_FRAME_COUNT
    womanElem.src = `imgs/woman-run-${womanFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(womanElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(womanElem, "--bottom") <= 0) {
    setCustomProperty(womanElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}


function mobJump(){
  if (btnJump == "click" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
  audio.JUMP.play()

}

var audio = {
  JUMP: new Audio ('audio/jump.mp3')

}

function toggleMute() {
  for (var i in audio) {
    audio[i].muted = !audio[i].muted;
  }
}


const soundBtn = document.getElementById("muteBtn"); 
soundBtn.addEventListener("click", toggleMute)