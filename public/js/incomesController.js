const inputDate1 = document.getElementById('dateInput1') ;
const inputDate2 = document.getElementById('dateInput2') ;
const expensesTableBody = document.getElementById('incomesTableBody');

var renderExpenses = [] ;

inputDate1.value = formatDateToYYYYMMDD(new Date()) ;
inputDate2.value = formatDateToYYYYMMDD(new Date()) ;

function obtenerGastos() {

    if(inputDate1.value && inputDate2.value) {
        var start = inputDate1.value + "T00:00:00";  
        var end = inputDate2.value + "T23:59:59"; 
    } else {
        var start = formatDateStartToISO(new Date()) ;
        var end = formatDateEndToISO(new Date()) ;
    }

    fetch(`/income?start=${start}&&end=${end}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => {
        if(response.ok) {
            response.json().then(data => {
                renderExpenses = data ;
                renderIncomes() ;
            }) ;
        } else {
            return response.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
    }).catch(err => {
        Swal.fire({
            title: "Error",
            text: err.message,
            icon: "error",
            customClass: {
                confirmButton: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
            }
        });
    }) ;

} ;

function renderIncomes() {
    expensesTableBody.innerHTML = '';
    renderExpenses.forEach(income => {
        const row = document.createElement('tr');
        if(!income.title)
            income.title = "Sin Concepto" ;
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">${income.title}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-center">$${income.amount.toFixed(2)}</td>
        `;
        expensesTableBody.appendChild(row);
    });
}

function formatDateStartToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}T00:00:00`;
}

function formatDateEndToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}T23:59:59`;
}

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

const init = () => {
    obtenerGastos() ;

    inputDate1.onchange = () => {
        
        obtenerGastos() ;
    
    } ;

    inputDate2.onchange = () => {

        obtenerGastos() ;

    } ;
} ;

init() ;