// variables/constants
const startButton = document.querySelector('#start');
const killButton = document.querySelector('#kill');
const warningDisplay = document.querySelector('#warning');
const resetButton = document.getElementById('reset');
let counterDisplay = document.querySelector('#counter');
let resultDisplay = document.querySelector('#result');
let countdownDisplay = document.querySelector('#countdown');
let countdown = document.querySelector('#countdown-timer');
let result = document.querySelector('#result-text');
let counter = 0;
let gameStarted = false;
let mouseoverActive = true;

// killbutton click en dehors du start a cause du reset
killButton.addEventListener('click', () => {
    if (!gameStarted) return;
        counter++;
        counterDisplay.textContent = counter;
});

// warning message hover
startButton.addEventListener('mouseover', () => {
    if (!mouseoverActive) return;
    warningDisplay.style.display = 'block';
});
startButton.addEventListener('mouseout', () => {
    warningDisplay.style.display = 'none';
});

// start the game
startButton.addEventListener('click', () => {
    if(confirm("Un timer de 5 secondes va démarrer. Cliquez sur OK et ensuite cliquez sur 'Kill' le plus rapidement possible.")) {
        //timer countdown
        countdownDisplay.style.display = 'block';
        startButton.disabled = true;
        mouseoverActive = false;
        countdownDisplay.textContent = '5';
        setTimeout(() => {
            countdownDisplay.textContent = '4';
            setTimeout(() => {
                countdownDisplay.textContent = '3';
                setTimeout(() => {
                    countdownDisplay.textContent = '2';
                    setTimeout(() => {
                        countdownDisplay.textContent = '1';
                        // start game
                        setTimeout(function() {
                            countdownDisplay.textContent = 'Cliquez !';
                            countdown.style.display = 'inline-block';
                            countdown.textContent = '60';
                            let timeLeft = 60;
                            const timerInterval = setInterval(() => {
                                timeLeft--;
                                countdown.textContent = timeLeft;
                                if (timeLeft <= 0) {
                                    clearInterval(timerInterval);
                                }
                            }, 1000);
                            gameStarted = true;
                            counter = 0;
                            counterDisplay.textContent = counter;
                            resultDisplay.textContent = '';
                            killButton.disabled = false;
                        }, 1000);
                        // end game
                        setTimeout(() => {
                            gameStarted = false;
                            countdownDisplay.style.display = 'none';
                            startButton.disabled = false;
                            killButton.disabled = true;
                            resultDisplay.style.display = 'block';
                            resultDisplay.textContent = `Vous avez un score de ${counter} frags !`;
                            result.style.display = 'block';
                            if (counter < 100) {
                                resetButton.style.display = 'inline-block';
                                result.textContent = "tu sais il y a pas de limite de click par secondes.";
                            } else if (counter >= 100 && counter <= 300) {
                                resetButton.style.display = 'inline-block';
                                result.textContent = "Ah bah la on parle, même si ça aurait pu être mieux.";
                            } else if (counter > 300 && counter <= 400) {
                                resetButton.style.display = 'inline-block';
                                result.textContent = "attention ta souris va se casser, non je blague, il y tellement plus haut comme score";
                            } else if (counter > 400 && counter < 500) {
                                resetButton.style.display = 'inline-block';
                                result.textContent = "ouh la on a un pro du mashing de souris ici !";
                            } else if (counter >= 500) {
                                resetButton.style.display = 'inline-block';
                                result.innerHTML = 'En voila un qui connais la technique de mettre sa souris de coté pour spam avec deux doigts au lieu d\'un !<img src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" class="victory-gif" alt="Victoire !" style="width:120px;display:block;margin:1em auto;">';
                            }
                                countdown.style.display = 'none';
                        }, 61000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }
});

// reset button
resetButton.addEventListener('click', () => {
    // Réinitialise tous les états et affichages
    counter = 0;
    gameStarted = false;
    mouseoverActive = true;
    startButton.disabled = false;
    document.querySelector('.container').style.marginTop = '100px';
    killButton.disabled = true;
    counterDisplay.textContent = '';
    resultDisplay.textContent = '';
    resultDisplay.style.display = 'none';
    result.style.display = 'none';
    countdownDisplay.style.display = 'none';
    countdown.style.display = 'none';
    warningDisplay.style.display = 'none';
    resetButton.style.display = 'none';
});