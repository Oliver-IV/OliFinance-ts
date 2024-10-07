const selectorExpenseCategory = document.getElementById("expense-category") ;
const inputExpenseName = document.getElementById("expense-name") ;
const inputExpenseMount = document.getElementById("expense-amount") ;
const inputIncomeMount = document.getElementById("income-amount") ;
const inputExpenseNote = document.getElementById("expense-note") ;
const inputIncomeNote = document.getElementById("income-note") ;
const btnAddExpense = document.getElementById("finishExpense") ;
const btnAddIncome = document.getElementById("finishIncome") ;
const btnAddNewCategory = document.getElementById("saveNewCategory") ;
const selectorDateFilter = document.getElementById("date-filter") ;
const walletText = document.getElementById("wallet") ;
const expenseAmountText = document.getElementById("expensesAmount") ;
const incomeAmountText = document.getElementById("incomesAmount") ;
const inputNewCategory = document.getElementById("new-category") ;
const panelIncomes = document.getElementById("panelIncomes") ;
const panelExpenses = document.getElementById("panelExpenses") ;

var renderExpenses = [] ;
let expenseChart ;

function agregarGasto() {

    fetch("/expense/add",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                category: selectorExpenseCategory.value,
                title: inputExpenseName.value,
                amount: inputExpenseMount.value,
                note: inputExpenseNote.value,
                date: formatDateToISOString(new Date())
            } )
        }
    ).then(response => {
        if(response.ok) {
            Swal.fire({
                title: "¡Gasto agregado!",
                text: "Se ha agregado el gasto con éxito",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
                }
            }).then(() => {
                resetExpenseForm() ;
                resetWalletExpenseAndIncomeMount() ;
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

}

function agregarIngreso() {

    if(inputIncomeMount.value) {
        fetch("/income/add", 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        amount: inputIncomeMount.value, 
                        date: formatDateToISOString(new Date()),
                        title: incomeNote.value
                    }
                ) 
            }
        ).then(response => {
            if(response.ok) {
                Swal.fire({
                    title: "¡Ingreso agregado!",
                    text: "Se ha agregado el ingreso con éxito",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
                    }
                }).then(() => {
                    resetIncomeForm() ;
                    resetWalletExpenseAndIncomeMount() ;
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
    } else {
        Swal.fire({
            title: "Error",
            text: "Ingresa un monto",
            icon: "error",
            customClass: {
                confirmButton: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
            }
        });
    }
    
}

function agregarCategoria() {

    fetch("/category/add", 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: inputNewCategory.value})
        }
    ).then(response => {
        if(response.ok) {
            Swal.fire({
                title: "¡Categoría Agregada!",
                text: "Se ha agregado la categoría con éxito",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
                }
            }).then(() => {
                newCategoryInput.classList.add('hidden');
                obtenerCategoriasUsuario() ;
            }) ;
        }else {
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

function obtenerGastos() {

    const { start, end } = getWeekRange(getWeekRangeFromDateFilter(selectorDateFilter.value)) ;

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
                renderExpenses = data ;
                mostrarGraficaDeGastos() ;
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

function obtenerCarteraUsuario() {

    const { start, end } = getWeekRange(getWeekRangeFromDateFilter(selectorDateFilter.value)) ;

    fetch(`/user/wallet?start=${start}&&end=${end}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => {
        if(response.ok) {
            response.json().then(data => {
                walletText.innerText = `$${data.amount}` ;
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

}

function obtenerMontoGastosUsuario() {

    const { start, end } = getWeekRange(getWeekRangeFromDateFilter(selectorDateFilter.value)) ;

    fetch(`/expense/amount?start=${start}&&end=${end}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => {
        if(response.ok) {
            response.json().then(data => {
                expenseAmountText.innerText = "$" + data.amount ;
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

}

function obtenerMontoIngresosUsuario() {

    const { start, end } = getWeekRange(getWeekRangeFromDateFilter(selectorDateFilter.value)) ;

    fetch(`/income/amount?start=${start}&&end=${end}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => {
        if(response.ok) {
            response.json().then(data => {
                incomeAmountText.innerText = "$" + data.amount ;
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

}

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
                const select = document.getElementById('expense-category');

        // Limpia las opciones existentes antes de añadir nuevas
                select.innerHTML = '';

                // Agregar la primera opción "Seleccionar categoría"
                const firstOption = document.createElement('option');
                firstOption.value = "";
                firstOption.textContent = "Seleccionar categoría";
                select.appendChild(firstOption);

                // Itera sobre los datos para añadir las opciones dinámicamente
                data.forEach(data => {
                    const option = document.createElement('option');
                    option.value = data.name;
                    option.textContent = data.name;
                    select.appendChild(option);
                });

                // Agregar la última opción "Agregar nueva categoría"
                const lastOption = document.createElement('option');
                lastOption.value = "new";
                lastOption.textContent = "Agregar nueva categoría";
                select.appendChild(lastOption);
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

function mostrarGraficaDeGastos() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const categoriesMap = new Map(); 

    renderExpenses.forEach(expense => {
        const category = expense.category.name;
        const amount = expense.amount;

        if (categoriesMap.has(category)) {
            categoriesMap.set(category, categoriesMap.get(category) + amount);
        } else {
            categoriesMap.set(category, amount);
        }
    });

    const categories = Array.from(categoriesMap.keys());
    const expensesAmounts = Array.from(categoriesMap.values());

    if (expenseChart) {
        expenseChart.destroy();
    }

    // Crear gráfico
    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: expensesAmounts, 
                backgroundColor: generarColores(categories.length), 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 10,
                        font: {
                            size: 10
                        }
                    }
                },
                title: {
                    display: false
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
}


function generarColores(cantidad) {
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        const color = `hsl(${Math.random() * 360}, 100%, 75%)`;
        colores.push(color);
    }
    return colores;
}

function getWeekRange(weeksAgo = 1) {
    const today = new Date();
    const start = new Date(today);
    const end = new Date(today);
  
    const dayOfWeek = today.getDay();
    
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    start.setDate(today.getDate() - diffToMonday - (7 * (weeksAgo - 1)));
    start.setHours(0, 0, 0, 0);
  
    const diffToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    end.setDate(today.getDate() + diffToSunday - (7 * (weeksAgo - 1)));
    end.setHours(23, 59, 59, 999);
  
    return { start, end };
  }

  function getWeekRangeFromDateFilter() {
    switch (selectorDateFilter.value) {
        case "this-week":
            return 1 ; 
        case "last-week" :
            return 2 ;
        case "two-weeks-ago":
            return 3 ;
        case "three-weeks-ago":
            return 4 ;
        case "four-weeks-ago":
            return 5 ;
        default:
            Swal.fire("Error", "Filtro no valido", "error") ;
            break;
    }
  }

  function formatDateToISOString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function resetWalletExpenseAndIncomeMount() {
    obtenerGastos() ;
    obtenerCarteraUsuario() ;
    obtenerMontoGastosUsuario() ;
    obtenerMontoIngresosUsuario() ;
}

const init = () => {

    obtenerCategoriasUsuario() ;
    obtenerGastos() ;
    obtenerCarteraUsuario() ;
    obtenerMontoGastosUsuario() ;
    obtenerMontoIngresosUsuario() ;

    btnAddIncome.onclick = () => {

        addIncomeForm.classList.add("hidden") ;
        agregarIngreso() ;

    } ;

    btnAddExpense.onclick = () => {

        addExpenseForm.classList.add("hidden") ;
        agregarGasto() ;
    
    } ;

    btnAddNewCategory.onclick = () => {

        agregarCategoria() ;

    }

    selectorDateFilter.onchange = () => {

        obtenerGastos() ;
        obtenerMontoGastosUsuario() ;
        obtenerMontoIngresosUsuario() ;

    } ;

    panelExpenses.onclick = () => {

        window.location.href = "/menu/expenses" ;

    } ;

    panelIncomes.onclick = () => {

        window.location.href = "/menu/incomes" ;

    }

}

init() ;
