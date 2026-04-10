// SESION 5
const carta = document.getElementById("carta");
const boton = document.querySelector(".btn-secreto");
const mensaje = document.querySelector(".mensaje-oculto");

carta.addEventListener("click", () => {
    carta.classList.toggle("abierta");
});

boton.addEventListener("click", (e) => {
    e.stopPropagation();
    mensaje.classList.toggle("mostrar");
});




//SESION 6
const items = document.querySelectorAll(".timeline-item");

function mostrarTimeline() {
    const trigger = window.innerHeight * 0.85;

    items.forEach(item => {
        const top = item.getBoundingClientRect().top;

        if (top < trigger) {
            item.classList.add("show");
        }
    });
}

window.addEventListener("scroll", mostrarTimeline);




// SESION 7
// ===== SECCION 7 =====

// FECHA CORRECTA (IMPORTANTE)
const s7_fechaInicio = new Date(2025, 11, 27, 16, 0, 0).getTime();
// (mes 11 = diciembre porque empieza en 0)

function s7_actualizar() {
    const ahora = new Date().getTime();
    const diff = ahora - s7_fechaInicio;

    if (diff < 0) return;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    document.getElementById("s7-dias").innerText = dias;
    document.getElementById("s7-horas").innerText = horas;
    document.getElementById("s7-minutos").innerText = minutos;
    document.getElementById("s7-segundos").innerText = segundos;
}

setInterval(s7_actualizar, 1000);

// BOTON
const s7_btn = document.querySelector(".s7-btn");
const s7_hidden = document.querySelector(".s7-hidden");

s7_btn.addEventListener("click", () => {
    s7_hidden.classList.toggle("show");
});

// CORAZONES
const s7_canvas = document.getElementById("s7-canvas");
const s7_ctx = s7_canvas.getContext("2d");

s7_canvas.width = window.innerWidth;
s7_canvas.height = window.innerHeight;

let s7_hearts = [];

function s7_crear() {
    s7_hearts.push({
        x: Math.random() * s7_canvas.width,
        y: s7_canvas.height,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1
    });
}

function s7_animar() {
    s7_ctx.clearRect(0, 0, s7_canvas.width, s7_canvas.height);

    s7_hearts.forEach((h, i) => {
        s7_ctx.fillStyle = "#ff4d6d";
        s7_ctx.beginPath();
        s7_ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
        s7_ctx.fill();

        h.y -= h.speed;

        if (h.y < 0) s7_hearts.splice(i, 1);
    });

    requestAnimationFrame(s7_animar);
}

setInterval(s7_crear, 300);
s7_animar();




// SESION 8 
// ===== SECCION 8 =====
// ===== SECCION 8 =====
// ===== SECCION 8 =====

// ELEMENTOS
const s8_si = document.querySelector(".s8-si");
const s8_no = document.querySelector(".s8-no");
const s8_respuesta = document.querySelector(".s8-respuesta");
const s8_container = document.querySelector(".s8-buttons");

// ===== BOTON NO (IMPOSIBLE DE PRESIONAR 😈)
function moverBotonNo() {
    const maxX = s8_container.offsetWidth - s8_no.offsetWidth;
    const maxY = s8_container.offsetHeight - s8_no.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    s8_no.style.left = x + "px";
    s8_no.style.top = y + "px";

    // cambia texto random 😂
    const textos = ["No 💔", "¿Segura? 😢", "Ayyy que mala", "Me voy ", "ayy pero poerque es asi?", "Grosera", "Consideralo", "Maluca Mia🤍" ];
    s8_no.innerText = textos[Math.floor(Math.random() * textos.length)];
}

s8_no.addEventListener("mouseenter", moverBotonNo);
s8_no.addEventListener("mousedown", (e) => {
    e.preventDefault();
    moverBotonNo();
});
s8_no.addEventListener("click", (e) => {
    e.preventDefault();
    moverBotonNo();
});

// ===== BOTON SI (EXPLOSION + MENSAJE)
s8_si.addEventListener("click", () => {
    s8_respuesta.classList.add("show");
    explosionCorazones();
});

// ===== CANVAS CORAZONES BLANCOS
const canvas = document.getElementById("s8-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

// DIBUJAR CORAZON 🤍
function dibujarCorazon(x, y, size) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - size, x - size, y - size, x - size, y);
    ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
    ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y);
    ctx.bezierCurveTo(x + size, y - size, x, y - size, x, y);
    ctx.fill();
}

