// app.js

// === Utilidades ===
/** Formatea números como COP (puedes ajustar a tu moneda/locale) */
const fmt = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 2
});

/** Parsea el textarea de gastos:
 *  - Acepta líneas con sólo números (ignora comentarios como "(nota)")
 *  - Ignora líneas vacías
 *  - Retorna array de Number
 */
function parseExpenses(text) {
  return text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      // Extrae primer número de la línea (ignora comentarios)
      const match = line.match(/-?\d+(\.\d+)?/);
      return match ? Number(match[0]) : NaN;
    })
    .filter(n => !Number.isNaN(n));
}

/** Calcula totales y ahorro recomendado a partir de ingresos y gastos[] */
function computeBudget(income, expenses) {
  const totalExpenses = expenses.reduce((acc, n) => acc + n, 0);
  const balance = income - totalExpenses;
  const save10 = +(income * 0.10).toFixed(2);
  const save20 = +(income * 0.20).toFixed(2);
  return { totalExpenses, balance, save10, save20 };
}

// === DOM refs ===
const form = document.getElementById("budget-form");
const incomeInput = document.getElementById("income");
const expensesInput = document.getElementById("expenses");
const errorsBox = document.getElementById("errors");

const outIncome   = document.getElementById("out-income");
const outExpenses = document.getElementById("out-expenses");
const outBalance  = document.getElementById("out-balance");
const outSavings  = document.getElementById("out-savings");
const resultsArea = document.getElementById("results");

const resetBtn = document.getElementById("reset");
const demoBtn  = document.getElementById("demo");

// === Helpers UI ===
function showError(message) {
  errorsBox.textContent = message;
  errorsBox.hidden = false;
}

function clearError() {
  errorsBox.textContent = "";
  errorsBox.hidden = true;
}

function setOutputs({ income, totalExpenses, balance, save10, save20 }) {
  outIncome.value   = fmt.format(income);
  outExpenses.value = fmt.format(totalExpenses);
  outBalance.value  = fmt.format(balance);
  outSavings.value  = `${fmt.format(save10)} — ${fmt.format(save20)}`;

  // Mensaje contextual accesible
  if (balance < 0) {
    resultsArea.innerHTML = `<p class="error">⚠️ Estás por encima del presupuesto. Revisa tus gastos.</p>`;
  } else if (balance === 0) {
    resultsArea.innerHTML = `<p class="warn">ℹ️ Balance exacto: no hay margen de ahorro.</p>`;
  } else {
    resultsArea.innerHTML = `<p class="success">💡 Ahorro sugerido: entre ${fmt.format(save10)} y ${fmt.format(save20)}.</p>`;
  }
}

function clearOutputs() {
  outIncome.value = outExpenses.value = outBalance.value = outSavings.value = "—";
  resultsArea.innerHTML = `<p>Completa el formulario y presiona <em>Calcular</em>.</p>`;
}

// === Eventos ===
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearError();

  const rawIncome = Number(incomeInput.value);
  const expenses = parseExpenses(expensesInput.value || "");

  // Validaciones
  if (Number.isNaN(rawIncome) || rawIncome < 0) {
    return showError("❌ Ingresos inválidos. Introduce un número mayor o igual a 0.");
  }
  if (expenses.some(n => n < 0)) {
    return showError("❌ Algunos gastos son negativos. Verifica tus líneas de gasto.");
  }

  // Cálculos
  const { totalExpenses, balance, save10, save20 } = computeBudget(rawIncome, expenses);
  setOutputs({ income: rawIncome, totalExpenses, balance, save10, save20 });

  // Pistas de depuración (comentarlas en producción si prefieres)
  console.log({ rawIncome, expenses, totalExpenses, balance, save10, save20 });
});

resetBtn.addEventListener("click", () => {
  form.reset();
  clearError();
  clearOutputs();
  incomeInput.focus();
});

demoBtn.addEventListener("click", () => {
  incomeInput.value = "1500000";
  expensesInput.value = `450000 (arriendo)
200000 (mercado)
90000 (transporte)
60000 (servicios)
120000 (otros)`;
  clearError();
  clearOutputs();
  incomeInput.focus();
});