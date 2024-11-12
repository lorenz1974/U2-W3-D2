const updateTimer = (startedAt) => {
    const now = new Date();
    const differenceInMilliseconds = now.getTime() - startedAt.getTime();

    // Crea una nuova data basata sulla differenza in millisecondi
    let timerDate = new Date(differenceInMilliseconds);

    // Estrai ore, minuti e secondi dalla differenza
    let hours = timerDate.getUTCHours();
    let minuts = timerDate.getUTCMinutes();
    let seconds = timerDate.getUTCSeconds();

    // Formatta come stringa
    let timerString = `${hours.toString().padStart(2, '0')}:${minuts.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Aggiorna il contenuto di timerDiv
    timerDiv.innerText = timerString;
}


const debuglevel = 3
const timerDiv = document.getElementById('timer')
const timerResettedAt = document.getElementById('timerResettedAt')
const resetButton = document.getElementById('resetButton')
const stopButton = document.getElementById('stopButton')

let intervalId = null
let startedAt = null

// Attiva l'evento al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {


    // Inizializza l'elemento sul bottone dello STOP/RESTART
    stopButton.addEventListener('click', () => {
        if (stopButton.innerText === 'STOP') {
            _W('STOP!')
            clearInterval(intervalId)
            stopButton.innerText = 'RESTART'
        }
        else {
            _W('RESTART!')
            intervalId = setInterval(updateTimer, 1000, startedAt);

            stopButton.innerText = 'STOP'
        }
    })

    // Legge la variabile si sessione
    const sessionStartAt = sessionStorage.getItem('startedAt')
    _W(`sessionStartAt: ${sessionStartAt}`)

    // Controlla se la variabile di sessione esiste
    if (sessionStartAt === null) {
        // Se non esiste la setta...
        startedAt = new Date()
        _W(`startedAt: ${startedAt}`)
        sessionStorage.setItem('startedAt', startedAt)
    }
    else {
        // ... altrimenti recupera il valore e setta la variabile globale
        startedAt = new Date(sessionStartAt)
    }

    // Pubblica la data di inizio del cronometro
    timerResettedAt.innerHTML = `
        <p class="text-center">Timer started at:</p>
        <p class="fw-bold text-center">${startedAt}</p>
    `

    // Attiva l'intervallo di aggiornamento
    intervalId = setInterval(updateTimer, 1000, startedAt);


    // Inizializza l'evento sul bottone del reset
    resetButton.addEventListener('click', () => {
        _W('RESET!... But you don\'t see this in console...')
        sessionStorage.clear()
        location.reload()
    })



})