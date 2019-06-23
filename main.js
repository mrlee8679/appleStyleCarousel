let $lis = $('ul>li')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0
let $content = $('#slidesWrapper').width()
let $button = $('li>a')

makeFakeSlides()
bindEvents()
$slides.css({transform:`translateX(${-($content)}px)`})
$lis.eq(0).addClass('active')

let timer = setInterval(function(){
  if(current +1 >3){
    $lis.removeClass('active')
    $lis.eq(0).addClass('active')
  }else{
    $lis.removeClass('active')
    $lis.eq(current+1).addClass('active')
  }
  
  goToSlide(current+1)
},3000)

$('.container').on('mouseenter',function(){
  window.clearInterval(timer)
}).on('mouseleave',function(){
  timer = setInterval(function(){
    if(current +1 >3){
      $lis.removeClass('active')
      $lis.eq(0).addClass('active')
    }else{
      $lis.removeClass('active')
      $lis.eq(current+1).addClass('active')
    }
    goToSlide(current+1)
  },3000)
})

document.addEventListener('visibilitychange',function(e){
  if(document.hidden){
    window.clearInterval(timer)
  }else{
    timer = setInterval(function(){
      if(current +1 >3){
        $lis.removeClass('active')
        $lis.eq(0).addClass('active')
      }else{
        $lis.removeClass('active')
        $lis.eq(current+1).addClass('active')
      }
      goToSlide(current+1)
    },3000)
  }
})

function makeFakeSlides(){
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length-1).clone(true)
  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}

function bindEvents(){
  $('ul').on('click','li',function(e){
    let $li = $(e.currentTarget)
    let index = $li.index()
    $lis.removeClass('active')
    $lis.eq(index).addClass('active')
    goToSlide(index)
  })
}


function goToSlide (index){
  if (index > $lis.length-1){
    index = 0
  }else if (index<0){
    index.$lis.length-1
  }
  $lis.removeClass('active')
  $lis.eq(index).addClass('active')
  if (current === $lis.length-1 && index === 0){
    $slides.css({transform:`translateX(${-($lis.length+1) * 920}px)`})
      .one('transitionend',function(){
        $slides.hide().offset()
        $slides.css({transform:`translateX(${-(index+1) * 920}px)`}).show()
      })
  }else if (current ===0 && index === $lis.length-1){
    $slides.css({transform:'translateX(0px)'})
      .one('transitionend',function(){
        $slides.hide().offset()
        $slides.css({transform:`translateX(${-(index+1) * 920}px)`}).show()
    })
  }else{
    $slides.css({transform:`translateX(${-(index+1) * 920}px)`})
  }
  current = index
  
}