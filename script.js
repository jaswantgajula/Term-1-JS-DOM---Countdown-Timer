const input = document.getElementById('secondsInput');
const startBtn = document.getElementById('startBtn');
const display = document.getElementById('display');
const beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");

let currentTimer = null;
let notificationPermissionRequested = false;

startBtn.addEventListener("click", () => {
    // Remove finished class
    display.classList.remove("finished");

    
    const seconds = Number(input.value);

    if (!input.value || isNaN(seconds) || seconds <= 0) {
        alert("Please enter a valid positive number of seconds!");
        return;
    }

    
    if (currentTimer) {
        clearInterval(currentTimer);
    }

    //Notification permission
    if (!notificationPermissionRequested) {
        Notification.requestPermission();
        notificationPermissionRequested = true;
    }

    // Disable button and update display
    startBtn.disabled = true;
    startBtn.textContent = "Running...";
    display.textContent = `Time Left: ${seconds}`;

    let timeLeft = seconds;

    currentTimer = setInterval(() => {
        timeLeft--;
        display.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            currentTimer = null;
            display.textContent = "Time is up!";
            display.classList.add("finished");

            
            if (Notification.permission === "granted") {
                new Notification("Timer finished!", {
                    body: `Your ${seconds} second countdown is complete!`,
                    icon: "https://cdn-icons-png.flaticon.com/512/3652/3652191.png"
                });
            }

            beep.play();

            // Re-enable button
            startBtn.disabled = false;
            startBtn.textContent = "Start";
        }
    }, 1000);
});