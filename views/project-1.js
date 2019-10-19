//scroll responsive navbar start
$(document).scroll(function() {
  navbarScroll();
});
  
  function navbarScroll() {
    var y = window.scrollY;
    if (y > 10) {
      $('.navbar').addClass('navshadow');
    } else if (y < 10) {
      $('.navbar').removeClass('navshadow');
    }
  }
//scroll responsive navbar end


//section4 auto slide image start
$("#section4-img > div:gt(0)").hide();

setInterval(function() { 
  $('#section4-img > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#section4-img');
},  3000);
//section4 auto slide image end
