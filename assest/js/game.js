//Animación - Introducción Título
const tl = gsap.timeline({
    defaults: {
        ease: "power1.out"
    }
});

tl.to(".texto", {
    y: "0%",
    duration: 1,
    stagger: 0.20
});
tl.to(".slider", {
    y: "-100%",
    duration: 1.5,
    delay: 0.7
});
tl.to(".introduccion", {
    y: "-100%",
    duration: 1
}, "-=1");
tl.fromTo(".gameCont", {
    opacity: 0
}, {
    opacity: 1,
    duration: 0.3
});