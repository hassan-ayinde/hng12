function updateUTCTime() {
    const utcTimeElement = document.getElementById('utc-time');
    const now = new Date();
    const utcString = now.toUTCString();
    utcTimeElement.textContent = utcString;
}

// Update time on load
updateUTCTime();
