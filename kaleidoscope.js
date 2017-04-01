///////////////////
//This aims to design a visually appealing, interactive web graphic. 
//The rotation speed changes whenever mouse motion is detected. 
//Enjoy!
//The image resource is from https://www.petfinder.com/wp-content/uploads/2012/11/152964589-welcome-home-new-cat-632x475.jpg
//This code is inspired by work : http://codepen.io/ctscodes/pen/ZpWOKV
//////////////////

var doc = document;
var body = doc.body;
var win = window;
var ww = win.innerWidth, wh = win.innerHeight;
var c = doc.createElement('canvas');
var ctx = c.getContext('2d');

var half_PI = Math.PI / 2, two_PI = Math.PI * 2;
var	smooth = 0.05;

var img = new Image();
img.src = 'https://www.petfinder.com/wp-content/uploads/2012/11/152964589-welcome-home-new-cat-632x475.jpg';

var v = {
	radius: 300,
	slices: 16,
	offsetRotation: 0,
	offsetX: 0,
	offsetY: 0,
};

body.appendChild(c);
c.width = v.radius * 2;
c.height = v.radius * 2;

//draw the kaleidoscope on window
function draw(){
	ctx.fillStyle = ctx.createPattern(img, 'repeat');
	var step = two_PI / v.slices;
	var cx = img.width / 2;
      
	for (var i = 0; i <= v.slices; i++) {
		ctx.save();
		ctx.translate(v.radius, v.radius);
		ctx.rotate(i * step);
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.arc(0, 0, v.radius, step * -0.5, step * 0.5);
		ctx.rotate(half_PI);
		// ctx.scale([ 1,1 ][i % 2], 1);
    		ctx.scale([ 1,-1 ][i % 2], 1); //This decide the slides direction
		//ctx.translate(v.offsetX + cx, v.offsetY); //rotate inward
		ctx.translate(v.offsetX - cx, v.offsetY); //rotate outward
		// v.offsetRotation * n --> n is the speed factor
		ctx.rotate(v.offsetRotation);
		ctx.fill();
		ctx.restore();		
	}	
}

var tx = v.offsetX;
var ty = v.offsetY;
var tr = v.offsetRotation;

//detect mouse movement
win.addEventListener('mousemove', mousemove, false);
function mousemove(e){
    var dx, dy;
    dx = e.pageX / ww;
    dy = e.pageY / wh;
    // 3 can be changed to speed up
    tx = dx * v.radius * -3;
    ty = dy * v.radius * 3;
	console.log((tr))
}

//kaleidoscope position
c.style.position = 'fixed';
c.style.marginLeft = -v.radius + 'px';
c.style.marginTop = -v.radius + 'px'; 
c.style.left = '50%';
c.style.top = '50%';

function update() {
    tr -= 0.005; //move out
    // tr += 0.005; // move in
    v.offsetX += (tx - v.offsetX) * smooth;//make movement smooth
    v.offsetY += (ty - v.offsetY) * smooth;
    v.offsetRotation += (tr - v.offsetRotation) * smooth; 
	draw();
    requestAnimationFrame(update);
};
update();
