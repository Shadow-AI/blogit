let swap=document.getElementById("switch");
swap.addEventListener("click", () =>{
    console.log('click')
    if(swap.textContent=="Or Sign Up"){
        swap.textContent="Or Log In";
        
        var scriptin=document.createElement("script");
        scriptin.src="js/validate.js";
        scriptin.id="validation"
        document.getElementsByTagName("body")[0].append(scriptin);
        
    
    document.getElementsByClassName("form")[0].innerHTML=`
                <h4 class="d-flex mb justify-content-center">Sign Up</h4>
                    <form class="sign" method=post>
                        <div class="row form-group">
                            <div class="col-12">
                                <div class="row align-items-baseline align-content-center my-3">
                                    <div class="col-1">
                                        <i class="fad fa-user"></i>
                                    </div>
                                    <input class="col form-control" id="s_authuser" type="text" placeholder="Username">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row align-items-baseline align-content-center my-3">
                                    <div class="col-1">
                                        <i class="fa fa-envelope"></i>
                                    </div>
                                    <input class="col form-control" type="email" id="s_authemail" placeholder="Email">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row align-items-baseline align-content-center my-3">
                                    <div class="col-1">
                                        <i class="fad fa-lock"></i>
                                    </div>
                                    <input class="col form-control" type="password" id="s_authpass" placeholder="Password">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row align-items-baseline align-content-center my-3">
                                    <div class="col-1">
                                        <i class="fad fa-lock"></i>
                                    </div>
                                    <input class="col form-control" type="password" id="s_authconfpass" placeholder="Confirm Password">
                                </div>
                            </div>
                            <div class="col-12 mt-3">
                                <a class="btn btn-success col-8 offset-2" id="s_auth">Register</a>
                            </div>
                            </div>
                        </div>
                    </form>`
    }
    else{
        swap.textContent="Or Sign Up";
        console.log('no click');
        (e=document.getElementById("validation")).parentNode.removeChild(e);
        document.getElementsByClassName("form")[0].innerHTML=`
                <h4 class="d-flex mb justify-content-center">Member Login</h4>
                    <form class="log">
                        <div class="row form-group">
                            <div class="col-12">
                                <div class="row align-items-baseline align-content-center my-3">
                                    <div class="col-1">
                                        <i class="fad fa-user"></i>
                                    </div>
                                    <input class="col form-control" id="authuser" type="text" placeholder="Username">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row align-items-baseline align-content-center my-3">
                                    <div class="col-1">
                                        <i class="fad fa-lock"></i>
                                    </div>
                                    <input class="col form-control" type="password" id="authpass" placeholder="Password">
                                </div>
                            </div>
                            <div class="col-12 mt-3">
                                <a class="btn btn-success col-8 offset-2" id="auth">Login</a>
                            </div>
                            <small class="col-12 text-center mt-2"><a class="link" href="#">Forgot Password</a></small>
                            
                        </div>
                    </form>`;
    }
});