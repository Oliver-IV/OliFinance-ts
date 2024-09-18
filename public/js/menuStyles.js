// JavaScript to handle interactivity
document.addEventListener('DOMContentLoaded', function() {
    const addIncomeBtn = document.getElementById('addIncomeBtn');
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const addIncomeForm = document.getElementById('addIncomeForm');
    const addExpenseForm = document.getElementById('addExpenseForm');
    const expenseCategory = document.getElementById('expense-category');
    const newCategoryInput = document.getElementById('newCategoryInput');
    const expenseStepDisplay = document.getElementById('expenseStep');
    let currentExpenseStep = 1;

    // Toggle income form
    addIncomeBtn.addEventListener('click', () => {
        addIncomeForm.classList.toggle('hidden');
        addExpenseForm.classList.add('hidden');
    });

    // Toggle expense form
    addExpenseBtn.addEventListener('click', () => {
        addExpenseForm.classList.toggle('hidden');
        addIncomeForm.classList.add('hidden');
        resetExpenseForm();
    });

    // Handle expense category selection
    expenseCategory.addEventListener('change', (e) => {
        if (e.target.value === 'new') {
            newCategoryInput.classList.remove('hidden');
        } else {
            newCategoryInput.classList.add('hidden');
        }
    });
    
    function validateStep(step) {
        switch(step) {
            case 1:
                return expenseCategory.value !== "";
            case 2:
                return expenseName.value.trim() !== "";
            case 3:
                return expenseAmount.value > 0;
            case 4:
                return true; // Note is optional
            default:
                return false;
        }
    }

    // Function to show error message
    function showError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
        });
    }

    // Handle expense form steps
    document.querySelectorAll('[id^="nextStep"]').forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentExpenseStep)) {
                document.getElementById(`expenseStep${currentExpenseStep}`).classList.add('hidden');
                currentExpenseStep++;
                document.getElementById(`expenseStep${currentExpenseStep}`).classList.remove('hidden');
                expenseStepDisplay.textContent = currentExpenseStep;
            } else {
                let errorMessage;
                switch(currentExpenseStep) {
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

    // Handle finish button
    document.getElementById('finishExpense').addEventListener('click', () => {
        if (validateStep(4)) {
            // Here you would typically save the expense data
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Gasto agregado correctamente.',
            }).then(() => {
                // Reset form and hide it
                resetExpenseForm();
                addExpenseForm.classList.add('hidden');
            });
        }
    });

    // Reset expense form
    function resetExpenseForm() {
        currentExpenseStep = 1;
        expenseStepDisplay.textContent = currentExpenseStep;
        document.querySelectorAll('[id^="expenseStep"]').forEach(step => {
            step.classList.add('hidden');
        });
        document.getElementById('expenseStep1').classList.remove('hidden');
    }
});