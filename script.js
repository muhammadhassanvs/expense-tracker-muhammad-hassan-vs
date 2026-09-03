// Get elements from HTML

const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");

const totalIncome = document.getElementById("total-income");
const totalExpenses = document.getElementById("total-expenses");
const balance = document.getElementById("balance");

const typeFilter = document.getElementById("type-filter");
const categoryFilter = document.getElementById("category-filter");

const transactionMonth = document.getElementById("transaction-month");

const formError = document.getElementById("form-error");

const monthFilter = document.getElementById("month-filter");
const monthlyExpenses = document.getElementById("monthly-expenses");

const addButton = document.querySelector(".add-button");

// Store all transactions

let transactions = [];

// Store the ID of the transaction being edited

let editingId = null;


// Load saved transactions from Local Storage

const savedTransactions = localStorage.getItem("transactions");

if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
}

// Update monthly summary when month changes

monthFilter.addEventListener("change", updateMonthlySummary);

// Filter transactions when the filter changes

typeFilter.addEventListener("change", displayTransactions);
categoryFilter.addEventListener("change", displayTransactions);
transactionMonth.addEventListener("change", displayTransactions);

// Add a new transaction

transactionForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Get values from the form
    const type = document.getElementById("type").value;
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    // Clear previous error

    formError.textContent = "";


    // Validate the form

    if (!type) {
        formError.textContent = "Please select a transaction type.";
        return;
    }

    if (amount <= 0) {
        formError.textContent = "Amount must be greater than 0.";
        return;
    }

    if (!category) {
        formError.textContent = "Please select a category.";
        return;
    }

    if (!date) {
        formError.textContent = "Please select a date.";
        return;
    }

    if (!description.trim()) {
        formError.textContent = "Please enter a description.";
        return;
    }

    if (description.trim().length > 100) {
        formError.textContent = "Description must be less than 100 characters.";
        return;
    }


    // Create transaction object

    const transaction = {
        id: Date.now(),
        type: type,
        amount: amount,
        category: category,
        date: date,
        description: description
    };


    // Check if we are editing a transaction

    if (editingId !== null) {

        transactions = transactions.map(function (item) {

            if (item.id === editingId) {
                return transaction;
            }

            return item;

        });

        // Exit edit mode

        editingId = null;

    } else {

        // Add a new transaction

        transactions.push(transaction);

    }

    // Save the transaction

    saveTransactions();



    // Update the page

    displayTransactions();
    updateSummary();
    updateMonthlySummary();


    // Clear the form

    transactionForm.reset();
    formError.textContent = "";
    addButton.textContent = "Add Transaction";

});


// Display transactions

// Display transactions

function displayTransactions() {

    const selectedType = typeFilter.value;
    const selectedCategory = categoryFilter.value;
    const selectedMonth = transactionMonth.value;


    // Filter transactions

    const filteredTransactions = transactions.filter(function (transaction) {

        const typeMatches =
            selectedType === "all" ||
            transaction.type === selectedType;

        const categoryMatches =
            selectedCategory === "all" ||
            transaction.category === selectedCategory;

        const monthMatches =
        selectedMonth === "" ||
        transaction.date.startsWith(selectedMonth);    

        return typeMatches && categoryMatches && monthMatches;

    });


    // Clear transaction list

    transactionList.innerHTML = "";


    // No transactions found

    if (filteredTransactions.length === 0) {

        transactionList.innerHTML = `
            <p class="empty-message">
                No transactions found.
            </p>
        `;

        return;
    }


    // Display transactions

    filteredTransactions.forEach(function (transaction) {

        const transactionItem = document.createElement("div");

        transactionItem.className = "transaction-item";


        const sign = transaction.type === "income" ? "+" : "-";

        const typeClass =
            transaction.type === "income" ? "income" : "expense";


        transactionItem.innerHTML = `
            <div class="transaction-info">

                <h3>${transaction.description}</h3>

                <p>
                    ${transaction.category} • ${transaction.date}
                </p>

            </div>


            <div class="transaction-right">

                <span class="${typeClass}">
                    ${sign}₹${transaction.amount.toFixed(2)}
                </span>

                <button
                    class="edit-button"
                    onclick="editTransaction(${transaction.id})">
                    Edit
                </button>

                <button
                    class="delete-button"
                    onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>

            </div>
        `;


        transactionList.appendChild(transactionItem);

    });

    

}

// Delete a transaction

function deleteTransaction(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this transaction?"
    );


    if (!confirmDelete) {
        return;
    }


    // Remove transaction from the array

    transactions = transactions.filter(function (transaction) {

        return transaction.id !== id;

    });

    // Save the updated transactions

    saveTransactions();


    // Update the page

    displayTransactions();
    updateSummary();
    updateMonthlySummary();

}

// Edit a transaction

function editTransaction(id) {

    const transaction = transactions.find(function (item) {

        return item.id === id;

    });


    if (!transaction) {
        return;
    }


    // Store the ID of the transaction being edited

    editingId = id;

    addButton.textContent = "Update Transaction";


    // Put transaction values into the form

    document.getElementById("type").value = transaction.type;

    document.getElementById("amount").value = transaction.amount;

    document.getElementById("category").value = transaction.category;

    document.getElementById("date").value = transaction.date;

    document.getElementById("description").value =
        transaction.description;


    // Scroll to the form

    document.querySelector(".form-section").scrollIntoView({
        behavior: "smooth"
    });

}

// Calculate totals

function updateSummary() {

    let income = 0;
    let expenses = 0;


    // Go through all transactions

    transactions.forEach(function (transaction) {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expenses += transaction.amount;

        }

    });


    // Calculate balance

    const currentBalance = income - expenses;


    // Display values

    totalIncome.textContent = `₹${income.toFixed(2)}`;

    totalExpenses.textContent = `₹${expenses.toFixed(2)}`;

    balance.textContent = `₹${currentBalance.toFixed(2)}`;

}

// Save transactions to Local Storage

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

// Calculate monthly expenses

function updateMonthlySummary() {

    const selectedMonth = monthFilter.value;

    let total = 0;


    // If no month is selected

    if (!selectedMonth) {

        monthlyExpenses.textContent = "₹0.00";

        return;
    }


    // Check every transaction

    transactions.forEach(function (transaction) {

        if (
            transaction.type === "expense" &&
            transaction.date.startsWith(selectedMonth)
        ) {

            total += transaction.amount;

        }

    });


    // Display the total

    monthlyExpenses.textContent = `₹${total.toFixed(2)}`;

}

// Display saved transactions when the page opens

displayTransactions();
updateSummary();
updateMonthlySummary();