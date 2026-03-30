const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const lyricsDiv = document.getElementById('lyrics');
const audio = document.getElementById('music');

let width, height;
let stars = [];
let particles = [];
let waveOffset = 0;
let currentLyricIndex = -1;
let animationId;

const lyrics = [
    { time: 0, text: "Under the moonlit sky tonight" },
    { time: 3, text: "Stars dance in your eyes so bright" },
    { time: 6, text: "The mountains stand as silent guards" },
    { time: 9, text: "While love blooms in tranquil yards" },
    { time: 12, text: "Lake reflects the heavens above" },
    { time: 15, text: "Whispering dreams of endless love" },
    { time: 18, text: "In this moment, time stands still" },
    { time: 21, text: "My heart belongs to you, my will" },
    { time: 24, text: "Forever yours, beneath the stars" },
    { time: 27, text: "Together, no matter how far" }
];

class Star {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.6);
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    }

    update() {
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < 0) {
            this.twinkleSpeed = -this.twinkleSpeed;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
        ctx.restore();
    }
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.glowIntensity = Math.random() * 0.3 + 0.2;
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        if (this.y < -50) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 200, ${this.glowIntensity})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 150, ${this.glowIntensity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 100, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initScene();
}

function initScene() {
    stars = [];
    particles = [];
    
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }
    
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle());
    }
}

function drawSky() {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0a0e27');
    gradient.addColorStop(0.4, '#1a2347');
    gradient.addColorStop(1, '#2a3f5f');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function drawMoon() {
    const moonX = width * 0.15;
    const moonY = height * 0.15;
    const moonRadius = 60;
    
    ctx.save();
    
    const glowGradient = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonRadius * 3);
    glowGradient.addColorStop(0, 'rgba(255, 255, 200, 0.8)');
    glowGradient.addColorStop(0.3, 'rgba(255, 255, 150, 0.4)');
    glowGradient.addColorStop(0.6, 'rgba(255, 255, 100, 0.2)');
    glowGradient.addColorStop(1, 'rgba(255, 255, 50, 0)');
    
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius * 3, 0, Math.PI * 2);
    ctx.fill();
    
    const moonGradient = ctx.createRadialGradient(moonX - 20, moonY - 20, 0, moonX, moonY, moonRadius);
    moonGradient.addColorStop(0, '#fffff0');
    moonGradient.addColorStop(0.8, '#fffacd');
    moonGradient.addColorStop(1, '#ffd700');
    
    ctx.fillStyle = moonGradient;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawMountains() {
    ctx.save();
    
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.lineTo(width * 0.2, height * 0.4);
    ctx.lineTo(width * 0.35, height * 0.5);
    ctx.lineTo(width * 0.5, height * 0.35);
    ctx.lineTo(width * 0.65, height * 0.45);
    ctx.lineTo(width * 0.8, height * 0.38);
    ctx.lineTo(width, height * 0.6);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(width * 0.18, height * 0.42);
    ctx.lineTo(width * 0.2, height * 0.4);
    ctx.lineTo(width * 0.22, height * 0.44);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(width * 0.48, height * 0.37);
    ctx.lineTo(width * 0.5, height * 0.35);
    ctx.lineTo(width * 0.52, height * 0.39);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(width * 0.78, height * 0.4);
    ctx.lineTo(width * 0.8, height * 0.38);
    ctx.lineTo(width * 0.82, height * 0.42);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#0f0f1e';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.8);
    ctx.lineTo(width * 0.15, height * 0.55);
    ctx.lineTo(width * 0.3, height * 0.65);
    ctx.lineTo(width * 0.45, height * 0.5);
    ctx.lineTo(width * 0.6, height * 0.6);
    ctx.lineTo(width * 0.75, height * 0.52);
    ctx.lineTo(width * 0.9, height * 0.65);
    ctx.lineTo(width, height * 0.75);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
}

