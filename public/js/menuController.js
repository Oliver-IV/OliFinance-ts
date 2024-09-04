const selectorCategoriaGasto = document.getElementById("expense-category") ;
const nombreGasto = document.getElementById("expense-name") ;
const montoGasto = document.getElementById("expense-amount") ;
const notaGasto = document.getElementById("expense-note") ;
const btnAgregarGasto = document.getElementById("finishExpense") ;

function agregarGasto() {

    fetch("/gasto",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                categoria: selectorCategoriaGasto.value,
                titulo: nombreGasto.value,
                monto: montoGasto.value,
                nota: notaGasto.value,
                fecha: new Date() 
            } )
        }
    ).then(response => {
        if(response.ok) {
            Swal.fire("Gasto agregado!", "Se ha agregado el gasto con exito", "success").then(() => {
                window.location.reload() ;
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

    btnAgregarGasto.onclick = () => {

        agregarGasto() ;
    
    }

}

init() ;
