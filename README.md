 Income Expense Calculator
Overview
The Income Expense Calculator is a web-based application designed to help users manage their finances by tracking income and expenses. 
It provides a simple and intuitive interface for adding, editing, and deleting entries, as well as filtering data by type (income, expense, or all). 
The application also calculates and displays the total income, total expenses, and net balance. 
Data is persisted using local storage, ensuring that entries are saved across sessions.

Features
CRUD Operations:

Create: Add new income or expense entries.

Read: Display a list of all entries with details.

Update: Edit existing entries.

Delete: Remove entries from the list.

Filters:

Filter entries by "All", "Income", or "Expense" using radio buttons.

Financial Overview:

Display total income, total expenses, and net balance at the top of the page.

Reset Button:

Clear input fields for a fresh entry.

Local Storage:

Persist data across browser sessions.

Responsive Design:

Works seamlessly on both desktop and mobile devices.

Login Functionality:

Simple login screen to secure access to the calculator.

Technologies Used
HTML: Structure of the web page.

CSS: Styling and layout.

JavaScript: Logic for CRUD operations, filters, and local storage.

Local Storage: To save and retrieve data.

How to Use
Login:

Enter a username and password (default: user / password).

Click "Login" to access the calculator.

Add an Entry:

Fill in the description and amount.

Select the type (Income or Expense).

Click "Add" to save the entry.

Edit an Entry:

Click the "Edit" button next to the entry you want to modify.

Update the details in the input fields.

Click "Update" to save changes.

Delete an Entry:

Click the "Delete" button next to the entry you want to remove.

Filter Entries:

Use the radio buttons to filter entries by "All", "Income", or "Expense".

Reset Input Fields:

Click the "Reset" button to clear the input fields.

View Financial Overview:

The total income, total expenses, and net balance are displayed at the top of the page.

Code Structure
HTML: Contains the structure of the page, including input fields, buttons, and the entries list.

CSS: Provides styling for a clean and responsive design.

JavaScript: Handles all the logic, including CRUD operations, filtering, and local storage.

Local Storage
Data is saved in the browser's local storage under the key incomeExpenseEntries.

Entries are retrieved and displayed when the page is loaded.

Responsive Design
The layout adjusts to fit different screen sizes, ensuring a good user experience on both desktop and mobile devices.

Login Details
Default username: admin

Default password: password123

Future Improvements
Add user authentication with a backend server.

Implement categories for income and expenses.

Provide graphical representations of financial data (e.g., charts).

How to Run
Clone the repository or download the source code.

Open the login.html file in a web browser.

Use the application as described above.

This project is a great way to practice HTML, CSS, and JavaScript while building a useful tool for personal finance management. Enjoy tracking your income and expenses! 🚀
