


const envelope = document.getElementById("open-envelope");
const letter = document.querySelector(".letter");
const letterFlipper = document.getElementById("letter-flipper");

const frontText = document.getElementById("letter-text-front");
const backText = document.getElementById("letter-text-back");

const letterMessage = `Javier,

No sé muy bien cómo empezar esta carta ni cómo poner en palabras todo lo que quiero decirte, jajaja. Supongo que hay cosas que son más difíciles de expresar de lo que parecen, pero hoy es tu día y quería aprovecharlo para escribirte algo que puedas guardar.

Hoy cumples 18 años, y espero de corazón que esta nueva etapa de tu vida venga llena de alegría, risas, amor y emoción. Espero que consigas todo aquello que te propongas, que nunca dejes de perseguir tus sueños y que no permitas que nadie te haga sentir  que no eres capaz de conseguir lo que quieres.

Tienes un corazón precioso. Nunca dejes que nadie te haga dudar de ello. No dejes que nadie cambie quién eres ni que te haga sentir que tienes que ser alguien distinto.

Mereces muchísimo más de lo que a veces crees merecer. Y, sinceramente, me siento muy afortunada de haberte conocido y de poder tenerte en mi vida. Gracias por todo, incluso por esas pequeñas cosas de las que quizá ni siquiera te das cuenta, pero que significan más de lo que imaginas.
Te quiero mucho mi jirafa

[BIRTHDAY_BUTTON]

`;

let typingStarted = false;
let showingBack = false;
let flipInProgress = false;
let index = 0;


function getCurrentText() {
    return showingBack ? backText : frontText;
}


function fitsOnPage(element) {
    const side = element.parentElement;
    const style = getComputedStyle(side);

    const verticalPadding =
        parseFloat(style.paddingTop) +
        parseFloat(style.paddingBottom);

    return element.scrollHeight + verticalPadding
        <= side.clientHeight + 1;
}




function flipToBack() {
    if (showingBack || flipInProgress) {
        return;
    }

    flipInProgress = true;

    letter.classList.add("is-flipped");

    setTimeout(function () {
        showingBack = true;
        flipInProgress = false;
        typeCharacter();
    }, 650);
}




function showBirthdayConfetti() {
    const container =
        document.getElementById("birthday-confetti");

    if (!container) return;

    const colors = [
        "#1C2638",
        "#465775",
        "#A6B2C5",
        "#E2E3E6",
        "#7184A3"
    ];

    const shapes = ["♥", "✦", "●", "🎈"];

    for (let i = 0; i < 100; i++) {
        const particle = document.createElement("span");

        particle.className = "birthday-particle";

        particle.textContent =
            shapes[Math.floor(Math.random() * shapes.length)];

        particle.style.left = Math.random() * 100 + "vw";

        particle.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        particle.style.fontSize =
            (14 + Math.random() * 20) + "px";

        particle.style.setProperty(
            "--duration",
            (3 + Math.random() * 3) + "s"
        );

        particle.style.setProperty(
            "--drift",
            (Math.random() * 200 - 100) + "px"
        );

        particle.style.setProperty(
            "--rotation",
            (Math.random() * 720 - 360) + "deg"
        );

        container.appendChild(particle);

        particle.addEventListener("animationend", function () {
            particle.remove();
        });
    }
}




function typeCharacter() {
    if (flipInProgress) return;

    if (index >= letterMessage.length) {
        return;
    }

    const buttonMarker = "[BIRTHDAY_BUTTON]";
    const currentText = getCurrentText();

    if (letterMessage.startsWith(buttonMarker, index)) {
        const button = document.createElement("button");

        button.id = "birthday-surprise";
        button.className = "birthday-surprise";
        button.type = "button";
        button.textContent = "Feliz cumpleaños ♡";

        button.addEventListener("click", showBirthdayConfetti);

        currentText.appendChild(button);

        if (!fitsOnPage(currentText)) {
            button.remove();

            if (!showingBack) {
                flipToBack();
                return;
            }

            // Keep the button if the back page is also full.
            currentText.appendChild(button);
        }

        index += buttonMarker.length;

        setTimeout(typeCharacter, 180);
        return;
    }

    const character = letterMessage.charAt(index);
    const textNode = document.createTextNode(character);

    currentText.appendChild(textNode);

    if (!fitsOnPage(currentText) && !showingBack) {
        textNode.remove();
        flipToBack();
        return;
    }

    index++;

    let delay = 35;

    if (".!?".includes(character)) {
        delay = 450;
    } else if (",;:".includes(character)) {
        delay = 200;
    } else if (character === "\n") {
        delay = 180;
    }

    setTimeout(typeCharacter, delay);
}


function typeLetter() {
    index = 0;
    showingBack = false;
    flipInProgress = false;

    frontText.textContent = "";
    backText.textContent = "";

    letter.classList.remove("is-flipped");

    typeCharacter();
}


if (envelope && letter && frontText && backText) {
    envelope.addEventListener("change", function () {
        if (envelope.checked && !typingStarted) {
            typingStarted = true;

            setTimeout(typeLetter, 1000);
        }
    });
}




const cassetteButton =
    document.getElementById("cassette-button");

const playlistWindow =
    document.getElementById("playlist-window");

const playlistClose =
    document.getElementById("playlist-close");

const spotifyEmbed =
    document.getElementById("spotify-embed");

const playlistPlaceholder =
    document.getElementById("playlist-placeholder");

const spotifyPlaylistUrl =
    "https://open.spotify.com/playlist/4ySeYhai6bv8ufuWSjhRAg?si=hHh5PkBiRcWBPRBh2fY7aw";


