let matrix_w = 30,
	matrix_h = 30,
	cell_w = 30,
	cell_h = 30,
	matrix = [],
	vis = [],
	found, start,
	startPoint = [0, 0],
	endPoint = [0, 0,]
	pointsSet = false, pointTurn = true
	adds = [[1, 0],[-1, 0],[0, 1],[0, -1]];
let iIndex, jIndex, queue;

function initGrid() {
	background(255);
	pointsSet = false, pointTurn = true, queue = [], found = false, start = false;
	for (let i = 0; i < matrix_h; i++) {
		matrix[i] = [];
		vis[i] = [];
		for (let j = 0; j < matrix_w; j++) {
			matrix[i][j] = '0';
			vis[i][j] = false;

			stroke(0);
			noFill();
			rect(j * cell_w, i * cell_w, cell_w, cell_h);
		}
	}
}

function setup() {
	createCanvas(matrix_w * cell_w + 20, matrix_h * cell_h + 20);
	initGrid();
	let startBtn = createButton("start");
	startBtn.mousePressed(() => {
		start = true;
		queue.push(startPoint);
		iIndex = startPoint[1], jIndex = startPoint[0];
		vis[iIndex][jIndex] = true;
		fill(100);
		rect(jIndex * cell_w, iIndex * cell_w, cell_w, cell_h);
	});
	let resetBtn = createButton("reset");
	resetBtn.mousePressed(() => {
		initGrid();
	});
}

function draw() {
	if (queue.length != 0 && start) {
		iIndex = queue[0][1], jIndex = queue[0][0];
		queue.shift();
		if (iIndex == endPoint[1] && jIndex == endPoint[0]) {
			fill(255, 0, 0);
			rect(jIndex * cell_w, iIndex * cell_w, cell_w, cell_h);
			found = true;
		}
		if (!found) {
			fill(100);
			rect(jIndex * cell_w, iIndex * cell_w, cell_w, cell_h);
			for (let i = 0; i < 4; i++) {
				let newI = iIndex + adds[i][0],
					newJ = jIndex + adds[i][1];
				if (newI >= 0 && newI < matrix_h && newJ >= 0 && newJ < matrix_w && matrix[newI][newJ] == '0') {
					if (!vis[newI][newJ]) {
						queue.push([newJ, newI]);
						vis[newI][newJ] = true;
					}
				}
			}
		}
	}
}
let prevx = -1, pprevx = -1;
let prevy = -1, pprevy = -1;

function mouseDragged() {
	let y = Math.floor(mouseY / cell_h),
		x = Math.floor(mouseX / cell_w);
	if ((x < 0 || x >= matrix_w) || (y < 0 || y >= matrix_h)) return;
	matrix[y][x] = '1';
	fill(0, 0, 255);
	rect(x * cell_w, y * cell_w, cell_w, cell_h);
}

function mouseClicked() {
	let y = Math.floor(mouseY / cell_h),
		x = Math.floor(mouseX / cell_w);
	if ((x < 0 || x >= matrix_w) || (y < 0 || y >= matrix_h) || matrix[y][x] == '1') return;
	if (pointTurn) {
		startPoint = [x, y];y
		pointTurn = false;
		fill(0, 255, 0);
		rect(x * cell_w, y * cell_w, cell_w, cell_h);
		if (prevx != -1) {
			fill(255);
			rect(prevx * cell_w, prevy * cell_w, cell_w, cell_h);
		}
		prevx = x, prevy = y;
	} else {
		endPoint = [x, y];
		pointTurn = true;
		pointsSet = true;
		fill(255, 0, 0);
		rect(x * cell_w, y * cell_w, cell_w, cell_h);
		if (pprevx != -1) {
			fill(255);
			rect(pprevx * cell_w, pprevy * cell_w, cell_w, cell_h);
		}
		pprevx = x, pprevy = y;
	}
}