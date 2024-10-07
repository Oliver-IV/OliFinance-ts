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
        Swal.fire({
            title: "Error",
            text: err.message,
            icon: "error",
            customClass: {
                confirmButton: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
            }
        });
    }) ;

}

function renderExpenses() {
    expensesTableBody.innerHTML = '';

    const isMobile = window.innerWidth < 768;

    expenses.forEach(expense => {
        const row = document.createElement('tr');
        
        if(!expense.note)
            expense.note = "Sin Nota" ;

        if (isMobile) {
            row.innerHTML = `
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center">${expense.title}</td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center"><span class="px-1 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${expense.category.name}</span></td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-medium text-center">$${expense.amount.toFixed(2)}</td>
                <td class="sm:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">${expense.note}</td>
            `;
        } else {
            row.innerHTML = `
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center">${expense.title}</td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center"><span class="px-1 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${expense.category.name}</span></td>
                <td class="sm:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">${expense.note}</td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-medium text-center">$${expense.amount.toFixed(2)}</td>
            `;
        }

        expensesTableBody.appendChild(row);
    });
}

function renderFilteredExpenses() {
    expensesTableBody.innerHTML = '';

    const isMobile = window.innerWidth < 768;

    filteredExpenses.forEach(expense => {
        const row = document.createElement('tr');

        if (isMobile) {
            row.innerHTML = `
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center">${expense.title}</td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center"><span class="px-1 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${expense.category.name}</span></td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-medium text-center">$${expense.amount.toFixed(2)}</td>
                <td class="sm:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">${expense.note}</td>
            `;
        } else {
            row.innerHTML = `
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center">${expense.title}</td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center"><span class="px-1 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${expense.category.name}</span></td>
                <td class="sm:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">${expense.note}</td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-medium text-center">$${expense.amount.toFixed(2)}</td>
            `;
        }

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

window.addEventListener('resize', () => {
    if(!filter) {
        renderExpenses() ;
    } else {
        renderFilteredExpenses() ;
    }
});