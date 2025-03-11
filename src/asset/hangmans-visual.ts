const canvas = document.getElementById("game") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

const width = canvas.width;
const height = canvas.height;

function drawGallows() {
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  // Base
  context.beginPath();
  context.moveTo(50, height - 50);
  context.lineTo(width - 50, height - 50);
  context.stroke();

  // Poteau vertical
  context.beginPath();
  context.moveTo(100, height - 50);
  context.lineTo(100, 50);
  context.stroke();

  // Poteau horizontal
  context.beginPath();
  context.moveTo(100, 50);
  context.lineTo(250, 50);
  context.stroke();

  // Corde
  context.beginPath();
  context.moveTo(250, 50);
  context.lineTo(250, 100);
  context.stroke();
}

function drawHead() {
  context.beginPath();
  context.arc(250, 125, 25, 0, Math.PI * 2);
  context.stroke();
}

function drawBody() {
  context.beginPath();
  context.moveTo(250, 150);
  context.lineTo(250, 250);
  context.stroke();
}

function drawLeftArm() {
  context.beginPath();
  context.moveTo(250, 170);
  context.lineTo(220, 200);
  context.stroke();
}

function drawRightArm() {
  context.beginPath();
  context.moveTo(250, 170);
  context.lineTo(280, 200);
  context.stroke();
}

function drawLeftLeg() {
  context.beginPath();
  context.moveTo(250, 250);
  context.lineTo(220, 300);
  context.stroke();
}

function drawRightLeg() {
  context.beginPath();
  context.moveTo(250, 250);
  context.lineTo(280, 300);
  context.stroke();
}

function drawFace() {
  context.beginPath();
  context.arc(240, 120, 3, 0, Math.PI * 2);
  context.stroke();

  context.beginPath();
  context.arc(260, 120, 3, 0, Math.PI * 2);
  context.stroke();

  context.beginPath();
  context.arc(250, 130, 10, 0, Math.PI);
  context.stroke();
}

function clearCanvas() {
  context.clearRect(0, 0, width, height);
}

function drawStep(step: number) {
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

let currentStep = 0;
const maxSteps = 7;

export default function nextStep() {
  if (currentStep <= maxSteps) {
    drawStep(currentStep);
    currentStep++;
  }
}


