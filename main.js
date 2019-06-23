let $lis = $('ul>li')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
bindEvents()
$slides.css({ transform: 'translateX(-920px)' })
$lis.eq(0).addClass('active')

let timer = setInterval(function () {
  addActive(current)
  goToSlide(current + 1)
}, 2000)

$('.container').on('mouseenter', function () {
  window.clearInterval(timer)
}).on('mouseleave', function () {
  timer = setInterval(function () {
    addActive(current)
    goToSlide(current + 1)
  }, 2000)
})

document.addEventListener('visibilitychange', function (e) {
  if (document.hidden) {
    window.clearInterval(timer)
  } else {
    timer = setInterval(function () {
      addActive(current)
      goToSlide(current + 1)
    }, 2000)
  }
})



function makeFakeSlides() {
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length - 1).clone(true)
  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}

function addActive() {
  if (current + 1 > $lis.length-1) {
    $lis.removeClass('active')
    $lis.eq(0).addClass('active')
  } else {
    $lis.removeClass('active')
    $lis.eq(current + 1).addClass('active')
  }
}

function bindEvents() {
  $('ul').on('click', 'li', function (e) {
    let $li = $(e.currentTarget)
    let index = $li.index()
    $lis.removeClass('active')
    $lis.eq(index).addClass('active')
    goToSlide(index)
  })
}

function goToSlide(index) {
  if (index > $lis.length - 1) {
    index = 0
  } else if (index < 0) {
    index = $lis.length - 1
  }
  if (current === $lis.length - 1 && index === 0) {
    $slides.css({ transform: `translateX(${-($lis.length + 1) * 920}px)` })
      .one('transitionend', function () {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(${-(index + 1) * 920}px)` }).show()
      })
  } else if (current === 0 && index === $lis.length - 1) {
    $slides.css({ transform: 'translateX(0px)' })
      .one('transitionend', function () {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(${-(index + 1) * 920}px)` }).show()
      })
  } else {
    $slides.css({ transform: `translateX(${-(index + 1) * 920}px)` })
  }
  current = index
}