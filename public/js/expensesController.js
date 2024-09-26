const inputDate1 = document.getElementById('dateInput1') ;
const inputDate2 = document.getElementById('dateInput2') ;
const selectorExpenseCategory = document.getElementById('categorySelect');
const expensesTableBody = document.getElementById('expensesTableBody');

var expenses = [] ;
var filteredExpenses = [] ;
var filter = null;

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

    fetch(`/expense?start=${start}&&end=${end}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => {
        if(response.ok) {
            response.json().then(data => {
                expenses = data ;
                renderExpenses() ;
                if(filter) {
                    filterCategory() ;
                }
            }) ;
        } else {
            return response.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
    }).catch(err => {
        Swal.fire("Error", err.message, "error") ;
    }) ;

} ;

function obtenerCategoriasUsuario() {

    fetch("/category", 
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => {
        if(response.ok) {
            response.json().then(data => {

                selectorExpenseCategory.innerHTML = '';

                const opt = document.createElement("option") ;
                
                opt.value = "" ;
                opt.textContent = "Seleccionar Categoria" ;
                selectorExpenseCategory.appendChild(opt) ;

                // Itera sobre los datos para añadir las opciones dinámicamente
                data.forEach(data => {
                    const option = document.createElement('option');
                    option.value = data.name;
                    option.textContent = data.name;
                    selectorExpenseCategory.appendChild(option);
                });
            });
        } else {
            return response.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
    }).catch(err => {
        Swal.fire("Error", err.message, "error") ;
    }) ;

}

function renderExpenses() {
    expensesTableBody.innerHTML = '';
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2">${expense.title}</td>
            <td class="py-2">${expense.category.name}</td>
            <td class="py-2">${expense.note}</td>
            <td class="text-right py-2">$${expense.amount.toFixed(2)}</td>
        `;
        expensesTableBody.appendChild(row);
    });
}

function renderFilteredExpenses() {
    expensesTableBody.innerHTML = '';
    filteredExpenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2">${expense.title}</td>
            <td class="py-2">${expense.category.name}</td>
            <td class="py-2">${expense.note}</td>
            <td class="text-right py-2">$${expense.amount.toFixed(2)}</td>
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

function filterCategory() {
    filter = selectorExpenseCategory.value ;
    if (filter) {
        console.log("Si hay filtro pa");
        filteredExpenses = [];
        expenses.forEach(expense => {
            if (expense.category.name == filter) {
                filteredExpenses.push(expense);
            }
        });

        renderFilteredExpenses();
    } else {
        renderExpenses();
    }
    
}

const init = () => {
    obtenerGastos() ;
    obtenerCategoriasUsuario();

    inputDate1.onchange = () => {
        
        obtenerGastos() ;
    
    } ;

    inputDate2.onchange = () => {

        obtenerGastos() ;

    } ;

    selectorExpenseCategory.onchange = () => {

        filterCategory() ;

    } ;
} ;

init() ;