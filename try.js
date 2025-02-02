// Select elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type_in_exp');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const deleteAllBtn = document.getElementById('DeleteAll');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const netBalance = document.getElementById('net-balance');
const entryList = document.getElementById('entry-list');
const filterRadios = document.querySelectorAll('input[name="filter"]');

let entries = [];

const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });
console.log(formattedDate); // Output: 01-Jan-25

// Load entries from localStorage
if (localStorage.getItem('entries')) {
    entries = JSON.parse(localStorage.getItem('entries'));
    displayEntries();
    calculateSummary();
}

// Add Entry Event
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

// Reset Button Event
resetBtn.addEventListener('click', clearInputs);

function clearInputs() {
    descriptionInput.value = '';
    amountInput.value = '';
}

// Delete All Button Event
deleteAllBtn.addEventListener('click', () => {
    totalIncome.textContent = '0.00';
    totalExpense.textContent = '0.00';
    netBalance.textContent = '0.00';
    entryList.innerHTML = ''; // Clear UI
    entries = []; // Clear array
    saveData(); // Clear localStorage
});

// Display Entries
function displayEntries() {
    entryList.innerHTML = ''; // Clear previous list

    const filter = getFilter();
    const filteredEntries = entries.filter(entry => filter === 'all' || filter === entry.type);

    if (filteredEntries.length === 0) {
        console.log("No entries available.");
        empty_trans = document.createElement('span');
        empty_trans.textContent = 'Enter Some Transcation'
        entryList.append(empty_trans)
        return;
    }

    filteredEntries.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <span class="w-[75%] justify-between flex"> ${formattedDate} || ${entry.description}
                <span class="amount ${entry.type === 'income' ? 'income' : 'expense'}">$${entry.amount.toFixed(2)}</span></span>
                <span class="actions flex">
                    <button class="edit-btn" data-id="${entry.id}">Edit</button>
                    <button class="delete-btn" data-id="${entry.id}">Delete</button>
                </span>
            `;

            entryList.appendChild(listItem);

            // Edit Entry
            listItem.querySelector('.edit-btn').addEventListener('click', () => editEntry(entry.id));

            // Delete Entry
            listItem.querySelector('.delete-btn').addEventListener('click', () => deleteEntry(entry.id));
    });

    // Auto-scroll to the latest entry
    entryList.scrollTop = entryList.scrollHeight;
}

// Edit Entry
function editEntry(id) {
    const entry = entries.find(e => e.id === id);
    if (!entry) return;

    const newAmount = prompt("Enter new amount:", entry.amount);
    if (!isNaN(newAmount) && newAmount !== null && newAmount.trim() !== '') {
        entry.amount = parseFloat(newAmount);
        saveData();
        displayEntries();
        calculateSummary();
    } else {
        alert("Invalid amount. Please enter a number.");
    }
}

// Delete Entry
function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    saveData();
    displayEntries();
    calculateSummary();
}

// Calculate Summary
function calculateSummary() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    entries.forEach(entry => {
        if (entry.type === 'income') {
            incomeTotal += entry.amount;
        } else {
            expenseTotal += entry.amount;
        }
    });

    totalIncome.textContent = incomeTotal.toFixed(2);
    totalExpense.textContent = expenseTotal.toFixed(2);
    netBalance.textContent = (incomeTotal - expenseTotal).toFixed(2);
}

// Get Filter Selection
function getFilter() {
    const selected = [...filterRadios].find(radio => radio.checked);
    return selected ? selected.value : 'all';
}

// Save Data to LocalStorage
function saveData() {
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Initial Display
displayEntries();
calculateSummary();

// Filter Event Listener
filterRadios.forEach(radio => {
    radio.addEventListener('change', displayEntries);
});


document.querySelectorAll('a').forEach(link => {
    link.innerHTML = link.innerText.split('').map(
        (letters, i) => {
            if (letters === ' ') {
                return ' ';
            } else {
                return `<span style=transition-delay:${i * 50}ms>${letters}</span>`
            }
        }
    ).join('');

});

