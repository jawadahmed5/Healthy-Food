document.getElementById("userDetail").addEventListener('submit', function(e){
    e.preventDefault()



let localEmail = localStorage.getItem("Email")
let localPassword = localStorage.getItem("Password")

let email =document.getElementById("signinEmail").value
let password =document.getElementById("signinPassword").value

if (localEmail === email && localPassword === password) {

    window.location.href="/index pages/home.html"

}else {
        alert('Invalid data')
    
    }
    
})

