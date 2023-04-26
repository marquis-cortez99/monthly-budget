// Define global variables
let income = 0;
let bills = [];
let annualExpenses = 0;


const incomeInput = document.getElementById('income-input');
const incomeBtn = document.getElementById('income-btn');
const billName = document.getElementById('bill-name');
const billAmount = document.getElementById('bill-amount');
const billBtn = document.getElementById('bill-btn');
const budgetList = document.getElementById('budget-list');
const annualExpensesDisplay = document.getElementById('annual-expenses');
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Add event listeners
incomeBtn.addEventListener('click', addIncome);
billBtn.addEventListener('click', addBill);
modalCloseBtn.addEventListener('click', closeModal);


loadData();

// Define functions
function addIncome() {
  const amount = parseFloat(incomeInput.value);
  if (!isNaN(amount) && amount > 0) {
    income += amount;
    updateBudgetDisplay();
    saveData();
  } else {
    showModal('Invalid input', 'Please enter a valid positive number.');
  }
  incomeInput.value = '';
}

function addBill() {
  const name = billName.value.trim();
  const amount = parseFloat(billAmount.value);
  if (name !== '' && !isNaN(amount) && amount > 0) {
    bills.push({
      name: name,
      amount: amount
    });
    updateBudgetDisplay();
    saveData();
  } else {
    showModal('Invalid input', 'Please enter a valid bill name and a valid positive number for the amount.');
  }
  billName.value = '';
  billAmount.value = '';
}

function updateBudgetDisplay() {
  let totalBills = 0;
  bills.forEach(function(bill) {
    totalBills += bill.amount;
  });
  const extraIncome = income - totalBills;
  budgetList.innerHTML = `
    <li>Income: $${income.toFixed(2)}</li>
    <li>Total Bills: $${totalBills.toFixed(2)}</li>
    <li>Extra Income: $${extraIncome.toFixed(2)}</li>
  `;
  annualExpenses = totalBills * 12;
  annualExpensesDisplay.textContent = `Annual Expenses: $${annualExpenses.toFixed(2)}`;
}

function saveData() {
  localStorage.setItem('income', income);
  localStorage.setItem('bills', JSON.stringify(bills));
}

function loadData() {
  const savedIncome = localStorage.getItem('income');
  if (savedIncome !== null) {
    income = parseFloat(savedIncome);
  }
  const savedBills = localStorage.getItem('bills');
  if (savedBills !== null) {
    bills = JSON.parse(savedBills);
  }
  updateBudgetDisplay();
}

function showModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modalContainer.style.display = 'block';
}

function closeModal() {
  modalContainer.style.display = 'none';
}
