// Get elements from HTML

const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");

const totalIncome = document.getElementById("total-income");
const totalExpenses = document.getElementById("total-expenses");
const balance = document.getElementById("balance");

const typeFilter = document.getElementById("type-filter");
const categoryFilter = document.getElementById("category-filter");

// Store all transactions

let transactions = [];

// Filter transactions when the filter changes

typeFilter.addEventListener("change", displayTransactions);
categoryFilter.addEventListener("change", displayTransactions);

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


    // Check amount

    if (amount <= 0) {
        alert("Please enter an amount greater than 0.");
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


    // Add transaction to the array

    transactions.push(transaction);


    // Update the page

    displayTransactions();
    updateSummary();


    // Clear the form

    transactionForm.reset();

});


// Display transactions

function displayTransactions() {

    // Get selected filters

    const selectedType = typeFilter.value;
    const selectedCategory = categoryFilter.value;


    // Filter transactions

    const filteredTransactions = transactions.filter(function (transaction) {

        const typeMatches =
            selectedType === "all" ||
            transaction.type === selectedType;

        const categoryMatches =
            selectedCategory === "all" ||
            transaction.category === selectedCategory;

        return typeMatches && categoryMatches;

    });


    // Clear the current list

    transactionList.innerHTML = "";


    // Show message if no transactions match the filter

    if (filteredTransactions.length === 0) {

        transactionList.innerHTML = `
            <p class="empty-message">
                No transactions found.
            </p>
        `;

        return;
    }


    // Display filtered transactions

    filteredTransactions.forEach(function (transaction) {

        const transactionItem = document.createElement("div");

        transactionItem.className = "transaction-item";


        // Decide whether it is income or expense

        const sign = transaction.type === "income" ? "+" : "-";

        const typeClass =
            transaction.type === "income" ? "income" : "expense";


        transactionItem.innerHTML = `
            <div>
                <h3>${transaction.description}</h3>
                <p>${transaction.category} • ${transaction.date}</p>
            </div>

            <div class="${typeClass}">
                ${sign}₹${transaction.amount.toFixed(2)}
            </div>
        `;


        transactionList.appendChild(transactionItem);

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