const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawBackground() {
    // Creando un gradiente vertical que combine con los tonos de la flor
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#f0e8ff'); // Un lavanda muy claro en la parte superior
    grad.addColorStop(1, '#d1c4e9'); // Un lavanda más oscuro en la parte inferior que combina bien con el rosa
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPetal(x, y, radius, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#ffffff'); // Puntas blancas para destacar los pétalos
    ctx.fillStyle = gradient;
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(radius / 2, -radius / 2, radius, 0, 0, radius);
    ctx.bezierCurveTo(-radius, 0, -radius / 2, -radius / 2, 0, 0);
    ctx.fill();
    ctx.restore();
}

function drawCenter(x, y, radius) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, '#ffff00'); // Amarillo brillante en el centro
    gradient.addColorStop(1, '#ffeb3b'); // Amarillo más oscuro hacia el borde
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function drawStem(x, y, height) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x - 10, y + height / 2, x, y + height); // Curva para el tallo
    ctx.strokeStyle = '#4caf50'; // Color verde para el tallo
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
}

function drawTitle() {
    ctx.font = '48px serif'; // Estilo de fuente para el título
    ctx.fillStyle = '#ff69b4'; // Color de la fuente que combina con los pétalos
    ctx.textAlign = 'center';
    ctx.fillText('Maryhel', canvas.width / 2, 60); // Posición del título
}

function drawFlower() {
    drawBackground(); // Dibuja el fondo primero
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 50; // Ajusta la posición central de la flor

    // Dibuja el tallo primero para que esté detrás de la flor
    drawStem(centerX, centerY + 50, 300); // Altura del tallo

    // Capas de pétalos
    for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 / 16) * i;
        drawPetal(centerX + Math.cos(angle) * 100, centerY + Math.sin(angle) * 100, 40, angle, '#ff69b4'); // Capa externa grande
        drawPetal(centerX + Math.cos(angle) * 85, centerY + Math.sin(angle) * 85, 30, angle, '#ff88aa'); // Capa media
        drawPetal(centerX + Math.cos(angle) * 70, centerY + Math.sin(angle) * 70, 20, angle, '#ffaacd'); // Capa interior cercana al centro
        drawPetal(centerX + Math.cos(angle) * 55, centerY + Math.sin(angle) * 55, 15, angle, '#ffbcd9'); // Capa más cercana al centro
    }

    drawCenter(centerX, centerY, 50); // Dibuja el centro de la flor
    drawTitle(); // Dibuja el título después de la flor para que aparezca encima
}

drawFlower();
