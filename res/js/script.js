let title = document.querySelector('.title');
let stick_nav = document.querySelector('#stick-nav');
let gallery_modal = document.querySelector("#gallery-model");
let modal_header = document.querySelector('.modal-header');
let gallery_img = document.querySelector('#gallery-img');
let social_link = document.querySelector(".social-links");
let current_year = document.querySelector('#current-year');

let titles = [
    "Natural phtographer ",
    "Video Editor ",
   
];
let title_count = 0;
let set_text = (text, el) => {
    new Promise(
        function(resolve, reject) {
            var text_len = el.innerText.length;
            for(var skat in el.innerText){
                setTimeout(() => {el.innerText = el.innerText.slice(0, -(0 + 1));}, 50*skat)
            }
        setTimeout(() => {resolve()}, 70 * text_len + 10)
    }).then(
        function() {
            for (let ind in text){
                setTimeout(() => {
                    var new_text = el.innerText.slice(0, -1) + text[ind] + '|';
                    el.innerText = new_text;
                }, 50*ind);
            }
            
        }, (err) => {console.log(err);}
    ).then(
        function() {
            setTimeout(() => {
                set_text(titles[title_count++ % titles.length], title);
            }, 3000)
        }
    )
    
}

window.addEventListener('DOMContentLoaded', () => {
    var date = new Date();
    current_year.innerText = date.getFullYear();
    set_text(titles[title_count++ % titles.length], title);
})
window.addEventListener('scroll', function(e){
    var scroll_pos = document.body.scrollTop || document.documentElement.scrollTop;
    if (scroll_pos > 5900) {
        social_link.style.display = "none";
    } else {
        social_link.style.display = "block";
    }
    if (scroll_pos > 420){
        if (stick_nav.classList.contains('hide')){
            stick_nav.style.opacity = "0";
            stick_nav.classList.remove('hide');
        } else {
            var opc;
            if (scroll_pos < 500) {opc = ((scroll_pos - 400) / 451) % 1;}
            else {opc = 1;stick_nav.classList.add('stick-nav');
            }
            stick_nav.style.opacity = String(opc);
        }
    } else {
        if (!stick_nav.classList.contains('hide')){stick_nav.classList.add('hide');}
    }
})


let photo_slider;

document.querySelectorAll(".modal-triger").forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        var target = el.dataset['target'];
        var imgs = gallery[target];
        var gallery_counter = 0;
        gallery_img.src = imgs[(gallery_counter++) % imgs.length]
        photo_slider = setInterval(()=> {
            gallery_img.src = imgs[(gallery_counter++) % imgs.length]
            setTimeout(() => {
                gallery_img.animate([
                        {opacity: 1},
                        {opacity: 0.8},
                        {opacity: 0.6},
                        {opacity: 0.4},
                        {opacity: 0.2},
                        {opacity: 0}
                    ], {"duration": 1510, "easing": "ease-out"});
            }, 3500)
        }, 5000)
        modal_header.innerText = target;
        gallery_modal.style.display = "block";

    })
})

document.querySelectorAll('.close').forEach((el) => {
    el.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.parentElement.style.display = "none";
        clearInterval(photo_slider);
    })
})
window.onclick = function(e) {
      if (e.target == gallery_modal) {
        gallery_modal.style.display = "none";
        clearInterval(photo_slider);
      }
}