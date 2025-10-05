const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('scoreDisplay');

let score = 0;
let playerPos = { top: 225, left: 225 };

// Popup elements
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupText = document.getElementById('popupText');
const popupImage = document.getElementById('popupImage');
const closeBtn = document.getElementById('closeBtn');

// Mensajes románticos para cada hito
const messages = {
    5: {
        title: "💌 Primeros 5 corazones 💌",
        text: "Mi chiquita hermosa, cada día a tu lado es un regalo. Gracias por estos 5 meses llenos de amor 💖",
        image: "recuerdo1.jpg"
    },
    10: {
        title: "💌 10 corazones 💌",
        text: "Morcito, eres mi alegría y mi fuerza. Cada corazón atrapado es un abrazo mío para ti 💕",
        image: "recuerdo2.jpg"
    },
    15: {
        title: "💌 15 corazones 💌",
        text: "Mi Winnie Pooh, tu amor hace que todo valga la pena. 15 corazones reflejan lo feliz que soy a tu lado 💖",
        image: "recuerdo3.jpg"
    },
    20: {
        title: "💌 20 corazones 💌",
        text: "Mi amor, gracias por ser la mamá increíble y mujer fuerte que eres. Cada corazón me hace amarte más ✨",
        image: "recuerdo4.jpg"
    },
    25: {
        title: "💌 25 corazones 💌",
        text: "Mi chiquita hermosa, llegamos a 25 corazones ❤️. Gracias por estos 5 meses maravillosos. Te adoro 😘",
        image: "recuerdo5.jpg"
    }
};

// Función para mover jugador
function move(direction) {
    const step = 20;
    if (direction === 'up' && playerPos.top > 0) playerPos.top -= step;
    if (direction === 'down' && playerPos.top < gameArea.clientHeight - 50) playerPos.top += step;
    if (direction === 'left' && playerPos.left > 0) playerPos.left -= step;
    if (direction === 'right' && playerPos.left < gameArea.clientWidth - 50) playerPos.left += step;
    player.style.top = playerPos.top + 'px';
    player.style.left = playerPos.left + 'px';

    checkCollision();
}

// Crear corazones
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.top = Math.random() * (gameArea.clientHeight - 40) + 'px';
    heart.style.left = Math.random() * (gameArea.clientWidth - 40) + 'px';

    gameArea.appendChild(heart);

    // Movimiento aleatorio
    setInterval(() => {
        heart.style.top = Math.random() * (gameArea.clientHeight - 40) + 'px';
        heart.style.left = Math.random() * (gameArea.clientWidth - 40) + 'px';
    }, 1500 + Math.random() * 1000);
}

// Detectar colisión
function checkCollision() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        const h = heart.getBoundingClientRect();
        const p = player.getBoundingClientRect();

        if (
            p.left < h.left + h.width &&
            p.left + p.width > h.left &&
            p.top < h.top + h.height &&
            p.top + p.height > h.top
        ) {
            heart.remove();
            score++;
            scoreDisplay.textContent = `Corazones capturados: ${score}`;
            showCard(score);
            createHeart();
        }
    });
}

// Mostrar popup
function showCard(score) {
    if (messages[score]) {
        popupTitle.textContent = messages[score].title;
        popupText.textContent = messages[score].text;
        popupImage.src = messages[score].image;
        popup.style.display = "block";
    }
}

// Cerrar popup
closeBtn.onclick = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

// Crear primeros 3 corazones
for (let i = 0; i < 3; i++) createHeart();
