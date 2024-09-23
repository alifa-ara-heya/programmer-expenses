// declaring reusable functions

function getInputValueByID(id){
    const value = parseFloat(document.getElementById(id).value);
    return value;
}

// a function of removing the hidden value;
function showError(id){
    document.getElementById(id).classList.remove('hidden');
}


// Complete Validation Function for an Empty Input
function validateEmptyInput(inputId, errorMessageId) {
    const inputField = document.getElementById(inputId);
    const errorMessage = document.getElementById(errorMessageId);

    if (inputField.value.trim() === "") {
        errorMessage.classList.remove('hidden'); // Show the error message
        inputField.classList.add('input-error'); // Optional: Add a class to indicate the error visually
        return false; // Return false if validation fails
    } else {
        errorMessage.classList.add('hidden'); // Hide the error message
        inputField.classList.remove('input-error'); // Optional: Remove error indication
        return true; // Return true if validation passes
    }
}

// Usage example for an input with id 'income' and an error message with id 'income-error'
document.getElementById('calculate').addEventListener('click', function() {
    if (!validateEmptyInput('income', 'income-error')) {
        return; // Stop further execution if validation fails
    }
    // Continue with the calculation or other actions
});

// starting the code, bismillah

let count = 0;

document.getElementById('calculate').addEventListener('click', function () {
    count++;
    // const income = parseFloat(document.getElementById("income").value) || 0; //here, 0 is the fallback value. So, if the user doesn't input anything, it will be 0.

    const income = getInputValueByID('income');
    console.log(income);
    const softwareCost = parseFloat(document.getElementById('software').value) || 0;
    const coursesCost = parseFloat(document.getElementById('courses').value) || 0;
    const internetCost = parseFloat(document.getElementById('internet').value) || 0;
    // console.log({ income, softwareCost, coursesCost, internetCost });
    // console.table({income, softwareCost, coursesCost, internetCost});

    if (income <= 0 || isNaN(income)) {
        // document.getElementById('income-error').classList.remove('hidden');
        showError('income-error');
        return;
    }

    if (softwareCost <= 0 || isNaN(softwareCost)) {
        document.getElementById('software-error').classList.remove('hidden');
        return;
    }

   


    // calculate total expense
    const totalExpenses = softwareCost + coursesCost + internetCost;

    if (totalExpenses > income) {
        // document.getElementById('logic-error').classList.remove('hidden');
        showError('logic-error');
        return;
    }

    // updating the value of total expense in results summary
    document.getElementById("total-expenses").innerText = totalExpenses.toFixed(2);

    // calculate cuurent balance
    const currentBalance = income - totalExpenses;

    // updating the value of balance in results summary
    document.getElementById("balance").innerText = currentBalance.toFixed(2);

    // making the result summary visible
    const result = document.getElementById('results');
    result.classList.remove('hidden');

    //  // Make the expense history section visible
    //  const historySection = document.getElementById('history-section');
    //  historySection.classList.remove('hidden');

    // making expense history section visible
    const historyItem = document.createElement('div');
    historyItem.className = 'bg-white p-3 rounded-md border-l-2 border-indigo-500';
    historyItem.innerHTML = `
    <p class= "text-xs text-gray-500">Serial No: ${count}</p>
    <p class="text-xs text-gray-500">${new Date().toLocaleDateString()}</p>
    <p class= "text-xs text-gray-500">Income: ${income.toFixed(2)}</p>
    <p class= "text-xs text-gray-500">Total Expenses: ${totalExpenses.toFixed(2)}</p>
    <p class= "text-xs text-gray-500">Balance: ${currentBalance.toFixed(2)}</p>
    `

    const historyContainer = document.getElementById('history-list');
    historyContainer.insertBefore(historyItem, historyContainer.firstChild);

    // Hide history-section initially after adding a new item
    document.getElementById('history-section').classList.add('hidden');

})

document.getElementById('calculate-savings').addEventListener('click', function () {
    const income = parseFloat(document.getElementById("income").value) || 0;
    const softwareCost = parseFloat(document.getElementById('software').value) || 0;
    const coursesCost = parseFloat(document.getElementById('courses').value) || 0;
    const internetCost = parseFloat(document.getElementById('internet').value) || 0;


    //  calculating savings

    const savingPercentage = parseFloat(document.getElementById('savings').value);
    const totalExpenses = softwareCost + coursesCost + internetCost;
    const currentBalance = income - totalExpenses;
    const savingAmount = (savingPercentage * currentBalance / 100);
    console.log(savingAmount);

    // updating the value of total expense in results summary
    document.getElementById("total-expenses").innerText = totalExpenses.toFixed(2);

    // updating the value of balance in results summary
    document.getElementById("balance").innerText = currentBalance.toFixed(2);

    // updating the value of savings in results summary
    document.getElementById("savings-amount").innerText = savingAmount.toFixed(2);


    // calculate remaining balance
    const remainingBalance = currentBalance - savingAmount;
    console.log(remainingBalance);
    // updating the value of savings in results summary
    document.getElementById("remaining-balance").innerText = remainingBalance.toFixed(2);
})


// changing the tabs
const historyTab = document.getElementById('history-tab');
const assistantTab = document.getElementById('assistant-tab');

// history tab functionality
historyTab.addEventListener('click', function () {
    historyTab.classList.add("text-white", "font-semibold", "bg-gradient-to-r", "from-blue-500", "to-purple-600");
    assistantTab.classList.remove("text-white", "font-semibold", "bg-gradient-to-r", "from-blue-500", "to-purple-600")

    document.getElementById('expense-form').classList.add('hidden');
    // document.getElementById('results').classList.remove('hidden');
    document.getElementById('history-section').classList.remove('hidden');

})


// assistant tab functionality
assistantTab.addEventListener('click', function () {
    assistantTab.classList.add("text-white", "font-semibold", "bg-gradient-to-r", "from-blue-500", "to-purple-600");
    historyTab.classList.remove("text-white", "font-semibold", "bg-gradient-to-r", "from-blue-500", "to-purple-600");
    document.getElementById('expense-form').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');

})

 // live validation for input
 document.getElementById('income').addEventListener('input', function () {
    const inputValue = parseFloat(document.getElementById('income').value);
    if (inputValue <= 0 || isNaN(inputValue)) {
        document.getElementById('income-error').classList.remove('hidden');
        return;
    }
})

