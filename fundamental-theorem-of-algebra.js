function setup() {
	createCanvas(1000, 500);
}

class Z {
	constructor(a, b) {
		this.a = a;
		this.b = b;
	}

	add(c) {
		return new Z(this.a + c.a, this.b + c.b);
	}

	subtract(c) {
		return new Z(this.a - c.a, this.b - c.b);
	}

	multiply(c) {
		const newA = this.a * c.a - this.b * c.b;
		const newB = this.a * c.b + this.b * c.a;
		return new Z(newA, newB);
	}

	toThePowerOf(n) {
		let result = new Z(1, 0);
		for (let i = 0; i < n; i++) {
			result = result.multiply(new Z(this.a, this.b));
		}
		return result;
	}
}

const AE = document.getElementById('a');
const BE = document.getElementById('b');
const CE = document.getElementById('c');
const DE = document.getElementById('d');

const scale = 50;
function draw() {
	background(50);
	stroke(100);
	line(250, 0, 250, 500);
	line(750, 0, 750, 500);
	line(0, 250, 1000, 250);
	for (let x = 0; x < 1000; x += scale) {
		line(x, 245, x, 255);
		stroke(100);
	}

	for (let y = 0; y < 500; y += scale) {
		line(245, y, 255, y);
		line(745, y, 755, y);
		stroke(100);
	}

	textSize(22);
	fill(255);
	text('Input', 220, 30);
	text('Image', 720, 30);

	noStroke();

	plotC(new Z(0, 0), color(255, 100, 20));
	const inputX = (mouseX - 250) / scale;
	const inputY = (mouseY - 250) / scale;

	inputArg = Math.atan(inputY / inputX);
	if (inputX < 0) inputArg += Math.PI;
	inputMod = Math.sqrt(inputX * inputX + inputY * inputY);

	let prevX = inputX;
	let prevY = inputY;
	for (let theta = inputArg; theta < Math.PI * 2 + inputArg; theta += (Math.PI * 2) / 100) {
		const x = Math.cos(theta) * inputMod;
		const y = Math.sin(theta) * inputMod;
		line(x * scale + 250, y * scale + 250, prevX * scale + 250, prevY * scale + 250);
		stroke(255);
		const p = polynomial(x, y);
		const pPrev = polynomial(prevX, prevY);
		line(p.a * scale + 750, p.b * scale + 250, pPrev.a * scale + 750, pPrev.b * scale + 250);
		stroke(255);
		prevX = x;
		prevY = y;
	}
	noStroke();
	plotC(new Z(inputX, inputY), color(64, 180, 188));
	// const p = polynomial(inputX, inputY);
	// const pPrev = polynomial(prevX, prevY);
	// line(p.a * scale + 750, p.b * scale + 250, pPrev.a * scale + 750, pPrev.b * scale + 250);
	// stroke(color(255, 0, 0));
}

function plotC(c, col) {
	fill(col);
	circle(250 + c.a * scale, 250 + c.b * scale, 10);
	const p = polynomial(c.a, c.b);
	circle(750 + p.a * scale, 250 + p.b * scale, 10);
}

function polynomial(a, b) {
	// return new Z(a, b).add(new Z(1, 0)); // x + 1
	// return new Z(a, b).multiply(new Z(a, b)).add(new Z(1, 0)); // x^2 + 1
	// return new Z(a, b).multiply(new Z(a, b)).multiply(new Z(a, b)).subtract(new Z(a, b)).add(new Z(1, 0)); // x^2 -x + 1
	const co1 = new Z(a, b).toThePowerOf(3).multiply(new Z(+AE.value, 0));
	const co2 = new Z(a, b).toThePowerOf(2).multiply(new Z(+BE.value, 0));
	const co3 = new Z(a, b).multiply(new Z(+CE.value, 0));
	const co4 = new Z(+DE.value, 0);
	return co1.add(co2).add(co3).add(co4);
}
