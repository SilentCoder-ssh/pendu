const canvas = document.getElementById("game") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

// Définir les dimensions du canvas
canvas.width = 400;
canvas.height = 200;
const width = canvas.width;
const height = canvas.height;

// Palette de couleurs élégante
const colors = {
  background: "#121212",
  gallows: "#333333",
  rope: "#444444",
  body: "#ff1a1a",
  details: "#ffffff",
  accent: "#ff3333",
};

// Configuration initiale
export function setupCanvas() {
  // Fond lisse et uni
  context.fillStyle = colors.background;
  context.fillRect(0, 0, width, height);
}

// Effet de ligne lisse
function drawSmoothLine(startX, startY, endX, endY, color, lineWidth = 2) {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.stroke();
}

// Dessiner la potence avec des lignes lisses
export function drawGallows() {
  // Base horizontale
  drawSmoothLine(80, height - 40, width - 80, height - 40, colors.gallows, 3);

  // Poteau vertical
  drawSmoothLine(120, height - 40, 120, 40, colors.gallows, 3);

  // Poutre horizontale
  drawSmoothLine(120, 40, 280, 40, colors.gallows, 3);

  // Corde
  drawSmoothLine(280, 40, 280, 60, colors.rope, 2);
}

// Dessiner la tête avec un cercle lisse
export function drawHead() {
  context.beginPath();
  context.arc(280, 80, 20, 0, Math.PI * 2);
  context.strokeStyle = colors.body;
  context.lineWidth = 2;
  context.stroke();
}

// Dessiner le corps
export function drawBody() {
  drawSmoothLine(280, 100, 280, 150, colors.body, 2);
}

// Dessiner le bras gauche avec une courbe élégante
export function drawLeftArm() {
  context.beginPath();
  context.moveTo(280, 110);
  context.quadraticCurveTo(260, 125, 250, 140);
  context.strokeStyle = colors.body;
  context.lineWidth = 2;
  context.lineCap = "round";
  context.stroke();
}

// Dessiner le bras droit avec une courbe élégante
export function drawRightArm() {
  context.beginPath();
  context.moveTo(280, 110);
  context.quadraticCurveTo(300, 125, 310, 140);
  context.strokeStyle = colors.body;
  context.lineWidth = 2;
  context.lineCap = "round";
  context.stroke();
}

// Dessiner la jambe gauche avec une courbe élégante
export function drawLeftLeg() {
  context.beginPath();
  context.moveTo(280, 150);
  context.quadraticCurveTo(265, 170, 250, 180);
  context.strokeStyle = colors.body;
  context.lineWidth = 2;
  context.lineCap = "round";
  context.stroke();
}

// Dessiner la jambe droite avec une courbe élégante
export function drawRightLeg() {
  context.beginPath();
  context.moveTo(280, 150);
  context.quadraticCurveTo(295, 170, 310, 180);
  context.strokeStyle = colors.body;
  context.lineWidth = 2;
  context.lineCap = "round";
  context.stroke();
}

// Dessiner le visage de manière minimaliste et élégante
export function drawFace() {
  // Œil gauche
  context.beginPath();
  context.arc(273, 75, 2, 0, Math.PI * 2);
  context.fillStyle = colors.details;
  context.fill();

  // Œil droit
  context.beginPath();
  context.arc(287, 75, 2, 0, Math.PI * 2);
  context.fillStyle = colors.details;
  context.fill();

  // Bouche triste
  context.beginPath();
  context.arc(280, 85, 8, 0, Math.PI, true);
  context.strokeStyle = colors.details;
  context.lineWidth = 1.5;
  context.stroke();
}

// Nettoyer le canvas
export function clearCanvas() {
  context.clearRect(0, 0, width, height);
  setupCanvas();
}

// Animation d'apparition en fondu
function fadeIn(draw, duration = 300) {
  let start = performance.now();

  return new Promise((resolve) => {
    function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      context.globalAlpha = timeFraction;
      draw();
      context.globalAlpha = 1;

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(animate);
  });
}

// État du jeu
let currentStep = 0;
const maxSteps = 7;
let animationPromise = Promise.resolve();

// Dessiner une étape avec animation
export function drawStep(step: number) {
  clearCanvas();
  drawGallows();

  if (step >= 1) drawHead();
  if (step >= 2) drawBody();
  if (step >= 3) drawLeftArm();
  if (step >= 4) drawRightArm();
  if (step >= 5) drawLeftLeg();
  if (step >= 6) drawRightLeg();
  if (step >= 7) drawFace();
}

// Passer à l'étape suivante avec animation
export async function nextStep(victory: boolean) {
  // Attendre que l'animation précédente soit terminée
  await animationPromise;

  if (currentStep <= maxSteps && !victory) {
    currentStep++;

    // Animation en fondu pour la nouvelle partie
    let lastPart;
    if (currentStep === 1) lastPart = drawHead;
    else if (currentStep === 2) lastPart = drawBody;
    else if (currentStep === 3) lastPart = drawLeftArm;
    else if (currentStep === 4) lastPart = drawRightArm;
    else if (currentStep === 5) lastPart = drawLeftLeg;
    else if (currentStep === 6) lastPart = drawRightLeg;
    else if (currentStep === 7) lastPart = drawFace;

    // Dessiner les parties précédentes
    clearCanvas();
    drawGallows();
    if (currentStep > 1) drawHead();
    if (currentStep > 2) drawBody();
    if (currentStep > 3) drawLeftArm();
    if (currentStep > 4) drawRightArm();
    if (currentStep > 5) drawLeftLeg();
    if (currentStep > 6) drawRightLeg();

    // Animer la nouvelle partie
    if (lastPart) {
      animationPromise = fadeIn(lastPart);
    }
  }

  if (victory) {
    animationPromise = drawVictoryAnimation();
    currentStep = 0;
  }
}

// Animation de victoire élégante
async function drawVictoryAnimation() {
  clearCanvas();

  // Système de particules minimal et élégant
  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width / 2,
      y: height / 2,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 3,
      speedY: (Math.random() - 0.5) * 3,
      color: `rgba(255, ${Math.floor(Math.random() * 100) + 50}, ${Math.floor(
        Math.random() * 50
      )}, ${Math.random() * 0.5 + 0.5})`,
      life: 1,
    });
  }

  return new Promise((resolve) => {
    let frame = 0;

    function animate() {
      clearCanvas();

      // Mettre à jour et dessiner les particules
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.01;

        if (p.life > 0) {
          context.beginPath();
          context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          context.fillStyle = p.color;
          context.fill();
        }
      }

      // Texte de victoire
      const progress = Math.min(frame / 30, 1);
      context.globalAlpha = progress;
      context.font = "bold 32px Arial";
      context.fillStyle = "#ff3333";
      context.textAlign = "center";
      context.fillText("Victoire !", width / 2, height / 2);
      context.globalAlpha = 1;

      frame++;

      if (frame < 90) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(animate);
  });
}
