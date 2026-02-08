
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// DOM елементи
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");

let userSelectedDate = null;
let intervalId = null; // для таймера

// Спочатку кнопка неактивна
startBtn.disabled = true;

// Налаштування Flatpickr
flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });
      startBtn.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false; // кнопка активна
    }
  },
});

// Обробник кнопки Start
startBtn.addEventListener("click", () => {
  if (!userSelectedDate) {
    iziToast.error({ message: "Спочатку виберіть дату!", position: "topRight" });
    return;
  }

  startBtn.disabled = true; // блокуємо кнопку після старту таймера

  // Запускаємо зворотній відлік
  startCountdown(userSelectedDate);
});

// Функція відліку часу
function startCountdown(endDate) {
  // Якщо таймер вже йде, скидаємо його
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    const now = new Date();
    const deltaTime = endDate - now;

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      updateDisplay(0, 0, 0, 0);
      iziToast.success({ message: "Час вийшов!", position: "topRight" });
      startBtn.disabled = false; // кнопка знову активна
      return;
    }

    const time = convertMs(deltaTime);
    updateDisplay(time.days, time.hours, time.minutes, time.seconds);
  }, 1000);
}

// Функція для оновлення відображення
function updateDisplay(days, hours, minutes, seconds) {
  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

// Конвертує мілісекунди в дні, години, хвилини, секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

  