// CORAZONES FLOTANDO
function crearCorazon() {
    hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: Math.random() * 5 + 2,
        speed: Math.random() * 1.5 + 0.5
    });
}

// EXPLOSION 💥
function explosionCorazones() {
    for (let i = 0; i < 100; i++) {
        hearts.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            size: Math.random() * 8 + 3,
            speedX: Math.random() * 6 - 3,
            speedY: Math.random() * 6 - 3
        });
    }
}

// ANIMACION
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach((h, i) => {
        dibujarCorazon(h.x, h.y, h.size);

        if (h.speedX !== undefined) {
            h.x += h.speedX;
            h.y += h.speedY;
        } else {
            h.y -= h.speed;
        }

        if (h.y < 0 || h.x < 0 || h.x > canvas.width) {
            hearts.splice(i, 1);
        }
    });

    requestAnimationFrame(animar);
}

setInterval(crearCorazon, 400);
animar();



// SESION 9

// ===== SECCION 9 =====
// ===== SECCION 9 SEGURA =====
document.addEventListener("DOMContentLoaded", function () {

    const s9_btn = document.querySelector(".s9-btn");
    const s9_textos = document.querySelector(".s9-textos");
    const s9_section = document.querySelector(".tab9");

    // VALIDAR QUE EXISTA (evita errores)
    if (!s9_btn || !s9_textos || !s9_section) return;

    // BOTON VOLVER ARRIBA
    s9_btn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // EFECTO AL HACER SCROLL
    function s9_mostrar() {
        const top = s9_section.getBoundingClientRect().top;
        const trigger = window.innerHeight * 0.8;

        if (top < trigger) {
            s9_textos.classList.add("show");
        }
    }

    window.addEventListener("scroll", s9_mostrar);

});


// ===== SECCION 9 PELIGROSA (NO RECOMENDADA) =====
document.addEventListener("DOMContentLoaded", function () {

    const botones = document.querySelectorAll(".s12-options button");
    const respuesta = document.querySelector(".s12-respuesta");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            respuesta.innerText = btn.dataset.msg;
        });
    });

});






// SESION CARRUCEL FOTOS 
document.addEventListener("DOMContentLoaded", () => {

    const wrapper = document.querySelector(".s13-wrapper");
    const track = document.querySelector(".s13-track");
    const imgs = document.querySelectorAll(".s13-track img");
    const msg = document.getElementById("s13-msg");

    let isDragging = false;
    let startX = 0;
    let offset = 0;
    let velocity = 0.3; // velocidad automática
    let moved = false;

    // ================= MENSAJES =================
    imgs.forEach(img => {
        img.addEventListener("click", () => {

            // 🔥 evitar click si estaba arrastrando
            if (moved) return;

            msg.innerText = img.dataset.msg;
            msg.classList.add("show");

            msg.style.transform = "scale(1.1)";
            setTimeout(() => {
                msg.style.transform = "scale(1)";
            }, 200);
        });
    });

    // ================= AUTO SCROLL =================
    function autoScroll() {
        if (!isDragging) {
            offset -= velocity;
            track.style.transform = `translateX(${offset}px)`;
        }
        requestAnimationFrame(autoScroll);
    }

    autoScroll();

    // ================= DRAG =================
    function start(x) {
        isDragging = true;
        startX = x;
        moved = false;
    }

    function move(x) {
        if (!isDragging) return;

        const delta = x - startX;

        if (Math.abs(delta) > 5) moved = true;

        // 🔥 actualizar offset en tiempo real (clave)
        offset += delta;

        // 🔥 reiniciar referencia
        startX = x;

        track.style.transform = `translateX(${offset}px)`;
    }

    function end() {
        isDragging = false;
    }

    // ================= PC =================
    wrapper.addEventListener("mousedown", e => start(e.clientX));
    window.addEventListener("mousemove", e => move(e.clientX));
    window.addEventListener("mouseup", end);

    // ================= CELULAR =================
    wrapper.addEventListener("touchstart", e => start(e.touches[0].clientX));
    wrapper.addEventListener("touchmove", e => move(e.touches[0].clientX));
    wrapper.addEventListener("touchend", end);

});

// 🔥 BOTON CARGAR IMAGENES
const loadBtn = document.getElementById("loadImagesBtn");

loadBtn.addEventListener("click", () => {
    const imgs = document.querySelectorAll(".s13-track img");

    imgs.forEach(img => {
        if (!img.src) {
            img.src = img.dataset.src;
        }
    });

    loadBtn.innerText = "Toca cada Recuerdos 💕";
    loadBtn.disabled = true;
});