document.getElementById("userDetail").addEventListener('submit', function (event) {
    event.preventDefault();
 

let userEmail = document.getElementById("signupEmail").value
let userPassword = document.getElementById("signupPassword").value
// let formData = document.getElementById("userDetail").value

console.log(userEmail,userPassword);

if(userEmail && userPassword){

    localStorage.setItem('Email', userEmail)
    localStorage.setItem('Password', userPassword)


window.location.href = "/index pages/signin.html"
}


})
