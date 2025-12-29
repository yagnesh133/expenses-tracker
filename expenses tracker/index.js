const state = {
    transactions: JSON.parse(localStorage.getItem("data")) || []
};

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const historyEl = document.getElementById("history");
const form = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const valueInput = document.getElementById("value");

function saveData() {
    localStorage.setItem("data", JSON.stringify(state.transactions));
}

function addTransaction(title, amount) {
    state.transactions.push({
        id: Date.now(),
        title,
        amount
    });
    saveData();
    render();
}

function deleteTransaction(id) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveData();
    render();
}

function calculate() {
    let income = 0, expense = 0;

    state.transactions.forEach(t => {
        if (t.amount > 0) income += t.amount;
        else expense += t.amount;
    });

    balanceEl.innerText = `₹${income + expense}`;
    incomeEl.innerText = `₹${income}`;
    expenseEl.innerText = `₹${Math.abs(expense)}`;
}

function render() {
    historyEl.innerHTML = "";

    state.transactions.forEach(t => {
        const li = document.createElement("li");
        li.className = t.amount > 0 ? "plus" : "minus";
        li.innerHTML = `
            ${t.title}
            <span>₹${Math.abs(t.amount)}</span>
            <button onclick="deleteTransaction(${t.id})">x</button>
        `;
        historyEl.appendChild(li);
    });

    calculate();
}

form.addEventListener("submit", e => {
    e.preventDefault();
    addTransaction(titleInput.value, Number(valueInput.value));
    titleInput.value = "";
    valueInput.value = "";
});

render();
