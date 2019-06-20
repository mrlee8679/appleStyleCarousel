let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({transform:'translateX(-720px)'})

function makeFakeSlides(){
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length-1).clone(true)
  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}

function bindEvents(){
  if(current === $buttons.length-1 && index === 0 ){
    $slides.css({transform:`translateX(${-(-720px)})`})
  }
}