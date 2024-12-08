let customFontBig;
let customFontSmall;
let awakenImage;
let awakenImageBackground;
let topLeftOpacity = 0;
let topRightOpacity = 0;
let bottomLeftOpacity = 0;
let bottomRightOpacity = 0;
let fadeSpeed = 10;

let headOffsetX = 0;
let headOffsetY = 0;
let headFloatSpeed = 0.01;
let floatRadius = 10;

let blinkTimer = 0;
let isBlinking = false;
let blinkDuration = 10;

let rotationAngle = 0; // Rotation angle for the radial background

function preload() {
    customFontBig = loadFont('/static/fonts/BigJohn.otf');
    customFontSmall = loadFont('/static/fonts/DMSans.ttf');
    awakenImage = loadImage('/static/awaken_state.png');
    awakenImageBackground = loadImage('/static/images/radial-background.png'); // Replace with the correct path
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
}

function draw() {
    let midX = Math.floor(width / 2);
    let midY = Math.floor(height / 2);

    // Responsive padding based on canvas size
    let textPadding = width * 0.12; // 8% of the width for padding
    let textSizeValue = min(windowWidth / 18, windowHeight / 12);
    // let smallTextSizeValue = max(textSizeValue * 0.5, 28);
    let smallTextSizeValue = textSizeValue * 0.35;
    let lineSpacing = textSizeValue * 0.9;

    background(30);

    // Floating effect for the head
    headOffsetX = cos(frameCount * headFloatSpeed) * floatRadius;
    headOffsetY = sin(frameCount * headFloatSpeed) * floatRadius;

    // Blinking effect every 5 seconds
    if (frameCount % (5 * 60) === 0) {
        isBlinking = true;
        blinkTimer = 0;
    }
    if (isBlinking) {
        blinkTimer++;
        if (blinkTimer >= blinkDuration) {
            isBlinking = false;
        }
    }

    // Adjust opacity based on hover for each quadrant
    let quadrantOpacities = [topLeftOpacity, topRightOpacity, bottomLeftOpacity, bottomRightOpacity];
    for (let i = 0; i < quadrantOpacities.length; i++) {
        // When not hovered, set opacity to a minimum of 30
        quadrantOpacities[i] = i === getHoveredQuadrant()
            ? min(quadrantOpacities[i] + fadeSpeed, 255) // Increase opacity on hover
            : max(quadrantOpacities[i] - fadeSpeed, 10); // Reduce opacity when not hovered
    }
    [topLeftOpacity, topRightOpacity, bottomLeftOpacity, bottomRightOpacity] = quadrantOpacities;

    // Draw quadrants with consistent alignment to the left or right
    drawQuadrant(0, 0, midX, midY, "HI! I'M", "Min Htet", "Zaw a.k.a", "Moses", topLeftOpacity, true, lineSpacing, textSizeValue, smallTextSizeValue, textPadding);
    drawQuadrant(midX, 0, width - midX, midY, "EMPATHIC", "Product", "Designer", "", topRightOpacity, false, lineSpacing, textSizeValue, smallTextSizeValue, textPadding);
    drawQuadrant(0, midY, midX, height - midY, "FORMERLY", "Graphic", "Designer", "", bottomLeftOpacity, true, lineSpacing, textSizeValue, smallTextSizeValue, textPadding);
    drawQuadrant(midX, midY, width - midX, height - midY, "BASED IN", "Bangkok", "Thailand", "", bottomRightOpacity, false, lineSpacing, textSizeValue, smallTextSizeValue, textPadding);

    // Draw head and background circle
    let circleDiameter = min(width, height) / 2.5;
    let borderThickness = max(width, height) / 800; // Match circle border thickness

    stroke(243, 238, 216);
    strokeWeight(borderThickness); // Match border thickness with rectangles
    noFill();
    ellipse(midX, midY, circleDiameter);

    fill(30);
    ellipse(midX, midY, circleDiameter);

    // Draw rotating radial background
    push();
    translate(midX, midY);
    rotate(rotationAngle);
    let radialDiameter = min(width, height) * 0.38; // Adjust the radial background size
    imageMode(CENTER);
    image(awakenImageBackground, 0, 0, radialDiameter, radialDiameter);
    rotationAngle += radians(0.08); // Rotate clockwise slowly
    pop();

    // Responsive head image size
    let headDiameter = circleDiameter * 1.6;
    imageMode(CENTER);
    image(awakenImage, midX + headOffsetX, midY + headOffsetY, headDiameter, headDiameter);

    // Draw eyes
    drawEyes(midX, midY, circleDiameter);
}

