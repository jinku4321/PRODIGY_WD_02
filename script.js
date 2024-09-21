let milliseconds = 0;
let intervalId = null;
let isRunning = false;

const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapTimesElement = document.getElementById("lap-times");

function updateDisplay() {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10); // Renamed to avoid conflict

    hoursElement.textContent = hours.toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    secondsElement.textContent = seconds.toString().padStart(2, "0");
    millisecondsElement.textContent = centiseconds.toString().padStart(2, "0");
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(() => {
            milliseconds += 10;
            updateDisplay();
        }, 10);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
    }
}

function resetStopwatch() {
    milliseconds = 0;
    updateDisplay();
    if (isRunning) {
        pauseStopwatch();
    }
    lapTimesElement.innerHTML = ""; // Clear lap times on reset
}

function recordLapTime() {
    const lapTime = `${hoursElement.textContent}:${minutesElement.textContent}:${secondsElement.textContent}.${millisecondsElement.textContent}`;
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapTimesElement.appendChild(lapItem);
}

startButton.addEventListener("click", startStopwatch);
pauseButton.addEventListener("click", pauseStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLapTime);
