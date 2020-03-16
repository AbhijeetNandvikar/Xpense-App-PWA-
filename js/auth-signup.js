const ref = document.querySelectorAll('.sign-up div input') ;
const btn = document.getElementById('submit')
const msg = document.querySelector('#err') ;
console.log(msg)
console.log(ref) ;


btn.addEventListener('click',(event) => {
    event.preventDefault() ;
    const email = ref[0].value ;
    const pass = ref[1].value ;
    console.log(email,pass)

    auth.createUserWithEmailAndPassword(email,pass).then( cred => {
        console.log(cred.user) ;
        ref[0].value = `` ;
        ref[1].value = `` ;
        location.href = '/main.html'
    })
    .catch(err => {
        msg.innerHTML = `${err.message}` ;
        ref[0].value = `` ;
        ref[1].value = `` ;
    })
})