function drawEyes(midX, midY, circleDiameter) {
    let eyeOffsetX = constrain(map(mouseX, 0, width, -5, 5), -5, 5);
    let eyeOffsetY = constrain(map(mouseY, 0, height, -5, 5), -5, 5) + 2;
    let eyeRadius = circleDiameter * 0.050;

    let leftEyeX = midX + headOffsetX - circleDiameter * 0.10 + eyeOffsetX;
    let leftEyeY = midY + headOffsetY - circleDiameter * 0.02 + eyeOffsetY;
    let rightEyeX = midX + headOffsetX + circleDiameter * 0.10 + eyeOffsetX;
    let rightEyeY = midY + headOffsetY - circleDiameter * 0.02 + eyeOffsetY;

    fill(0);
    noStroke();
    if (isBlinking) {
        let lineLength = eyeRadius * 1.5;
        stroke(0);
        strokeWeight(4);
        line(leftEyeX - lineLength / 2, leftEyeY, leftEyeX + lineLength / 2, leftEyeY);
        line(rightEyeX - lineLength / 2, rightEyeY, rightEyeX + lineLength / 2, rightEyeY);
    } else {
        ellipse(leftEyeX, leftEyeY, eyeRadius);
        ellipse(rightEyeX, rightEyeY, eyeRadius);
    }
}

function drawQuadrant(x, y, w, h, smallText, line1, line2, line3, opacity, isLeftAligned, lineSpacing, textSizeValue, smallTextSizeValue, textPadding) {
    let startX = isLeftAligned ? x + textPadding : x + w - textPadding;
    let alignment = isLeftAligned ? LEFT : RIGHT;
    let borderThickness = max(width, height) / 800; // Match circle border thickness

    if (opacity > 50) {
        stroke('#F3EED8');
        strokeWeight(borderThickness);
        noFill();
        rect(x + 1, y + 1, w - 2, h - 2); // Avoid border touching the screen
    } else {
        noStroke();
        fill(30);
        rect(x, y, w, h);
    }

    textFont(customFontBig);
    textSize(textSizeValue);
    let textColor = opacity === 255 ? color(243, 238, 216, opacity) : color(243, 243, 243, opacity);

    let textBlockHeight = line3 ? 3 * lineSpacing : 2 * lineSpacing;
    let startY = y + h / 2 - textBlockHeight / 2 + lineSpacing;

    let adjustedLineSpacing = lineSpacing * 0.8; 

    push();
    fill(textColor);
    noStroke();
    textFont(customFontSmall);
    textSize(smallTextSizeValue);
    textAlign(alignment, CENTER);
    text(smallText, startX, startY - adjustedLineSpacing);

    textFont(customFontBig);
    textSize(textSizeValue);
    textAlign(alignment, CENTER);
    text(line1, startX, startY);
    text(line2, startX, startY + lineSpacing);
    if (line3) text(line3, startX, startY + 2 * lineSpacing);
    pop();
}

function getHoveredQuadrant() {
    let midX = width / 2;
    let midY = height / 2;
    if (mouseX < midX && mouseY < midY) return 0; // Top-left
    if (mouseX >= midX && mouseY < midY) return 1; // Top-right
    if (mouseX < midX && mouseY >= midY) return 2; // Bottom-left
    return 3; // Bottom-right
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
