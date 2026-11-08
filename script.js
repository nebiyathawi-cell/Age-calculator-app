const yearsOutput = document.getElementById("years-output");
const monthsOutput = document.getElementById("months-output");
const daysOutput = document.getElementById("days-output");

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const submitBtn = document.querySelector('button[type="button"]');

function setError(inputEl, labelEl, errorEl, message) {
  inputEl.classList.add(
    "border-red-500",
    "focus:border-red-500",
    "focus:ring-red-100",
  );
  inputEl.classList.remove("border-gray-300", "focus:border-purple-500");

  labelEl.classList.add("text-red-500");
  labelEl.classList.remove("text-gray-400");

  errorEl.textContent = message;
}

function clearErrors() {
  const inputs = [dayInput, monthInput, yearInput];
  const labels = [
    document.getElementById("day-label"),
    document.getElementById("month-label"),
    document.getElementById("year-label"),
  ];
  const errors = [
    document.getElementById("day-error"),
    document.getElementById("month-error"),
    document.getElementById("year-error"),
  ];

  inputs.forEach((input, index) => {
    input.classList.remove(
      "border-red-500",
      "focus:border-red-500",
      "focus:ring-red-100",
    );
    input.classList.add("border-gray-300", "focus:border-purple-500");

    if (labels[index]) {
      labels[index].classList.remove("text-red-500");
      labels[index].classList.add("text-gray-400");
    }

    if (errors[index]) {
      errors[index].textContent = "";
    }
  });
}

function resetOutputs() {
  yearsOutput.textContent = "--";
  monthsOutput.textContent = "--";
  daysOutput.textContent = "--";
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Stop page reload

  clearErrors();

  const dayVal = dayInput.value.trim();
  const monthVal = monthInput.value.trim();
  const yearVal = yearInput.value.trim();

  const day = parseInt(dayVal);
  const month = parseInt(monthVal);
  const year = parseInt(yearVal);

  const dayLabel = document.getElementById("day-label");
  const monthLabel = document.getElementById("month-label");
  const yearLabel = document.getElementById("year-label");

  const dayError = document.getElementById("day-error");
  const monthError = document.getElementById("month-error");
  const yearError = document.getElementById("year-error");

  let hasError = false;

  if (!dayVal) {
    setError(dayInput, dayLabel, dayError, "This field is required");
    hasError = true;
  }
  if (!monthVal) {
    setError(monthInput, monthLabel, monthError, "This field is required");
    hasError = true;
  }
  if (!yearVal) {
    setError(yearInput, yearLabel, yearError, "This field is required");
    hasError = true;
  }

  if (hasError) {
    resetOutputs();
    return;
  }

  const currentYear = new Date().getFullYear();

  if (day < 1 || day > 31) {
    setError(dayInput, dayLabel, dayError, "Must be a valid day");
    hasError = true;
  }
  if (month < 1 || month > 12) {
    setError(monthInput, monthLabel, monthError, "Must be a valid month");
    hasError = true;
  }
  if (year > currentYear) {
    setError(yearInput, yearLabel, yearError, "Must be in the past");
    hasError = true;
  }

  if (hasError) {
    resetOutputs();
    return;
  }

  const testDate = new Date(year, month - 1, day);
  if (
    testDate.getFullYear() !== year ||
    testDate.getMonth() + 1 !== month ||
    testDate.getDate() !== day
  ) {
    setError(dayInput, dayLabel, dayError, "Must be a valid date");
    resetOutputs();
    return;
  }

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;

  let calcYears = currentYear - year;
  let calcMonths = currentMonth - month;
  let calcDays = currentDay - day;

  if (calcDays < 0) {
    calcMonths--;
    const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();
    calcDays += prevMonthDays;
  }

  if (calcMonths < 0) {
    calcYears--;
    calcMonths += 12;
  }

  yearsOutput.textContent = calcYears;
  monthsOutput.textContent = calcMonths;
  daysOutput.textContent = calcDays;
});
