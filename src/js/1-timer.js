
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");

let userSelectedDate = null;

// Спочатку кнопка неактивна
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        console.log("Вибрана дата:", selectedDate);
      
        // Перевірка: чи дата в майбутньому?
        if (selectedDate <= new Date()) {
            iziToast.error({
            message: "Please choose a date in the future"
            });
            startBtn.disabled = true;
            userSelectedDate = null;
        } else {
            userSelectedDate = selectedDate;
            startBtn.disabled = false;  // ✅ активуємо кнопку
        }
    }
};

flatpickr(input, options);

startBtn.addEventListener("click", handleClickBtn);

function handleClickBtn(event) {
    if (!userSelectedDate) {
        alert("Спочатку виберіть дату!");
        return;
    }
    
    console.log("Запуск таймера до:", userSelectedDate);
     startBtn.disabled = true;
    
    // Тут запускаєте зворотній відлік
    startCountdown(userSelectedDate);
}

// Функція зворотного відліку
function startCountdown(endDate) {
    const intervalId = setInterval(() => {
        const now = new Date();
        const deltaTime = endDate - now;
        
        if (deltaTime <= 0) {
            clearInterval(intervalId);
            console.log("Час вийшов!");
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            //startBtn.disabled = false;
            return;
        }
        
        // Конвертуємо мілісекунди в дні, години, хвилини, секунди
        const days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((deltaTime % (1000 * 60)) / 1000);
        
        // Оновлюємо UI
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
        
    }, 1000);
}
  
