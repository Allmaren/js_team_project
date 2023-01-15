window.onload = function() { 
    //window.scroll(x,y)
var scrolled;
var timer;
document.getElementById('buttonTop').onclick = function() {
    scrolled = window.pageYOffset;
    console.log(scrolled);
    //window.scrollTo(0,0);
    scrollToTop();
}
function scrollToTop() {
    if(scrolled > 0) {
        window.scrollTo(0, scrolled);
        scrolled = scrolled - 100;
        timer = setTimeout(scrollToTop, 100);
    }
    else {
        clearTimeout(timer);
       window.scrollTo(0,0);
     }
    }
}
