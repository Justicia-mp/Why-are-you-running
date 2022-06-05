import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.02
const CLOUD_INTERVAL_MIN = 2000
const CLOUD_INTERVAL_MAX = 8000
const worldElem = document.querySelector("[data-world]")

let nextCloudTime
export function setupCloud() {
  nextCloudTime = CLOUD_INTERVAL_MIN
  document.querySelectorAll("[data-cloud]").forEach(cloud => {
    cloud.remove()
  })
}

export function updateCloud(delta, speedScale) {
  document.querySelectorAll("[data-cloud]").forEach(cloud => {
    incrementCustomProperty(cloud, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(cloud, "--left") <= -100) {
      cloud.remove()
    }
  })

  if (nextCloudTime <= 0) {
    createCloud()
    createCloud1()
    createCloud2()
    nextCloudTime =
      randomNumberBetween(CLOUD_INTERVAL_MIN, CLOUD_INTERVAL_MAX) / speedScale
  }
  nextCloudTime -= delta
}

export function getCloudRects() {
  return [...document.querySelectorAll("[data-cloud")].map(cloud => {
    return cloud.getBoundingClientRect()
  })
}

function createCloud() {
  const cloud = document.createElement("img")
  cloud.dataset.cloud = true
  cloud.src = "imgs/cloud0.png"
  cloud.classList.add("cloud")
  setCustomProperty(cloud, "--left", Math.floor(Math.random() * 100))
  worldElem.append(cloud)
}

function createCloud1() {
  const cloud = document.createElement("img")
  cloud.dataset.cloud = true
  cloud.src = "imgs/cloud1.png"
  cloud.classList.add("cloud1")
  setCustomProperty(cloud, "--left",Math.floor(Math.random() * 300))
  worldElem.append(cloud)
}

function createCloud2() {
  const cloud = document.createElement("img")
  cloud.dataset.cloud = true
  cloud.src = "imgs/cloud3.png"
  cloud.classList.add("cloud2")
  setCustomProperty(cloud, "--left",Math.floor(Math.random() * 500))
  worldElem.append(cloud)
}



function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
