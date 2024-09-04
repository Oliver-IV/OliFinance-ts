const inputEmail = document.getElementById("email") ;
const inputPassword = document.getElementById("password") ;
const inputRepeatedPassword = document.getElementById("repeatedPassword") ;
const btnCreateAccount = document.getElementById("btnCreateAcc") ;

function login() {
    fetch("/auth/agregar", 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                email: inputEmail.value,
                password: inputPassword.value,
                repeatedPassword: inputRepeatedPassword.value
            } )
        }
    ).then(response => {
        if(response.ok) {
            Swal.fire("Cuenta Creada", "¡Se ha creado tu cuenta con exito!", "success").then(response =>{
                window.location.href = "/" ;
            }) ;
        } else {
            return response.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
    }).catch(err => {
        Swal.fire("Error", err.message, "error") ;
    }) ;
}

const init = () => {

    btnCreateAccount.onclick = () => {

        login() ;

    } ;

}