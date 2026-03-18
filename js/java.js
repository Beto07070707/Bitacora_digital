const celdas = document.querySelectorAll('.celda');
const mensajeJuego = document.getElementById('mensaje-juego');
const btnReiniciar = document.getElementById('btn-reiniciar');
let tablero = ['', '', '', '', '', '', '', '', ''];
let jugadorActual = 'X';
let juegoActivo = true;

const condicionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

function manejarClickCelda(e) {
    const celda = e.target;
    const indice = celda.getAttribute('data-indice');

    if (tablero[indice] !== '' || !juegoActivo) return;

    tablero[indice] = jugadorActual;
    celda.innerText = jugadorActual;
    celda.classList.add(jugadorActual.toLowerCase());

    verificarGanador();
}

function verificarGanador() {
    let rondaGanada = false;
    for (let i = 0; i < condicionesGanadoras.length; i++) {
        const [a, b, c] = condicionesGanadoras[i];
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            rondaGanada = true;
            break;
        }
    }

    if (rondaGanada) {
        mensajeJuego.innerText = `El jugador ${jugadorActual} ha ganado`;
        juegoActivo = false;
        return;
    }

    if (!tablero.includes('')) {
        mensajeJuego.innerText = 'Empate';
        juegoActivo = false;
        return;
    }

    jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    mensajeJuego.innerText = `Turno del jugador ${jugadorActual}`;
}

function reiniciarJuego() {
    tablero = ['', '', '', '', '', '', '', '', ''];
    jugadorActual = 'X';
    juegoActivo = true;
    mensajeJuego.innerText = `Turno del jugador ${jugadorActual}`;
    celdas.forEach(celda => {
        celda.innerText = '';
        celda.classList.remove('x', 'o');
    });
}

celdas.forEach(celda => celda.addEventListener('click', manejarClickCelda));
btnReiniciar.addEventListener('click', reiniciarJuego);