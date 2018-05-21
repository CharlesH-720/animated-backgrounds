/* JavaScript/HTML - Canvas Drawing and Animating
*   Canvas Objects:
*       1 - Rectangles
*       2 - Lines
*       3 - Arcs/Circles
*       4 - Bezier Curves
*       5 - Images
*       6 - Text
*/


var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "beige";

//context
var c = canvas.getContext('2d');

/*Create Rectangles, give color value
c.fillStyle = 'rgba(255, 0, 0, 0.2)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(255, 0, 0, 0.5)';
c.fillRect(150, 150, 75, 75);
c.fillStyle = 'rgba(0, 0, 255, 0.1)';
c.fillRect(500, 200, 100, 100);
c.fillStyle = 'rgba(0, 255, 0, 0.5)';
c.fillRect(400, 300, 100, 100);


//Line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(500, 150);
c.lineTo(400, 80);
c.lineTo(700, 120);
c.strokeStyle = "indigo";
c.stroke();
c.closePath();

/* Arc and/or Circle
c.beginPath();
c.arc(300,300, 30, 0, 2*Math.PI, false);
c.strokeStyle = "brown";
c.stroke();
c.closePath();

for (var i = 0; i < 100; i++) {
    c.beginPath();
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    var radius = Math.random(5, 20)*10;
    c.arc(x, y, radius, 0, 2*Math.PI, false);
    var cV = i % 3;
    if(cV == 0){
        c.strokeStyle = "crimson";
    } else if (cV == 1) {
        c.strokeStyle = "chartreuse";
    } else if (cV == 2) {
        c.strokeStyle = "cyan";
    }
    c.stroke();
    c.closePath();
}*/

var maxRadius = 40;
var minRadius = 3;

/*var colorArray = [
    []
    []
    []
    []
]*/

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        c.strokeStyle = "orange";
        c.stroke();
        c.fillStyle = "lightblue";
        c.fill();
    };
    
    this.update = function () {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y-this.y < 50 & mouse.y-this.y > -50) {
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        } else if (this.radius > minRadius) {this.radius-=1;}
        this.draw()
    };
}


var radius = Math.random() * 20;
var x = Math.random() * innerWidth;
var dx = (Math.random() - 0.5) * 10;
var y = Math.random() * innerHeight;
var dy = (Math.random() - 0.5) * 10;

var circleArray = [];

for(var i = 0; i < 100; i++){
    var radius = Math.random() * 30 + 5;
    var x = Math.random() * (innerWidth - radius*2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var y = Math.random() * (innerHeight - radius*2) + radius;
    var dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();