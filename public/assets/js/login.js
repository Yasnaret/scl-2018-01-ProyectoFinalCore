function registerWithFirebase() {

    const emailValue = userRegister.value
    const passwordValue = passRegister.value

    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            console.log('usuario creado con exito')
            redirectFromLogin()
        })
        .catch((error) => {
            console.log('error de firebase > codigo ' + error.message)
        })
}

// Login
function loginWithFirebase() {

    const emailValue = user.value
    const passwordValue = pass.value

    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then((e) => {
            console.log('usuario inicio sesion con exito')
            redirectFromLogin()
        })
        .catch((error) => {
            console.log('error de firebase > codigo ' + error.message)
        })
}

//Logout
function logoutWithFirebase() {
    firebase.auth().signOut()
        .then(() => {
            console.log('Usuario finalizó su sesión')
        })
        .catch((error) => {
            console.log('Error en firebase > Código > ' + error.code); //nos muestra el tipo de error que produce
            console.log('Error de firebase > Mensaje > ' + error.message);
        });
}

function redirectFromLogin() {
    location.href = "main.html";
}