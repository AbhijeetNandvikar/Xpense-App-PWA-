const logOutBtn = document.querySelectorAll('#exit') ;

auth.onAuthStateChanged(user => {
    console.log(user.Sb.uid)
})

logOutBtn[0].addEventListener('click',() => {
    auth.signOut().then(() => {
        location.href = '/index.html'
        console.log('logged out')
    })
})

logOutBtn[1].addEventListener('click',() => {
    auth.signOut().then(() => {
        location.href = '/index.html'
        console.log('logged out')
    })
})