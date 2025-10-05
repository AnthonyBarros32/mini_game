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
        title: "💌 Primeras 5 capturas del Amor de Mi Vida 💌",
        text: "💌 💌 Mi chiquita hermosa, hoy celebramos 5 meses juntos y atraparte en este juego me hace sonreír recordando cada momento a tu lado. Cada día contigo es un regalo que atesoro en mi corazón. Eres mi alegría, mi ternura y mi razón para sonreír siempre 😘.",
        image: "recuerdo1.jpg"
    },
    10: {
        title: "💌 10 capturas de mi vidita 💌",
        text: "💌 Mi amor, en estos 5 meses he visto tu pasión y talento en todo lo que haces, especialmente en el arte de los tatuajes. Me inspiras con tu dedicación y profesionalismo, y cada día me siento más orgulloso de ti y de la mujer increíble que eres 💖.",
        image: "recuerdo2.jpg"
    },
    15: {
        title: "💌 15 capturas de mi Winnie Pooh 💌",
        text: "💌 Mi Winnie Pooh, celebrar 5 meses contigo me hace sentir muy feliz y agradecido por cada momento. Cada vez que te “atrapo” en este juego siento que te abrazo de verdad, y tu dulzura y alegría hacen que todo sea más hermoso 😍.",
        image: "recuerdo3.jpg"
    },
    20: {
        title: "💌 20 capturas de mi chiquita hermosa 💌",
        text: "💌 Mi vida, estos 5 meses a tu lado me han enseñado lo maravilloso que es compartir la vida contigo. Me enamora ver cómo cuidas y amas a tus hijitos, con tanta paciencia y ternura. Eres una mamá increíble y una mujer llena de amor ✨.",
        image: "recuerdo4.jpg"
    },
    25: {
        title: "💌 25 capturas de mi amorcito 💌",
        text: "💌 Mi morcito, estos 5 meses contigo han sido los más hermosos de mi vida. Gracias por ser mi chiquita hermosa, mi Winnie Pooh, mi vida entera. Tu amor, tu ternura y tu dedicación en todo lo que haces me inspiran cada día. Te adoro con todo mi corazón y quiero celebrar muchos más meses a tu lado ❤️.",
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
    }, 3500 + Math.random() * 2000);
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

            // Si llegamos al último mensaje, reiniciar después de 8 segundos
            if (score >= 25) {
                setTimeout(() => {
                    resetGame();
                }, 8000); // 8 segundos para que lea el mensaje final
            }
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

function resetGame() {
    // Reinicia el marcador
    score = 0;
    scoreDisplay.textContent = `Corazones capturados: ${score}`;
    
    // Elimina todas las fotos existentes
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(h => h.remove());

    // Crea nuevamente los primeros 3 corazones
    for (let i = 0; i < 3; i++) createHeart();
}