function drawLake() {
    ctx.save();
    
    const lakeGradient = ctx.createLinearGradient(0, height * 0.6, 0, height);
    lakeGradient.addColorStop(0, 'rgba(10, 20, 40, 0.8)');
    lakeGradient.addColorStop(0.5, 'rgba(15, 30, 60, 0.9)');
    lakeGradient.addColorStop(1, 'rgba(5, 10, 20, 1)');
    
    ctx.fillStyle = lakeGradient;
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
    
    drawMoonReflection();
    
    ctx.strokeStyle = 'rgba(100, 150, 200, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
            const y = height * 0.65 + i * 20 + Math.sin((x + waveOffset) * 0.01) * 5;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
    
    ctx.restore();
}

function drawMoonReflection() {
    const moonX = width * 0.15;
    const moonY = height * 0.15;
    const moonRadius = 60;
    const reflectionY = height * 0.85;
    
    ctx.save();
    ctx.globalAlpha = 0.4;
    
    ctx.filter = 'blur(3px)';
    
    const reflectionGradient = ctx.createRadialGradient(
        moonX, reflectionY, 0,
        moonX, reflectionY, moonRadius * 1.5
    );
    reflectionGradient.addColorStop(0, 'rgba(255, 255, 200, 0.6)');
    reflectionGradient.addColorStop(0.5, 'rgba(255, 255, 150, 0.3)');
    reflectionGradient.addColorStop(1, 'rgba(255, 255, 100, 0)');
    
    ctx.fillStyle = reflectionGradient;
    ctx.beginPath();
    
    for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
        const x = moonX + Math.cos(angle) * moonRadius * 1.5;
        const waveDistortion = Math.sin((x + waveOffset * 2) * 0.02) * 8;
        const y = reflectionY + Math.sin(angle) * moonRadius * 0.8 + waveDistortion;
        
        if (angle === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
}

function updateLyrics() {
    if (!audio.paused) {
        const currentTime = audio.currentTime;
        let nextLyricIndex = -1;
        
        for (let i = 0; i < lyrics.length; i++) {
            if (currentTime >= lyrics[i].time) {
                nextLyricIndex = i;
            } else {
                break;
            }
        }
        
        if (nextLyricIndex !== currentLyricIndex) {
            currentLyricIndex = nextLyricIndex;
            
            if (currentLyricIndex >= 0) {
                lyricsDiv.style.opacity = '0';
                
                setTimeout(() => {
                    createEnvelope();
                    lyricsDiv.style.opacity = '1';
                }, 500);
            } else {
                lyricsDiv.style.opacity = '0';
            }
        }
    }
}

function createEnvelope() {
    const letterContent = `
        <h3>Para Evelin</h3>
        <p>HERMOSA, CUAL BRISA DE OTOÑO, DUEÑA DE MI PENSAR, Y DE MI ACTUAR, TE VENGO A CONFESAR SOY FIEL Y FIJO ADMIRADOR DE ESA MIRADA, DE TU ACTUAR, DE TU MENTE, DE TU ANIMA, ME ENCANTA SIMPLEMENTE, NO PUEDO USAR ADJETIVO PARA DECIR COMO TE VEN MIS OJOS, EN UN PEDESTAL QUE TE HACE MUSA DE MI PENSAR, QUEDATE SIEMPRE AHÍ, EN MI PENSAMIENTO, DAÑAME CON TU VENENO Y CURAME CON EL ANTIDOTO QUE ME DARÁN TUS BRAZOS, ME DISPONGO HACÍA TI Y HACIA TU CORAZÓN.</p>
        <p class="ps">PD. TQM</p>
        <p class="signature">ATT. JOSÉ</p>
    `;
    
    lyricsDiv.innerHTML = `
        <div class="letter">
            ${letterContent}
        </div>
    `;
    
    setTimeout(() => {
        const letter = lyricsDiv.querySelector('.letter');
        if (letter) {
            letter.classList.add('visible');
        }
        startMusic();
    }, 500);
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    drawSky();
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    drawMoon();
    
    drawMountains();
    
    drawLake();
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    waveOffset += 2;
    
    updateLyrics();
    
    animationId = requestAnimationFrame(animate);
}

function startMusic() {
    audio.volume = 0.3;
    audio.play().catch(e => {
        console.log('Audio playback requires user interaction');
    });
}

canvas.addEventListener('click', function() {
    const envelope = document.getElementById('envelope');
    if (!envelope) {
        startMusic();
    }
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
animate();
