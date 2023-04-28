// Get all the necessary HTML elements
const incomeInput = document.getElementById("income-input");
const incomeBtn = document.getElementById("income-btn");
const billNameInput = document.getElementById("bill-name");
const billAmountInput = document.getElementById("bill-amount");
const billBtn = document.getElementById("bill-btn");
const budgetList = document.getElementById("budget-list");
const annualExpenses = document.getElementById("annual-expenses");
const startOverBtn = document.getElementById("start-over-btn");
const modalContainer = document.getElementById("modal-container");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalCloseBtn = document.getElementById("modal-close-btn");

// Set up initial variables
let monthlyIncome = 0;
let totalBills = 0;
let extraIncome = 0;
let annualExpensesArray = [];

// Set up event listeners for the income and bill buttons
incomeBtn.addEventListener("click", addIncome);
billBtn.addEventListener("click", addBill);

// Define the addIncome function
function addIncome() {
  const incomeAmount = Number(incomeInput.value);
  if (!isNaN(incomeAmount) && incomeAmount > 0) {
    monthlyIncome += incomeAmount;
    updateBudget();
  } else {
    showModal("Invalid Input", "Please enter a valid monthly income.");
  }
  incomeInput.value = "";
}

// Define the addBill function
function addBill() {
  const billName = billNameInput.value.trim();
  const billAmount = Number(billAmountInput.value);
  if (billName !== "" && !isNaN(billAmount) && billAmount > 0) {
    totalBills += billAmount;
    updateBudget();
    const billItem = document.createElement("li");
    billItem.textContent = `${billName}: $${billAmount}`;
    budgetList.appendChild(billItem);
  } else {
    showModal("Invalid Input", "Please enter a valid bill name and amount.");
  }
  billNameInput.value = "";
  billAmountInput.value = "";
}

// updateBudget function
function updateBudget() {
  const extraIncome = monthlyIncome - totalBills;
  const incomeItem = budgetList.children[0];
  incomeItem.textContent = `Income: $${monthlyIncome}`;
  const billsItem = budgetList.children[1];
  billsItem.textContent = `Total Bills: $${totalBills}`;
  const extraIncomeItem = budgetList.children[2];
  extraIncomeItem.textContent = `Extra Income: $${extraIncome}`;
  if (extraIncome >= 0) {
    extraIncomeItem.classList.remove("negative");
  } else {
    extraIncomeItem.classList.add("negative");
  }
  const annualExpensesTotal = totalBills * 12;
  annualExpenses.textContent = `Annual Expenses: $${annualExpensesTotal}`;
}


// Event listener for the start over button
startOverBtn.addEventListener("click", startOver);

// Define the startOver function
function startOver() {
  monthlyIncome = 0;
  totalBills = 0;
  extraIncome = 0;
  annualExpensesArray = [];
  budgetList.children[0].textContent = "Income: $0";
  budgetList.children[1].textContent = "Total Bills: $0";
  budgetList.children[2].textContent = "Extra Income: $0";
  while (budgetList.children.length > 3) {
    budgetList.removeChild(budgetList.lastChild);
  }
  annualExpenses.textContent = "0.00";
}