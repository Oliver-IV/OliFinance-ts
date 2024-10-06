
const addIncomeBtn = document.getElementById('addIncomeBtn');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const addIncomeForm = document.getElementById('addIncomeForm');
const addExpenseForm = document.getElementById('addExpenseForm');
const expenseCategory = document.getElementById('expense-category');
const newCategoryInput = document.getElementById('newCategoryInput');
const expenseStepDisplay = document.getElementById('expenseStep');
let currentExpenseStep = 1;

addIncomeBtn.addEventListener('click', () => {
    addIncomeForm.classList.toggle('hidden');
    addExpenseForm.classList.add('hidden');
});

addExpenseBtn.addEventListener('click', () => {
    addExpenseForm.classList.toggle('hidden');
    addIncomeForm.classList.add('hidden');
    resetExpenseForm();
});

expenseCategory.addEventListener('change', (e) => {
    if (e.target.value === 'new') {
        newCategoryInput.classList.remove('hidden');
    } else {
        newCategoryInput.classList.add('hidden');
    }
});

function validateStep(step) {
    switch (step) {
        case 1:
            console.log(selectorExpenseCategory.value !== "new");
            return (expenseCategory.value !== "" && selectorExpenseCategory.value !== "new");
        case 2:
            return inputExpenseName.value.trim() !== "";
        case 3:
            return inputExpenseMount.value > 0;
        case 4:
            return true; 
        default:
            return false;
    }
}

function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    });
}

document.querySelectorAll('[id^="nextStep"]').forEach(button => {
    button.addEventListener('click', () => {
        if (validateStep(currentExpenseStep)) {
            document.getElementById(`expenseStep${currentExpenseStep}`).classList.add('hidden');
            currentExpenseStep++;
            document.getElementById(`expenseStep${currentExpenseStep}`).classList.remove('hidden');
            expenseStepDisplay.textContent = currentExpenseStep;
        } else {
            let errorMessage;
            switch (currentExpenseStep) {
                case 1:
                    errorMessage = "Por favor, seleccione una categoría.";
                    break;
                case 2:
                    errorMessage = "Por favor, ingrese un nombre para el gasto.";
                    break;
                case 3:
                    errorMessage = "Por favor, ingrese un monto válido mayor que cero.";
                    break;
            }
            showError(errorMessage);
        }
    });
});

document.querySelectorAll('[id^="prevStep"]').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById(`expenseStep${currentExpenseStep}`).classList.add('hidden');
        currentExpenseStep--;
        document.getElementById(`expenseStep${currentExpenseStep}`).classList.remove('hidden');
        expenseStepDisplay.textContent = currentExpenseStep;
    });
});

function resetExpenseForm() {
    currentExpenseStep = 1;
    expenseStepDisplay.textContent = currentExpenseStep;
    document.querySelectorAll('[id^="expenseStep"]').forEach(step => {
        step.classList.add('hidden');
    });
    document.getElementById('expenseStep1').classList.remove('hidden');
}