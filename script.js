let scroll;
const htmlElement = document.querySelector("html");
const body = document.body;
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);


function Locomotive() {
     gsap.registerPlugin(ScrollTrigger);

     // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

     const locoScroll = new LocomotiveScroll({
          el: document.querySelector("#main"),
          smooth: true,
          multiplier: 0.75,

     });
     // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
     locoScroll.on("scroll", ScrollTrigger.update);

     // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
     ScrollTrigger.scrollerProxy("#main", {
          scrollTop(value) {
               return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
          }, // we don't have to define a scrollLeft because we're only scrolling vertically.
          getBoundingClientRect() {
               return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
               };
          },
          // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
          pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
     });




     // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
     ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

     // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
     ScrollTrigger.refresh();

}

function initShowHideHeader() {

     const header = select('.navbar-one');

     const showHeaderAnim = gsap.from(header, {
          yPercent: -130,
          paused: false,

          duration: 0.1

     }).progress(1);

     ScrollTrigger.create({
          scroller: '#main',
          start: 'top top',
          end: 99999,
          backgroundColor: "#eeeeee",
          onUpdate: (self) => {
               self.direction === -1 ? showHeaderAnim.play() : showHeaderAnim.reverse();
               let MainNav = document.getElementById('MainNav')

               if (Math.round((self.progress) * 1000) >= 3) {

                    MainNav.classList.add('black-nav')
                    MainNav.classList.add('dummy')

               } else {
                    MainNav.classList.remove('black-nav')
                    MainNav.classList.remove('dummy')
               }
          }
     });



}

function ScrollFunction() {
     Locomotive()

     function initScript() {

          initShowHideHeader();
     }

     function updateLoco() {
          locoScroll.update();
          console.log('loco scroll updated');
     }

     window.onresize = updateLoco;

     window.addEventListener('load', function () {
          initScript();
     });
     gsap.utils.toArray(".scroll").forEach(function (section) {
          var show = section.querySelector(".project");

          gsap.to(show, 1, {
               transform: 'translateX(-100%)',
               scrollTrigger: {
                    scroller: "#main",
                    trigger: section,
                    scrub: 0.1,
                    pin: true,
               },
          });

     });
     gsap.utils.toArray(".thiredScroll").forEach(function (section) {
          var show1 = section.querySelector(".txt2");

          gsap.to(show1, 1, {
               transform: 'translateX(-35%)',
               scrollTrigger: {
                    scroller: "#main",
                    trigger: section,
                    scrub: 0.1,
                    start: 'top 80%',
                    end: 'bottom 80%',

               },
          });
          var show2 = section.querySelector(".txt1");

          gsap.to(show2, 1, {
               transform: 'translateX(35%)',
               scrollTrigger: {
                    scroller: "#main",
                    trigger: section,
                    scrub: 0.1,
                    start: 'top 80%',
                    end: 'bottom 80%',


               },
          });

     });
     gsap.utils.toArray(".connectinTwoImg").forEach(function (section) {


          var img1 = section.querySelectorAll(".imgPart");

          gsap.to(img1, 1, {
               clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

               scrollTrigger: {
                    scroller: "#main",
                    trigger: section,
                    scrub: 0.1,
                    start: 'top top',
                    end: 'bottom top',
                    markers: false,
                    pin: true,

               },
          });


     });
}



$('.collection-of-imges').slick({
     dots: false,
     infinite: true,
     speed: 2000,
     slidesToShow: 1,
     autoplay: true,
     fade: true,
     cssEase: 'linear',
     arrows: false,
     asNavFor: '.slider-txt'
});
$('.slider-txt').slick({
     dots: false,
     infinite: true,
     speed: 2100,
     slidesToShow: 1,
     autoplay: true,

     cssEase: 'linear',
     arrows: false,
     asNavFor: '.collection-of-imges',
     vertical: true,
});

function DropdownManu() {
     let Droupdown = document.getElementById('dropdown')
     Droupdown.classList.toggle('dropdown')
}

function InfoToggeler(e) {
     let MainNav = document.getElementById('MainNav')
     MainNav.classList.remove('Changed-nav')
     let ChangeTxt = document.querySelectorAll("#ChangeTxt")
     let InfoPageNav = document.getElementById('InfoPageNav')
     let navLogo = document.getElementById('navLogo')
     let navBtn = document.querySelectorAll('#navBtn')
     let BtnAnimation = document.getElementById('BtnAnimation')
     ChangeTxt.forEach(element => {
          if (element.style.visibility == 'hidden') {
               element.style.visibility = 'visible'
          } else {
               element.style.visibility = 'hidden'
          }

     });
     navBtn.forEach(element => {
          if (element.style.backgroundColor == 'black') {
               element.style.backgroundColor = 'rgb(128, 128, 128, 0.6)'
          } else {
               element.style.backgroundColor = 'black'
          }

     });
     if (navLogo.style.color == "black") {
          navLogo.style.color = "white"
     } else {
          navLogo.style.color = "black"
     }


     if (InfoPageNav.classList.contains('hidden')) {


          InfoPageNav.classList.remove('hidden')
          MainNav.classList.remove('black-nav')
          e.classList.add("change")
          BtnAnimation.classList.add('on-click-animation')
          document.body.classList.add('body')

     } else {

          InfoPageNav.classList.add('hidden')
          if (MainNav.classList.contains('dummy')) {
               MainNav.classList.add('black-nav')
          } else {
               MainNav.classList.remove('black-nav')
          }
          BtnAnimation.classList.remove('on-click-animation')
          e.classList.remove("change")
          document.body.classList.remove('body')

     }
}

function NavExpander() {
     let MainNav = document.getElementById('MainNav')

          
     if (MainNav.classList.contains('Changed-nav')) {
          MainNav.classList.remove('Changed-nav')

     } else {
          MainNav.classList.add('Changed-nav')
     }


}




function JsMediaQuery(WindowWidth){
     if(WindowWidth.matches){
          ScrollFunction()
     }
}

var WindowWidth = window.matchMedia("(min-width:1100px)")
JsMediaQuery(WindowWidth)

WindowWidth.addEventListener('resize' , function(){
     JsMediaQuery(WindowWidth)
})