function chrono() {
    let seconds = 0;
    let minutes = 0;
    let minutedisplay = "";
    let secondsdisplay = "";
    const intervalId = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes < 10) {
            minutedisplay = "0" + minutes;
        } else {
            minutedisplay = minutes;
        }
        if (seconds < 10) {
            secondsdisplay = "0" + seconds;
        } else {
            secondsdisplay = seconds;
        }
        document.querySelector("#content").innerText = `${minutedisplay} : ${secondsdisplay}`;
    }, 1000);
}
chrono();