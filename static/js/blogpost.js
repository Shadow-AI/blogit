$("body").css({
        opacity: .01
    });

$("document").ready(function(){
    
    $("body").animate({
        opacity: 1
    }, 1500);
    $(".img.img-rounded").animate({
        left: "0%"
    },1500);
    
    // $(".img.img-rounded").tooltip({content:"Planet"});
});