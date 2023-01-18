window.onload = function() { 
    let point;
    let timeout;
    point = 800;
    console.log(point);
    let token = document.getElementById('buttonTop');
    myFunction();
    function myFunction() {
    timeout = setInterval(scrollToUp, 300);
    }
    function scrollToUp() {
        if (point < window.pageYOffset) {
            token.style.visibility = 'visible';
            
        }
        else {
            token.style.visibility = 'hidden';
        }
    }
    let pointed;
    let timer;
    token.addEventListener('click', snaik); 
    function snaik() {
        pointed = window.pageYOffset;
        console.log(pointed);
        scrollToTop();
    }
    function scrollToTop() {
        if(pointed > 0) {
            window.scrollTo(0, pointed);
            pointed = pointed - 100;
            timer = setTimeout(scrollToTop, 100);
        }
        else {
            clearTimeout(timer);
           window.scrollTo(0,0);
         }
        }
    
    }
