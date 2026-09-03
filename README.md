# Expense Tracker

A simple and responsive Expense Tracker web application built using **HTML, CSS, and JavaScript**. The application allows users to manage their income and expenses, view financial summaries, filter transactions, and store data using browser Local Storage.

## Features

* Add income and expense transactions
* Enter transaction amount, category, date, and description
* Edit existing transactions
* Delete transactions with confirmation
* View total income
* View total expenses
* View current balance
* Filter transactions by:

  * All transactions
  * Income
  * Expense
  * Category
  * Month
* View monthly expense summary
* Form validation with helpful error messages
* Data persistence using browser Local Storage
* Responsive design for desktop and mobile screens

## Technologies Used

* **HTML5** – Application structure
* **CSS3** – Styling and responsive design
* **JavaScript** – Application logic and transaction management
* **Local Storage** – Saving transaction data in the browser

## Project Structure

```text
expense-tracker/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### File Description

| File         | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| `index.html` | Contains the structure of the Expense Tracker                                |
| `style.css`  | Contains the styling and responsive design                                   |
| `script.js`  | Handles transactions, calculations, filtering, validation, and Local Storage |
| `README.md`  | Project documentation                                                        |

## How to Run the Application

No additional software, libraries, or dependencies are required.

### Method 1 – Run Directly

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html`.
4. The application will open in your default web browser.

### Method 2 – Using Git

Clone the repository using:

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/expense-tracker-muhammad-hassan-vs.git
```

Move into the project folder:

```bash
cd expense-tracker-muhammad-hassan-vs
```

Then open `index.html` in a web browser.

### Method 3 – Using VS Code

1. Clone or download the repository.
2. Open the project folder in **Visual Studio Code**.
3. Open `index.html`.
4. Open it in your browser.

If you have the **Live Server** extension installed, you can also right-click `index.html` and select **Open with Live Server**.

## How to Use

### 1. Add a Transaction

Select the transaction type:

* Income
* Expense

Then enter:

* Amount
* Category
* Date
* Description

Click **Add Transaction**.

The transaction will immediately appear in the transaction list.

### 2. View Financial Summary

The dashboard displays:

* **Total Income** – Sum of all income transactions
* **Total Expenses** – Sum of all expense transactions
* **Current Balance** – Total income minus total expenses

### 3. Edit a Transaction

Click the **Edit** button on any transaction.

The transaction details will be loaded into the form. Update the required information and click **Update Transaction**.

### 4. Delete a Transaction

Click the **Delete** button on a transaction.

A confirmation message will appear before the transaction is permanently removed.

### 5. Filter Transactions

Transactions can be filtered using:

* Transaction type
* Category
* Month

Multiple filters can be used together to find specific transactions.

For example:

```text
Month: September 2026
Type: Expense
Category: Food
```

This will display only Food expenses from September 2026.

### 6. Monthly Expense Summary

Select a month from the monthly expense summary section to view the total expenses for that month.

## Data Storage

The application uses the browser's **Local Storage API** to save transaction data.

This means transactions remain available after:

* Refreshing the page
* Closing and reopening the browser
* Reopening the application in the same browser

The data is stored locally in the user's browser and does not require a backend or database.

## Validation

The application includes basic form validation to prevent invalid transactions.

Examples include:

* Transaction type must be selected
* Amount must be greater than zero
* Category must be selected
* Date must be entered
* Description must not be empty
* Description length is limited

Helpful error messages are displayed when invalid data is entered.

## Responsive Design

The application is designed to work on different screen sizes, including:

* Desktop computers
* Laptops
* Tablets
* Mobile devices

The layout automatically adjusts for smaller screens.



## Author

**Muhammad Hassan VS**

GitHub: https://github.com/muhammadhassanvs
