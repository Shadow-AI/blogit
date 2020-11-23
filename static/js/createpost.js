function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgdisplay').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#image").change(function(){
    readURL(this);
});

$("document").ready(()=>{
    if($("#imgdisplay").attr('src')===""){
        $("#imgdisplay").css({
            visibility: hidden
        });
    }
    else{
        $("#imgdisplay").css({
            visibility: visible
        });
    }
});

$(".btn").click((e)=>{
    //    console.log($(e.target).children().hasClass("fa-plus"))

    if($(e.target).children().hasClass("fa-plus")){
        //        console.log('plus ->close')
        $(e.target).children().removeClass("fa-plus").addClass("fa-close");
        //        set to change colour
        btnclick(e);
    }
    else{
        $(e.target).children().removeClass("fa-close").addClass("fa-plus");
        //        console.log('plus ->close ->plus')
        btnclick(e);
    }   
});

$("i").click((e)=>{
    //    console.log($(e.target).hasClass("fa-plus"))

    if($(e.target).hasClass("fa-plus")){
        //        console.log('plus ->close')
        $(e.target).removeClass("fa-plus").addClass("fa-close");
        icoClick(e);
    }
    else{
        $(e.target).removeClass("fa-close").addClass("fa-plus");
        //        console.log('plus ->close ->plus')
        icoClick(e);
    }   
});

function btnclick(e){
    var elem=$(e.target);
    colorSwap(elem);
}

function icoClick(e){
    var elem=$(e.target.parentElement);
    colorSwap(elem);
}
//fix this
function colorSwap(elem){
//    console.log(elem.text())
//    console.log(elem.text()=="NSFW" && elem.css("backgroundColor")=="rbga(0, 0, 0, 0)")
//    console.log(elem.css("backgroundColor"))
    //changing colour to colour jquery returns rgb, transparency jquery returns rgba
    //nsfw color swap
    if(elem.text()=="NSFW" && elem.css("backgroundColor")=="rgba(0, 0, 0, 0)"){
        elem.css({
            backgroundColor: "rgb(175, 17, 28)",
            border: "2px solid rgba(255, 255, 255, .3)",
            color: "#e2e2e2"
        });
        $("input[type='checkbox'][name='nsfw']").attr("checked", true);
    }
    else if(elem.text()=="NSFW" && elem.css("backgroundColor")=="rgb(175, 17, 28)"){
        elem.css({
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "2px solid white",
            color: "white"
        });
        $("input[type='checkbox'][name='nsfw']").attr("checked", false);
    }

    //Horror swap
    else if(elem.text()=="Horror" && elem.css("backgroundColor")=="rgba(0, 0, 0, 0)"){
        elem.css({
            backgroundColor: "rgb(77, 0, 0)",
            border: "2px solid rgba(255, 255, 255, .3)",
            color: "#e2e2e2"
        });
        $("input[type='checkbox'][name='horror']").attr("checked", true);
    }
    else if(elem.text()=="Horror" && elem.css("backgroundColor")=="rgb(77, 0, 0)"){
        elem.css({
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "2px solid white",
            color: "white"
        });
        $("input[type='checkbox'][name='horror']").attr("checked", false);
    }

    //Sad swap
    else if(elem.text()=="Sad" && elem.css("backgroundColor")=="rgba(0, 0, 0, 0)"){
        elem.css({
            backgroundColor: "rgb(42, 59, 144)",
            border: "2px solid rgba(255, 255, 255, .3)",
            color: "#e2e2e2"
        });
        $("input[type='checkbox'][name='sad']").attr("checked", true);
    }
    else if(elem.text()=="Sad" && elem.css("backgroundColor")=="rgb(42, 59, 144)"){
        elem.css({
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "2px solid white",
            color: "white"
        });
        $("input[type='checkbox'][name='sad']").attr("checked", false);
    }

    //happy swap
    else if(elem.text()=="Happy" && elem.css("backgroundColor")=="rgba(0, 0, 0, 0)"){
        elem.css({
            backgroundColor: "rgb(255, 231, 0)",
            border: "2px solid rgba(255, 255, 255, .3)",
            color: "black"
        });
        $("input[type='checkbox'][name='happy']").attr("checked", true);
    }
    else if(elem.text()=="Happy" && elem.css("backgroundColor")=="rgb(255, 231, 0)"){
        elem.css({
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "2px solid white",
            color: "white" 
        });
        $("input[type='checkbox'][name='happy']").attr("checked", false);
    }
    
    //love swap
    else if(elem.text()=="Love" && elem.css("backgroundColor")=="rgba(0, 0, 0, 0)"){
        elem.css({
            backgroundColor: "rgb(255, 0, 0)",
            border: "2px solid rgba(255, 255, 255, .3)",
            color: "#e2e2e2"
        });
        $("input[type='checkbox'][name='love']").attr("checked", true);
    }
    else if(elem.text()=="Love" && elem.css("backgroundColor")=="rgb(255, 0, 0)"){
        elem.css({
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "2px solid white",
            color: "white"
        });
        $("input[type='checkbox'][name='love']").attr("checked", false);
    }
    
    //cute swap
    else if(elem.text()=="Cute" && elem.css("backgroundColor")=="rgba(0, 0, 0, 0)"){
        elem.css({
            backgroundColor: "rgb(255, 105, 180)",
            border: "2px solid rgba(255, 255, 255, .3)",
            color: "#e2e2e2"
        });
        $("input[type='checkbox'][name='cute']").attr("checked", true);
    }
    else if(elem.text()=="Cute" && elem.css("backgroundColor")=="rgb(255, 105, 180)"){
        elem.css({
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "2px solid white",
            color: "white"
        });
        $("input[type='checkbox'][name='cute']").attr("checked", false);
    }
}



//validation for frontend here
var title = false;
var image = false;
var content = false;
var tags = false;

function enablePost(){
    if($("#title").val().length >= 3){
        title = true;
    }
    else if($("#title").val().length < 3){
        title = false;
    }
    
    if($("#image").val().length > 0){
        image = true;
    }
    else if($("#image").val().length <= 0){
        image = false;
    }
    
    if($("#content").val().length >= 300){
        content = true;
    }
    else if($("#content").val().length < 300){
        content = false;
    }
    
    //tags
    var tcount = 0;
    var tarray = [0, 0, 0, 0, 0, 0];
    
    var items = $(".tags").find("a");
    for(var i = 0; i < items.length; i++){
        if($(items[i]).css("backgroundColor") != "rgba(0, 0, 0, 0)"){
            tarray[i] = 1;
        }
        else{
            tarray[i] = 0;
        }
    }
    
    tcount = tarray.reduce(function(a, b){
        return a + b;
    }, 0);
    
    if(tcount > 0){
        tags = true;
    }
    else if(tcount == 0){
        tags = false
    }
    
    //whether to enabble post
    if(title && image && content && tags){
        if($("#submit").attr("disabled")){
            $("#submit").removeAttr("disabled");
        }
    }
    else{
        if(!$("#submit").attr("disabled")){
            $("#submit").attr("disabled", "disabled");
        }
    }
}

$("form").keypress(enablePost);
$("*").click(enablePost);

