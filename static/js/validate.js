var fields =document.querySelectorAll("input");

var regex={
    s_authuser:/^[a-z]+$/i,
    s_authemail:/\S{3,}@\S{5,}\.(?:\S{3,}|\S+\.\S{2,})/i,
    s_authpass:/(\d*[A-Z]*\w*[A-Z]*\d*){6,}/,
}


document.getElementById("s_authuser").addEventListener("keyup", () =>{
    if (!regex.s_authuser.test(document.getElementById("s_authuser").value)){
        console.log('no')
        document.getElementById("formerror").innerHTML="Invalid Username";
        $("#s_authuser").parent().removeClass("correct-info").addClass("wrong-info");
    }
    else{
        document.getElementById("formerror").innerHTML="";
        $("#s_authuser").parent().removeClass("wrong-info").addClass("correct-info");
    }
});

document.getElementById("s_authemail").addEventListener("keyup", () =>{
    if (!regex.s_authemail.test(document.getElementById("s_authemail").value)){
        console.log('no')
        document.getElementById("formerror").innerHTML="Invalid Email";
        $("#s_authemail").parent().removeClass("correct-info").addClass("wrong-info");
    }
    else{
        document.getElementById("formerror").innerHTML="";
        $("#s_authemail").parent().addClass("correct-info").removeClass("wrong-info");
    }
});

document.getElementById("s_authpass").addEventListener("keyup", () =>{
    if (!regex.s_authpass.test(document.getElementById("s_authpass").value)){
        console.log('no')
        document.getElementById("formerror").innerHTML="Invalid Password";
        $("#s_authpass").parent().removeClass("correct-info").addClass("wrong-info");
    }
    else{
        document.getElementById("formerror").innerHTML="";
        $("#s_authpass").parent().addClass("correct-info").removeClass("wrong-info");
    }
});

document.getElementById("s_authconfpass").addEventListener("keyup", () =>{
    if (document.getElementById("s_authpass").value != document.getElementById("s_authconfpass").value){
        console.log('no');
        document.getElementById("formerror").innerHTML="Passwords don't match";
        $("#s_authconfpass").parent().removeClass("correct-info").addClass("wrong-info");
    }
    else{
        document.getElementById("formerror").innerHTML="";
        $("#s_authconfpass").parent().addClass("correct-info").removeClass("wrong-info");
    }
});