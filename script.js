// script.js
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const netBalance = document.getElementById('net-balance');
const entryList = document.getElementById('entry-list');
const filterRadios = document.querySelectorAll('input[name="filter"]');

let entries = [];

// Load entries from local storage
if (localStorage.getItem('entries')) {
    entries = JSON.parse(localStorage.getItem('entries'));
    displayEntries();
    calculateSummary();
}

addBtn.addEventListener('click', () => {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description && !isNaN(amount)) {
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
    }
});

resetBtn.addEventListener('click', clearInputs);

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
                ${entry.description} - $${entry.amount.toFixed(2)}
                <span class="actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </span>
            `;

            entryList.appendChild(listItem);

            // Edit functionality (placeholder)
            const editBtn = listItem.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                // Implement edit functionality here
            });

            // Delete functionality
            const deleteBtn = listItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                entries = entries.filter(e => e.id !== entry.id);
                saveData();
                displayEntries();
                calculateSummary();
            });
        }
    });
}

function calculateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    entries.forEach(entry => {
        if (entry.type === 'income') {
            totalIncome += entry.amount;
        } else {
            totalExpense += entry.amount;
        }
    });

    totalIncome = totalIncome.toFixed(2);
    totalExpense = totalExpense.toFixed(2);
    const netBalanceValue = parseFloat(totalIncome) - parseFloat(totalExpense);
    netBalance.textContent = netBalanceValue.toFixed(2);
    totalIncome.textContent = totalIncome;
    totalExpense.textContent = totalExpense;
}

function getFilter() {
    for (const radio of filterRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

function saveData() {
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Initial display
displayEntries();
calculateSummary();

// Filter event listener
filterRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        displayEntries();
    });
});