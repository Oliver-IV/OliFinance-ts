const addExpenseCategory = document.getElementById("expense-category") ;
const expenseName = document.getElementById("expense-name") ;
const expenseMount = document.getElementById("expense-amount") ;
const expenseNote = document.getElementById("expense-note") ;
const btnAddExpense = document.getElementById("finishExpense") ;

function agregarGasto() {

    fetch("/expense/add",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                category: addExpenseCategory.value,
                title: expenseName.value,
                amount: expenseMount.value,
                note: expenseNote.value,
                date: new Date() 
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

    btnAddExpense.onclick = () => {

        agregarGasto() ;
    
    }

}

function getWeekRange(weeksAgo = 1) {
    const today = new Date();
    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);
  
    const dayOfWeek = today.getDay();
    
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(today.getDate() - diffToMonday - (7 * (weeksAgo - 1)));
    startOfWeek.setHours(0, 0, 0, 0);
  
    const diffToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    endOfWeek.setDate(today.getDate() + diffToSunday - (7 * (weeksAgo - 1)));
    endOfWeek.setHours(23, 59, 59, 999);
  
    return { startOfWeek, endOfWeek };
  }
  
  const { startOfWeek, endOfWeek } = getWeekRange(2);
  console.log('Inicio de la semana:', startOfWeek);
  console.log('Fin de la semana:', endOfWeek);
  

init() ;
