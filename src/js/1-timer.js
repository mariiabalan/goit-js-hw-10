import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate; 
let countdownInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const currentDate = new Date();

        if (userSelectedDate < currentDate) {
            window.alert("Please choose a date in the future");
            disableButton();
        } else {
            enableButton();
        }
    },
};

flatpickr("#datetime-picker", options);

function disableButton() {
    const button = document.querySelector("[data-start]");
    button.disabled = true;
}

function enableButton() {
    const button = document.querySelector("[data-start]");
    button.disabled = false;
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateTimer(days, hours, minutes, seconds) {
    document.querySelector("[data-days]").textContent = days;
    document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
    document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
    document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}

function startTimer() {
    disableButton();
    document.querySelector("#datetime-picker").disabled = true;

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = userSelectedDate.getTime() - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            document.querySelector("#datetime-picker").disabled = false;
            iziToast.show({
                title: 'Time is up!',
                message: 'The countdown has reached zero.',
                color: 'green',
                position: 'topCenter'
            });
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(distance);
        updateTimer(days, hours, minutes, seconds);
    }, 1000);
}

document.querySelector("[data-start]").addEventListener("click", startTimer);