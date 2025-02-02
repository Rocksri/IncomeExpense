const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const deleteAllBtn = document.getElementById('DeleteAll');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const netBalance = document.getElementById('net-balance');
const entryList = document.getElementById('entry-list');
const filterRadios = document.querySelectorAll('input[name="filter"]');

let entries = JSON.parse(localStorage.getItem('entries')) || [];

// Initial Display
displayEntries();
calculateSummary();

addBtn.addEventListener('click', () => {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description && !isNaN(amount) && amount > 0) {
        const entry = {
            id: Date.now(),
            description,
            amount,
            type
        };
        entries.push(entry);
        saveData();
        displayEntries();
        calculateSummary();
        clearInputs();
    } else {
        alert("Please enter a valid description and amount.");
    }
});

resetBtn.addEventListener('click', clearInputs);

deleteAllBtn.addEventListener('click', () => {
    entries = [];
    saveData();
    displayEntries();
    calculateSummary();
});

function clearInputs() {
    descriptionInput.value = '';
    amountInput.value = '';
}

function displayEntries() {
    entryList.innerHTML = '';

    const filter = getFilter();

    entries.forEach(entry => {
        if (filter === 'all' || filter === entry.type) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${entry.description} -
                <span class="amount ${entry.type === 'income' ? 'income' : 'expense'}">$${entry.amount.toFixed(2)}</span></span>
                <span class="actions flex">
                    <button class="edit-btn" data-id="${entry.id}">Edit</button>
                    <button class="delete-btn" data-id="${entry.id}">Delete</button>
                </span>
            `;

            entryList.appendChild(listItem);

            // Edit Button
            listItem.querySelector('.edit-btn').addEventListener('click', () => editEntry(entry.id));

            // Delete Button
            listItem.querySelector('.delete-btn').addEventListener('click', () => deleteEntry(entry.id));
        }
    });
}

function editEntry(id) {
    const entry = entries.find(e => e.id === id);
    if (!entry) return;

    const newAmount = parseFloat(prompt("Enter new amount:", entry.amount));
    if (!isNaN(newAmount) && newAmount > 0) {
        entry.amount = newAmount;
        saveData();
        displayEntries();
        calculateSummary();
    } else {
        alert("Please enter a valid number.");
    }
}

function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    saveData();
    displayEntries();
    calculateSummary();
}

function calculateSummary() {
    let totalIncomeValue = 0;
    let totalExpenseValue = 0;

    entries.forEach(entry => {
        if (entry.type === 'income') {
            totalIncomeValue += entry.amount;
        } else {
            totalExpenseValue += entry.amount;
        }
    });

    totalIncome.textContent = totalIncomeValue.toFixed(2);
    totalExpense.textContent = totalExpenseValue.toFixed(2);
    netBalance.textContent = (totalIncomeValue - totalExpenseValue).toFixed(2);
}

function getFilter() {
    return [...filterRadios].find(radio => radio.checked)?.value || 'all';
}

function saveData() {
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Filter event listener
filterRadios.forEach(radio => {
    radio.addEventListener('change', displayEntries);
});
