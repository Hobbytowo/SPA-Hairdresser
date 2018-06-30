const nav = document.querySelector('.menu')
const menuScreen = document.querySelector('.menu__screen')
const hamburger = document.querySelector('.menu__mobile')

// menu opacity

const changeOpacity = () => {
  let scrollY = window.pageYOffset
  if (scrollY > 5) {
    nav.classList.add('menu--opacity')
  } else {
    nav.classList.remove('menu--opacity')
  }
}

window.addEventListener('scroll', changeOpacity)

// hamburger menuLi

hamburger.addEventListener('click', e => {
  menuScreen.classList.toggle('rolledMobile')
  hamburger.classList.toggle('rollingHamburger')
})

// smooth scroll

const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) { return c / 2 * t * t + b }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

const requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

const scrollTo = (to, callback, duration) => {
  const move = amount => {
    document.documentElement.scrollTop = amount
    document.body.parentNode.scrollTop = amount
    document.body.scrollTop = amount
  }

  const position = () => {
    return document.documentElement.scrollTop ||
      document.body.parentNode.scrollTop ||
      document.body.scrollTop
  }

  const start = position()
  const change = to - start
  let currentTime = 0
  const increment = 20

  const animateScroll = () => {
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    move(val)
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof (callback) === 'function') {
        callback()
      }
    }
  }
  animateScroll()
}

if (menuScreen.style.display !== 'none') {
  menuScreen.addEventListener('click', e => {
    e.preventDefault()
    const href = e.target.hash
    const selectedSection = document.querySelector(href)
    const bodyRect = document.body.getBoundingClientRect()
    const elemRect = selectedSection.getBoundingClientRect()
    const offset = elemRect.top - bodyRect.top

    scrollTo(offset, null, 300)

    if (menuScreen.classList[1] === 'rolledMobile') {
      menuScreen.classList.toggle('rolledMobile')
      hamburger.classList.toggle('rollingHamburger')
    }
  })
}
