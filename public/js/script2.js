let errorSpan=document.getElementById("passwordError");
document.getElementById("password").addEventListener("input",function(){
    let password=this.value;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!regex.test(password)){
        errorSpan.textContent="Password must be at least 8 characters long, with atleast one uppercase letter, one lowercase letter,one number, and one special character."
    }
    else{
        errorSpan.textContent="";
    }
})