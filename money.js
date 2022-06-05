import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const MONEY_INTERVAL_MIN = 1600
  const MONEY_INTERVAL_MAX = 8000
  const worldElem = document.querySelector("[data-world]")
  
  let nextMoneyTime
  export function setupMoney() {
    nextMoneyTime = MONEY_INTERVAL_MIN
    document.querySelectorAll("[data-money]").forEach(money => {
      money.remove()
    })
  }
  
  export function updateMoney(delta, speedScale) {
    document.querySelectorAll("[data-money]").forEach(money => {
      incrementCustomProperty(money, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(money, "--left") <= -100) {
        money.remove()
      }
    })
  
    if (nextMoneyTime <= 0) {
      createMoney()
      nextMoneyTime =
        randomNumberBetween(MONEY_INTERVAL_MIN, MONEY_INTERVAL_MAX) / speedScale
    }
    nextMoneyTime -= delta
  }
  
  export function getMoneyRects() {
    return [...document.querySelectorAll("[data-money")].map(money => {
      return money.getBoundingClientRect()
    })
  }
  
 export function createMoney() {
    const money = document.createElement("img")
    money.dataset.money = true
    money.src = "imgs/money2.png"
    money.classList.add("money")
    setCustomProperty(money, "--left", 100)
    setCustomProperty(money, "--bottom", 10)
    worldElem.append(money)
    if(money && Image.style){
      money.style.bottom = Math.floor(Math.random(size) * 100)
    }
  }
  
  
  
  function size(max) {
    return Math.floor(Math.random() * max);
  }
  
  
  
  
  
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  