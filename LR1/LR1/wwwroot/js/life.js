var canvas = document.getElementById('life');
var ctx = canvas.getContext('2d');
var mas = [];
var count = 0;
var timer;
var dim = 800;
var shape = 25;

drawGrid();

canvas.onclick = function(event){
	var x = event.offsetX;
	var y = event.offsetY;
    x = Math.floor(x / shape);
    y = Math.floor(y / shape); 
	mas[y][x]=1;
	drawField();
}

function goLife(){
    var n = dim, m = dim;
	for (var i=0; i<m; i++){
		mas[i]=[];
		for (var j=0; j<n; j++){
			mas[i][j]=0;
		}
	}
}
goLife();

function drawField(){   
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i=0; i<dim; i++){
		for (var j=0; j<dim; j++){
			if (mas[i][j]==1){
                ctx.fillRect(j * shape, i * shape, shape, shape);
			}
		}
    }
    drawGrid();
}

function startLife(){
	var mas2 = [];
	for (var i=0; i<dim; i++){
		mas2[i]=[];
		for (var j=0; j<dim; j++){
			var neighbors = 0;
		    if (mas[fpm(i) - 1][j] == 1) neighbors++;//up
		    if (mas[i][fpp(j) + 1] == 1) neighbors++;//right
		    if (mas[fpp(i) + 1][j] == 1) neighbors++;//bottom
		    if (mas[i][fpm(j) - 1] == 1) neighbors++;//left
		    if (mas[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;//up-right
		    if (mas[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;//bottom-right
            if (mas[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;//bottom-left
            if (mas[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;//up-left
            if (neighbors == 3) mas2[i][j] = 1;
            else if ((neighbors > 3 || neighbors < 2) && mas2[i][j] == 1) mas2[i][j] = 0;
		}
	}
	mas = mas2;
	drawField();
    count++;
    if (checklife()) {
        document.getElementById('log').innerHTML = count;
        timer = setTimeout(startLife, 300);
    }
    else {
        document.getElementById('log').innerHTML = 'Death';
        clearTimeout(timer);
    }
}

function fpm(i){
	if(i==0) return dim;
	else return i;
}
function fpp(i){
	if(i==dim-1) return -1;
	else return i;
}

function checklife() {
    for (var i = 0; i < dim; i++) {
        for (var j = 0; j < dim; j++) {
            if (mas[i][j] == 1) {
                return true;
            }
        }
    }
    return false;
}

function clear_field() {
    goLife();
    drawField();
}

function stoplife() {
    clearTimeout(timer);
}

function drawGrid() {
    for (var x = 0; x <= dim; x += shape) {
        for (var y = 0; y <= dim; y += shape) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, dim);
            ctx.moveTo(0, y);
            ctx.lineTo(dim, y);
        }
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
};

document.getElementById('start').onclick = startLife;
document.getElementById('clear').onclick = clear_field;
document.getElementById('stop').onclick = stoplife;