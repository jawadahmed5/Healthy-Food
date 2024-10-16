document.getElementById("userDetail").addEventListener('submit', function(e){
    e.preventDefault()



let localEamil = localStorage.getItem("Email")
let localPassword = localStorage.getItem("Password")

let email =document.getElementById("signinEmail").value
let password =document.getElementById("signinPassword").value

if (localEamil === email && localPassword === password) {

    window.location.href="/index pages/home.html"

}else {
        alert('Invalid data')
    
    }
    
})

