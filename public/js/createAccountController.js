const inputEmail = document.getElementById("email") ;
const inputPassword = document.getElementById("password") ;
const inputRepeatedPassword = document.getElementById("repeatedPassword") ;
const inputName = document.getElementById("name") ;
const inputLastName = document.getElementById("last_name") ;
const btnCreateAccount = document.getElementById("btnCreateAcc") ;

function login() {
    fetch("/auth/createAccount", 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                email: inputEmail.value,
                password: inputPassword.value,
                repeatedPassword: inputRepeatedPassword.value,
                name: inputName.value,
                last_name: inputLastName.value
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

init() ;