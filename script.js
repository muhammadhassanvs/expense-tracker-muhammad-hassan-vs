// Get elements from HTML

const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");

const totalIncome = document.getElementById("total-income");
const totalExpenses = document.getElementById("total-expenses");
const balance = document.getElementById("balance");


// Store all transactions

let transactions = [];


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

    // Clear the current list

    transactionList.innerHTML = "";


    // Show message if there are no transactions

    if (transactions.length === 0) {

        transactionList.innerHTML = `
            <p class="empty-message">
                No transactions yet.
            </p>
        `;

        return;
    }


    // Display every transaction

    transactions.forEach(function (transaction) {

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