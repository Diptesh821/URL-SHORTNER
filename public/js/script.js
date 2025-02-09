document.getElementById("signout-btn").addEventListener("click", async()=>{
    try{
        const response=await fetch("/logout",{
            method:"POST",
            credentials:"include",
        });
        if(response.ok){
            window.location.href="/login";
        }
        else{
            console.error("Failed to log out");
        }
    }
    catch(err){
        console.error("error during logout:",err);
    }
})
