// --- 1. EFECTO DEL CONDÓN INTERACTIVO ---
const imagenCondon = document.getElementById('img-condon');

// Verificamos si la imagen existe en esta página antes de darle el sonido
if (imagenCondon) {
    // Nota: ajusta la ruta del audio según la página en la que estés si es necesario
    const sonidoEstirar = new Audio('audio/boing.mp3'); 
    
    imagenCondon.addEventListener('mousedown', function() {
        sonidoEstirar.currentTime = 0; 
        sonidoEstirar.play();
    });
}

// --- 2. CONTADOR DE VISITAS ---
document.addEventListener('DOMContentLoaded', function() {
    const elementoVisitas = document.getElementById('numero-visitas');
    
    // Verificamos si el contador existe en esta página
    if (elementoVisitas) {
        let visitas = localStorage.getItem('contadorVisitas');
        
        if (visitas === null) {
            visitas = 1240; 
        } else {
            visitas = parseInt(visitas) + 1;
        }
        
        localStorage.setItem('contadorVisitas', visitas);
        elementoVisitas.textContent = visitas.toString().padStart(4, '0');
    }
});

// --- 3. FUNCIONALIDAD DEL MENÚ HAMBURGUESA ---
document.addEventListener('DOMContentLoaded', function() {
    const btnHamburguesa = document.getElementById('btn-hamburguesa');
    const menuPrincipal = document.getElementById('menu-principal');

    // Verificamos si la hamburguesa y el menú existen
    if(btnHamburguesa && menuPrincipal) {
        btnHamburguesa.addEventListener('click', function() {
            menuPrincipal.classList.toggle('activo');
        });
    }
});

// --- 4. QUIZ INTERACTIVO (Mitos y Realidades) ---
function responderQuiz(boton, esCorrecto, explicacion) {
    // Buscar la tarjeta donde el usuario hizo clic
    const contenedor = boton.parentElement.parentElement;
    const botones = contenedor.querySelectorAll('.btn-quiz');
    const mensaje = contenedor.querySelector('.mensaje-quiz');

    // Desactivar ambos botones para que no pueda hacer trampa y cambiar su respuesta
    botones.forEach(b => {
        b.disabled = true;
        b.style.opacity = '0.6';
        b.style.cursor = 'default';
        b.style.transform = 'none'; // Quita el salto del hover
    });

    // Resaltar solo el botón que presionó
    boton.style.opacity = '1';

    // Mostrar el mensaje de si atinó o falló
    if (esCorrecto) {
        boton.style.backgroundColor = '#27ae60'; // Verde de éxito
        mensaje.innerHTML = '<strong>✅ ¡Correcto!</strong> ' + explicacion;
        mensaje.style.borderLeftColor = '#27ae60';
        mensaje.style.color = '#1e8449';
    } else {
        boton.style.backgroundColor = '#e74c3c'; // Rojo de error
        mensaje.innerHTML = '<strong>❌ ¡Caíste en el mito!</strong> ' + explicacion;
        mensaje.style.borderLeftColor = '#e74c3c';
        mensaje.style.color = '#c0392b';
    }
    
    // Hacemos aparecer el texto suavemente
    mensaje.style.display = 'block';
}

// --- 5. ANIMACIÓN DE ESTADÍSTICAS (Página: Por qué importa) ---
document.addEventListener('DOMContentLoaded', function() {
    const contadores = document.querySelectorAll('.numero-animado');
    
    // Si estamos en la página correcta y existen los contadores...
    if(contadores.length > 0) {
        contadores.forEach(contador => {
            const actualizarContador = () => {
                const objetivo = +contador.getAttribute('data-target'); // El número meta (ej. 50, 100, 30)
                const actual = +contador.innerText; // El número donde va
                
                // Calculamos qué tan rápido debe subir
                const incremento = objetivo / 50; 
                
                if (actual < objetivo) {
                    // Redondea hacia arriba y suma
                    contador.innerText = Math.ceil(actual + incremento);
                    // Repite la función cada 30 milisegundos para crear la animación
                    setTimeout(actualizarContador, 30); 
                } else {
                    // Asegura que termine exactamente en el número meta
                    contador.innerText = objetivo; 
                }
            };
            
            actualizarContador();
        });
    }
});