
const addIncomeBtn = document.getElementById('addIncomeBtn');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const addIncomeForm = document.getElementById('addIncomeForm');
const addExpenseForm = document.getElementById('addExpenseForm');
const expenseCategory = document.getElementById('expense-category');
const newCategoryInput = document.getElementById('newCategoryInput');
const expenseStepDisplay = document.getElementById('expenseStep');
const incomeStep1 = document.getElementById('incomeStep1');
const incomeStep2 = document.getElementById('incomeStep2');
const nextIncomeStep = document.getElementById('nextIncomeStep');
const prevIncomeStep = document.getElementById('prevIncomeStep');
const finishIncome = document.getElementById('finishIncome');
const incomeAmount = document.getElementById('income-amount');
const incomeNote = document.getElementById('income-note');
const stepIndicator = document.getElementById('incomeStep');
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

function updateExpenseFormView() {
    expenseStepDisplay.textContent = currentExpenseStep;
    
    [expenseStep1, expenseStep2, expenseStep3, expenseStep4].forEach(step => {
        step.classList.add('hidden');
    });
    
    document.getElementById(`expenseStep${currentExpenseStep}`).classList.remove('hidden');
}

function validateExpenseStep(step) {
    switch (step) {
        case 1:
            return expenseCategory.value !== "" && expenseCategory.value !== "new";
        case 2:
            const expenseName = document.getElementById('expense-name');
            return expenseName.value.trim() !== "";
        case 3:
            const expenseAmount = document.getElementById('expense-amount');
            return expenseAmount.value > 0;
        case 4:
            return true; // Note is optional
        default:
            return false;
    }
}

function showExpenseError(message) {
    Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
        customClass: {
            confirmButton: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
        }
    });
}

document.querySelectorAll('[id^="nextStep"]').forEach(button => {
    button.addEventListener('click', () => {
        if (validateExpenseStep(currentExpenseStep)) {
            currentExpenseStep++;
            updateExpenseFormView();
        } else {
            let errorMessage;
            switch (currentExpenseStep) {
                case 1:
                    errorMessage = "Por favor, seleccione una categoría válida.";
                    break;
                case 2:
                    errorMessage = "Por favor, ingrese un nombre para el gasto.";
                    break;
                case 3:
                    errorMessage = "Por favor, ingrese un monto válido mayor que cero.";
                    break;
            }
            showExpenseError(errorMessage);
        }
    });
});

document.querySelectorAll('[id^="prevStep"]').forEach(button => {
    button.addEventListener('click', () => {
        if (currentExpenseStep > 1) {
            currentExpenseStep--;
            updateExpenseFormView();
        }
    });
});

function resetExpenseForm() {
    currentExpenseStep = 1;
    document.getElementById('expense-category').value = "";
    document.getElementById('expense-name').value = "";
    document.getElementById('expense-amount').value = "";
    document.getElementById('expense-note').value = "";
    newCategoryInput.classList.add('hidden');
    updateExpenseFormView();
}

expenseCategory.addEventListener('change', (e) => {
    if (e.target.value === 'new') {
        newCategoryInput.classList.remove('hidden');
    } else {
        newCategoryInput.classList.add('hidden');
    }
});

let currentIncomeStep = 1;

// Next step
nextIncomeStep.addEventListener('click', function () {
    if (validateIncomeAmount()) {
        currentIncomeStep = 2;
        updateIncomeFormView();
    }
});

// Previous step
prevIncomeStep.addEventListener('click', function () {
    currentIncomeStep = 1;
    updateIncomeFormView();
});

// Helper functions
function validateIncomeAmount() {
    const amount = parseFloat(incomeAmount.value);
    if (isNaN(amount) || amount <= 0) {
        Swal.fire({
            title: "Error",
            text: "Por favor, ingrese un monto valido",
            icon: "error",
            customClass: {
                confirmButton: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
            }
        });
        return false;
    }
    return true;
}

function updateIncomeFormView() {
    stepIndicator.textContent = currentIncomeStep;
    if (currentIncomeStep === 1) {
        incomeStep1.classList.remove('hidden');
        incomeStep2.classList.add('hidden');
    } else {
        incomeStep1.classList.add('hidden');
        incomeStep2.classList.remove('hidden');
    }
}

function resetIncomeForm() {
    currentIncomeStep = 1;
    incomeAmount.value = '';
    incomeNote.value = '';
    updateIncomeFormView();
}

updateExpenseFormView();