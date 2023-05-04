
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
const billList = document.getElementById("bill-list");



let monthlyIncome = 0;
let totalBills = 0;
let extraIncome = 0;
let annualExpensesArray = [];



incomeBtn.addEventListener("click", addIncome);
billBtn.addEventListener("click", addBill);


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



startOverBtn.addEventListener("click", startOver);

function startOver() {
  monthlyIncome = 0;
  totalBills = 0;
  extraIncome = 0;
  annualExpensesArray = [];
  budgetList.children[0].textContent = "Income: $0";
  budgetList.children[1].textContent = "Total Bills: $0";
  budgetList.children[2].textContent = "Extra Income: $0";
  while (billList.children.length > 1) {
    billList.removeChild(billList.lastChild);
  }
  
  annualExpenses.textContent = "0.00";
}

let savingsGoal = 0;
let currentSavings = 0;
const savingsList = document.getElementById("savingsList");
const savingsGoalDisplay = document.getElementById("savingsGoalDisplay");
const progressBar = document.getElementById("progressBar");

function setSavingsGoal() {
  const goalInput = document.getElementById("savingsGoal");
  savingsGoal = parseInt(goalInput.value);
  goalInput.value = "";
  savingsGoalDisplay.textContent = `Savings Goal: $${savingsGoal}`;
  updateProgressBar();
}

function addSavings() {
  const addInput = document.getElementById("addInput");
  const savings = parseInt(addInput.value);
  addInput.value = "";
  currentSavings += savings;
  savingsList.innerHTML += `<li>$${savings} added</li>`;
  updateProgressBar();
}

function subtractSavings() {
  const subtractInput = document.getElementById("subtractInput");
  const savings = parseInt(subtractInput.value);
  subtractInput.value = "";
  if (savings <= currentSavings) {
    currentSavings -= savings;
    savingsList.innerHTML += `<li>$${savings} removed</li>`;
  } else {
    savingsList.innerHTML += `<li>Attempted to remove $${savings}, but only $${currentSavings} available</li>`;
  }
  updateProgressBar();
}

function updateProgressBar() {
  const progressPercent = (currentSavings / savingsGoal) * 100 || 0;
  progressBar.style.width = `${progressPercent}%`;
}

function resetSavingsGoal() {
  savingsGoal = 0;
  currentSavings = 0;
  savingsList.innerHTML = "";
  savingsGoalDisplay.textContent = "Savings Goal: ";
  updateProgressBar();
}

document.getElementById("setGoalButton").addEventListener("click", setSavingsGoal);
document.getElementById("addButton").addEventListener("click", addSavings);
document.getElementById("subtractButton").addEventListener("click", subtractSavings);
document.getElementById("resetButton").addEventListener("click", resetSavingsGoal);

function addBill() {
  const billName = billNameInput.value.trim();
  const billAmount = Number(billAmountInput.value);

  if (billName !== "" && !isNaN(billAmount) && billAmount > 0) {
    totalBills += billAmount;
    updateBudget();

    //added removable bill
    const billItem = document.createElement("li");
    billItem.style.listStyleType = "none";
    billItem.style.display = "inline-flex";
    billItem.style.flexWrap = "wrap";
    billItem.style.margin = "5px";
    billItem.style.width = "100%";
    billItem.textContent = `${billName} - $${billAmount}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.height = "35px";
    removeBtn.style.paddingBottom = "30px";

    removeBtn.addEventListener("click", () => {
      totalBills -= billAmount;
      updateBudget();
      billList.removeChild(billItem);
    });
    //end removable bill

    billItem.appendChild(removeBtn);
    billList.appendChild(billItem);

  } else {
    showModal("Invalid Input", "Please enter a valid bill name and amount.");
  }

  billNameInput.value = "";
  billAmountInput.value = "";
}




