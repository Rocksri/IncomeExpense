const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const DeleteAllbtn = document.getElementById('DeleteAll');
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

DeleteAllbtn.addEventListener('click', () => {
    document.getElementById('total-income').textContent = '0.00';
    document.getElementById('total-expense').textContent = '0.00';
    document.getElementById('net-balance').textContent = '0.00';

    // Clear the entry list
    const entryList = document.getElementById('entry-list');
    while (entryList.firstChild) {
        entryList.removeChild(entryList.firstChild);
    }

    // Clear the entries array
    entries = [];

    // Save the empty array to local storage
    saveData();
});


function displayEntries() {
    entryList.innerHTML = '';

    const filter = getFilter();

    entries.forEach(entry => {
        if (filter === 'all' || filter === entry.type) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${entry.description} -
                <span class="amount ${entry.type === 'income' ? 'income' : 'expense'}">$${entry.amount.toFixed(2)}</span></span>
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
    document.getElementById('total-income').textContent = totalIncome;
    document.getElementById('total-expense').textContent = totalExpense;
    netBalance.textContent = netBalanceValue.toFixed(2);
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