function openPlaylist() {
    if (!playlistWindow || !cassetteButton) return;

    playlistWindow.hidden = false;
    cassetteButton.setAttribute("aria-expanded", "true");

    const playlistId = spotifyPlaylistUrl.match(
        /playlist\/([a-zA-Z0-9]+)/
    );

    if (playlistId && spotifyEmbed) {
        spotifyEmbed.src =
            `https://open.spotify.com/embed/playlist/${playlistId[1]}`;

        if (playlistPlaceholder) {
            playlistPlaceholder.style.display = "none";
        }
    }
}


function closePlaylist() {
    if (!playlistWindow || !cassetteButton) return;

    playlistWindow.hidden = true;
    cassetteButton.setAttribute("aria-expanded", "false");
}


if (cassetteButton && playlistWindow) {
    cassetteButton.addEventListener("click", function () {
        if (playlistWindow.hidden) {
            openPlaylist();
        } else {
            closePlaylist();
        }
    });
}

if (playlistClose) {
    playlistClose.addEventListener("click", closePlaylist);
}

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        playlistWindow &&
        !playlistWindow.hidden
    ) {
        closePlaylist();
    }
});




const starCanvas = document.getElementById("starfield");
const starCtx = starCanvas
    ? starCanvas.getContext("2d")
    : null;

let stars = [];
let width = 0;
let height = 0;
let pixelRatio = 1;

const pointer = {
    x: -1000,
    y: -1000,
    active: false
};




function createStarfield() {
    if (!starCanvas || !starCtx) return;

    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    starCanvas.width = width * pixelRatio;
    starCanvas.height = height * pixelRatio;

    starCanvas.style.width = `${width}px`;
    starCanvas.style.height = `${height}px`;

    starCtx.setTransform(
        pixelRatio, 0, 0, pixelRatio, 0, 0
    );

    const amount = Math.floor((width * height) / 4500);

    
    stars = Array.from({ length: amount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.3,
        brightness: Math.random() * 0.5 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.8 + 0.3,
        glow: 0,
        heartStar: false
    }));

   
    const heartPoints = [];

    const scaleX = Math.min(width * 0.42, 220);
    const scaleY = Math.min(height * 0.16, 120);

    const centerX = width / 2;
    const centerY = height * 0.49;

    const pointCount = 54;

    for (let i = 0; i < pointCount; i++) {
        const t = (Math.PI * 2 * i) / pointCount;

        // Parametric heart curve.
        const hx = 16 * Math.pow(Math.sin(t), 3);

        const hy =
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t);

  
        const jitterX = (Math.random() - 0.5) * 5;
        const jitterY = (Math.random() - 0.5) * 5;

        heartPoints.push({
            x: centerX + (hx / 17) * scaleX + jitterX,
            y: centerY - (hy / 17) * scaleY + jitterY,
            radius: Math.random() * 0.8 + 0.65,
            brightness: Math.random() * 0.25 + 0.4,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.6 + 0.3,
            glow: 0,
            heartStar: true
        });
    }

    stars.push(...heartPoints);
}




function illuminateStars(x, y) {
    pointer.x = x;
    pointer.y = y;
    pointer.active = true;

    for (const star of stars) {
        const dx = star.x - x;
        const dy = star.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 65) {
            star.glow = Math.max(
                star.glow,
                (1 - distance / 65) * 1.5
            );
        }
    }
}




if (starCanvas && starCtx) {
    window.addEventListener("pointermove", function (event) {
        illuminateStars(event.clientX, event.clientY);
    });

    window.addEventListener("pointerdown", function (event) {
        illuminateStars(event.clientX, event.clientY);
    });

    window.addEventListener("pointerleave", function () {
        pointer.active = false;
    });

    window.addEventListener("resize", createStarfield);
}


/* Draw and animate the sky. */

function drawStarfield(time) {
    if (!starCanvas || !starCtx) return;

    starCtx.clearRect(0, 0, width, height);

    for (const star of stars) {
        const twinkle =
            Math.sin(
                time * 0.001 * star.speed + star.phase
            ) * 0.15;

        const opacity = Math.max(
            0.1,
            Math.min(1, star.brightness + twinkle)
        );

      
        star.glow *= 0.94;

        
        if (star.glow > 0.03) {
            const halo = starCtx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, 24 * star.glow
            );

            halo.addColorStop(
                0,
                `rgba(190, 215, 255, ${
                    Math.min(0.65, star.glow * 0.4)
                })`
            );

            halo.addColorStop(
                1,
                "rgba(120, 160, 255, 0)"
            );

            starCtx.fillStyle = halo;
            starCtx.beginPath();

            starCtx.arc(
                star.x,
                star.y,
                24 * star.glow,
                0,
                Math.PI * 2
            );

            starCtx.fill();
        }

        
        const baseOpacity = star.heartStar
            ? Math.min(1, opacity + 0.08 + star.glow * 0.25)
            : Math.min(1, opacity + star.glow);

        starCtx.beginPath();

        starCtx.arc(
            star.x,
            star.y,
            star.radius + star.glow * 0.8,
            0,
            Math.PI * 2
        );

        starCtx.fillStyle =
            `rgba(225, 235, 255, ${baseOpacity})`;

        starCtx.shadowBlur = star.heartStar
            ? 3 + star.glow * 8
            : star.glow > 0.1
                ? 12 * star.glow
                : 0;

        starCtx.shadowColor = "#A6C8FF";

        starCtx.fill();

        starCtx.shadowBlur = 0;
    }

    requestAnimationFrame(drawStarfield);
}




if (starCanvas && starCtx) {
    createStarfield();
    requestAnimationFrame(drawStarfield); 
}
