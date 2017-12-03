var canvas = document.getElementById('life');
var ctx = canvas.getContext('2d');
var mas = [];
var count = 0;
var timer;
var dim = 800;
var shape = 25;
var limit = dim/shape;

canvas.onclick = function(event){
	var x = event.offsetX;
	var y = event.offsetY;
    x = Math.floor(x / shape);
    y = Math.floor(y / shape);
    if (mas[y][x] == 1) {
        mas[y][x] = 0;
    } else {
        mas[y][x] = 1;
    }
	draw_field();
}

function begin_life() {
    draw_grid();
    var n = limit, m = limit;
	for (var i=0; i<m; i++){
		mas[i]=[];
		for (var j=0; j<n; j++){
			mas[i][j]=0;
		}
	}
}


function draw_field(){   
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i=0; i<limit; i++){
		for (var j=0; j<limit; j++){
            if (mas[i][j] == 1) {
                ctx.beginPath();
                ctx.arc(j * shape + (shape / 2), i * shape + (shape / 2), (shape / 2) - 1, 0, 2 * Math.PI, false);
                /*var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                var s = 'rgba(' + r + ',' + g + ',' + b + ', 1)';
                ctx.fillStyle = s;*/
                ctx.fill();
                ctx.closePath();
            }
		}
    }
    draw_grid();
}

function find_life(){
	var mas2 = [];
    for (var i = 0; i < limit; i++){
		mas2[i]=[];
        for (var j = 0; j < limit; j++){
			var neighbors = 0;
		    if (mas[fpm(i) - 1][j] == 1) neighbors++;//up
		    if (mas[i][fpp(j) + 1] == 1) neighbors++;//right
		    if (mas[fpp(i) + 1][j] == 1) neighbors++;//bottom
            if (mas[i][fpm(j) - 1]  == 1) neighbors++;//left
		    if (mas[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;//up-right
		    if (mas[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;//bottom-right
            if (mas[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;//bottom-left
            if (mas[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;//up-left
            if (neighbors == 3 && mas[i][j] != 1) mas2[i][j] = 1;
            if (neighbors != 3 && neighbors != 2 && mas[i][j] == 1) mas2[i][j] = 0;
            if ((neighbors == 3 || neighbors == 2) && mas[i][j] == 1) mas2[i][j] = 1;
        }
	}
	mas = mas2;
	draw_field();
    count++;
    if (check_life()) {
        document.getElementById('log').innerHTML = count;
        timer = setTimeout(find_life, 300);
    }
    else {
        document.getElementById('log').innerHTML = 'Death';
        begin_life();
        clearTimeout(timer);
    }
}

function fpm(i){
    if (i == 0) return limit;
	else return i;
}
function fpp(i){
    if (i == limit-1) return -1;
	else return i;
}

function check_life() {
    for (var i = 0; i < limit; i++) {
        for (var j = 0; j < limit; j++) {
            if (mas[i][j] == 1) {
                return true;
            }
        }
    }
    return false;
}

function clear_field() {
    count = 0;
    document.getElementById('log').innerHTML = count;
    begin_life();
    draw_field();
}

function end_life() {
    clearTimeout(timer);
}

function draw_grid() {
    ctx.beginPath();
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
    ctx.closePath();
};

document.getElementById('start').onclick = find_life;
document.getElementById('clear').onclick = clear_field;
document.getElementById('stop').onclick = end_life;

begin_life();