const selectorExpenseCategory = document.getElementById("expense-category") ;
const inputExpenseName = document.getElementById("expense-name") ;
const inputExpenseMount = document.getElementById("expense-amount") ;
const inputIncomeMount = document.getElementById("income-amount") ;
const inputNote = document.getElementById("expense-note") ;
const btnAddExpense = document.getElementById("finishExpense") ;
const btnAddIncome = document.getElementById("addIncomeSubmit") ;
const btnAddNewCategory = document.getElementById("saveNewCategory") ;
const selectorDateFilter = document.getElementById("date-filter") ;
const walletText = document.getElementById("wallet") ;
const expenseAmountText = document.getElementById("expensesAmount") ;
const incomeAmountText = document.getElementById("incomesAmount") ;
const inputNewCategory = document.getElementById("new-category") ;
const btnLogout = document.getElementById("logoutBtn") ;

var expenses = [] ;
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
                note: inputNote.value,
                date: formatDateToISOString(new Date())
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
                        date: new Date() 
                    }
                ) 
            }
        ).then(response => {
            if(response.ok) {
                Swal.fire("Ingreso agregado!", "Se ha agregado el ingreso con exito", "success").then(() => {
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
    } else {
        Swal.fire("Error", "Ingresa un monto", "error") ;
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
            Swal.fire("Categoria agregada!", "Se ha agregado la categoria con exito", "success").then(() => {
                newCategoryInput.classList.add('hidden');
                resetExpenseForm();
                obtenerCategoriasUsuario() ;
            }) ;
        }else {
            return response.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
    }).catch(err => {
        Swal.fire("Error", err.message, "error") ;
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
                expenses = data ;
                mostrarGraficaDeGastos() ;
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
        Swal.fire("Error", err.message, "error") ;
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
        Swal.fire("Error", err.message, "error") ;
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
        Swal.fire("Error", err.message, "error") ;
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
        Swal.fire("Error", err.message, "error") ;
    }) ;

}

function mostrarGraficaDeGastos() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const categoriesMap = new Map(); 

    expenses.forEach(expense => {
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
        const color = `hsl(${Math.random() * 360}, 100%, 75%)`;  // Colores aleatorios en formato HSL
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

async function logout() {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas cerrar la sesión?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        fetch("/logout", 
            {
                method: "POST"
            }
        ).then(response => {
            if(response.ok) {
                window.location.href = "/" ;
            } else {
                Swal.fire("Error", "Hubo un error al cerrar sesión...", "error") ;
            }
        }).catch(err => {
            Swal.fire("Error", "Hubo un error al cerrar sesión...", "error") ;
        }) ;
    }
}


const init = () => {

    obtenerCategoriasUsuario() ;
    obtenerGastos() ;
    obtenerCarteraUsuario() ;
    obtenerMontoGastosUsuario() ;
    obtenerMontoIngresosUsuario() ;

    btnAddIncome.onclick = () => {

        agregarIngreso() ;

    } ;

    btnAddExpense.onclick = () => {

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

    btnLogout.onclick = async () => {

        await logout() ;

    } ;

}


  

init() ;
