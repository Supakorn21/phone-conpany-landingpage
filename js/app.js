//Page Transition Animations

let indexEnter = () => {
let tl = gsap.timeline()
tl.fromTo('.logo',{
    x: -200,
    opacity: 0,
},{
    x: 0,
    opacity: 1,
    delay: .5,
    duration: 1.3
})
.fromTo('.menu',{
    x: 200,
    opacity: 0,
},{
    x: 0,
    opacity: 1,
    delay: .5,
    duration: 1.3
},
">-1.8")
.fromTo('.info-section h1',{
    x: 0,
    y: 100,
    opacity: 0,
},{
    x: 0,
    y: 0,
    opacity: 1,
    duration: 1.3
})
.addLabel("h1Show")
.fromTo('.girl',{
    height: 0,
},{
    height: 600,
    duration: 1.4,
    ease: "power2.inOut"
},
">-.5"
)
.fromTo('.boy',{
    height: 0,
},{
    height: 600,
    duration: 1.4,
    ease: "power2.inOut"
},
">-1"
)
.fromTo('.shape1',{
   scale: .1,
   opacity: 0
},{
    scale: 1,
    ease: "power2.inOut",
    opacity: 1
},
">-1"
)
.fromTo('.shape3',{
   opacity: 0
},{
    ease: "power2.inOut",
    opacity: .6,
    duration: .5
},
">.1"
)
.fromTo('.shape3',{
    x: -50,
    y: 500,
},{
    y: 465,
    repeat: -1,
    duration: 2,
    ease: "sine.inOut",
    yoyo: true
}
)
.fromTo('.shape2',{
   opacity: 0
},{
    ease: "power2.inOut",
    opacity: .3,
    duration: .5
},
">-2.1"
)
.fromTo('.shape2',{
    x: 550,
    y: -150,
},{
    y: -185,
    repeat: -1,
    duration: 2,
    ease: "sine.inOut",
    yoyo: true
}
)
.fromTo('.info-section h4',{
    x: 0,
    y: 50,
    opacity: 0,
},{
    x: 0,
    y: 0,
    opacity: 1,
    duration: .6
}, "h1Show")
.fromTo('.call-actions',{
    x: 0,
    y: 50,
    opacity: 0,
},{
    x: 0,
    y: 0,
    opacity: 1,
    duration: .6
}, )
};

let delay = (n) => {
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n)
    })
};
let loadingLeave = () => {
    let tl = gsap.timeline();
    tl.fromTo(".loading-bg", {
        y:'100%'
    },{
        y: 0,
        duration: 2
    })
};

let loadingEnter = () => {
    let tl = gsap.timeline();
    tl.fromTo(".loading-bg", {
        y:0
    },{
        y: '100%',
        duration: 2
    })
};

let galleryEnter = () => {
    let tl = gsap.timeline();
    tl.fromTo('.logo',{
        x: -200,
        opacity: 0,
    },{
        x: 0,
        opacity: 1,
        delay: .5,
        duration: 1.3
    })
    .fromTo('.menu',{
        x: 200,
        opacity: 0,
    },{
        x: 0,
        opacity: 1,
        delay: .5,
        duration: 1.3
    },
    ">-2")
    .fromTo('.white-bg ',
    {
        y: 50,
        opacity: 0
    },{
        y: 0,
        opacity: 1,
        duration: .8,
        ease: 'power1.inOut'
    })
    .fromTo('.white-bg ul li',
    {
        y: 50,
        opacity: 0
    },{
        y: 0,
        opacity: 1,
        duration: .2,
        stagger: .1,
        ease: 'power1.inOut'
    });
}

let aboutEnter = () => {
    let tl = gsap.timeline()
    tl.fromTo('.logo',{
        x: -200,
        opacity: 0,
    },{
        x: 0,
        opacity: 1,
        delay: .5,
        duration: 1.3
    })
    .fromTo('.menu',{
        x: 200,
        opacity: 0,
    },{
        x: 0,
        opacity: 1,
        delay: .5,
        duration: 1.3
    },
    ">-1.8")
    .fromTo('.info-section h1',{
        x: 0,
        y: 100,
        opacity: 0,
    },{
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.3
    })
}


barba.init({
    sync: true,
    transitions: [
        {
            name: 'page-wipe',
            async leave(data){
                let done = this.async();
                console.log('Leaving Page Animation');
                loadingLeave();
                await delay(1500);
                done();
            },
            async enter(data){
                loadingEnter();
                console.log('Entering Page Animation');
            }
        },
        {
            name: 'gallery-transition',
            from: {
                namespace: ['home', 'about']
            }, 
            to: {
                namespace: ['gallery']
            },
            async leave(data){
                let done = this.async();
                console.log('Leaving Page Animation');
                loadingLeave();
                await delay(1500);
                done();
            },
            async enter(data){
                loadingEnter();
                galleryEnter();
                console.log('Entering Page Animation');
            }
        }
    ],
    views: [{
        namespace: 'gallery',
        afterEnter(data) {
          loadingEnter();
          galleryEnter();
        }
      },
      {
        namespace: 'index',
        afterEnter(data) {
          loadingEnter();
          indexEnter();
        }
      },
      {
        namespace: 'about',
        afterEnter(data) {
        loadingEnter();
        aboutEnter();
        }
      }]
});


// Scroll Animation


let tlServicesScroll = new gsap.timeline({
    onUpdate: debugPercentage
})
function debugPercentage(){
    console.log(tlServicesScroll.progress())
}
tlServicesScroll.fromTo('#main-services', {
    x: '100%',
}, {
    x: 0
})
let serviceElement = document.querySelector('#main-services');

let homeController = new ScrollMagic.Controller();

let serviceScene = new ScrollMagic.Scene({
    triggerElement: '#main-services',
    triggerHook: 1,
    duration: serviceElement.offsetHeight
})
.setTween(tlServicesScroll)
.addIndicators()
.addTo(homeController)