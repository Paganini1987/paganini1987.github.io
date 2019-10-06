document.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementById("canvas"),
		canvas2 = document.getElementById("canvas2"),
		context = canvas.getContext("2d"),
		context2 = canvas2.getContext("2d"),
		width = window.innerWidth,
		height = window.innerHeight;
                 
	var img = new Image();
	var img2 = new Image();
	img.src = "/img/@2x/209.jpg";
	img2.src = "/img/@2x/209.png";

	canvas.width = width;
	canvas.height =height;

	canvas2.width = width;
	canvas2.height =height;

	var imageData = null;

	img.onload = function() {
		
		context.drawImage(img, 0, 0, width, height);
		
	};

	img2.onload = function() {

		reset();

	}

	window.addEventListener('resize', function () {
		width = window.innerWidth,
		height = window.innerHeight;

		canvas.width = width;
		canvas.height =height;

		canvas2.width = width;
		canvas2.height =height;

		context.clearRect(0,0,width,height);
		context.drawImage(img, 0, 0, width, height);
		reset();
	})

	document.getElementById('color').addEventListener('change', function(e) {
		var value = e.target.value;

		// #XXXXXX -> ["XX", "XX", "XX"]
		var res = value.match(/[A-Za-z0-9]{2}/g);

		// ["XX", "XX", "XX"] -> [n, n, n]
		res = res.map(function(v) { return parseInt(v, 16) });

		setColor(res);
	})

	function setColor([red1, green1, blue1]) {
		reset();

		for (var i = 0; i < imageData.data.length; i += 4) {
			red = imageData.data[i]; // получаем компоненту красного цвета
			green = imageData.data[i + 1];  // получаем компоненту зеленого цвета
			blue = imageData.data[i + 2];   // получаем компоненту синего цвета
			alpha = imageData.data[i + 3];   // получаем компоненту синего цвета

			imageData.data[i] = (red1 + red/1.2) / 2;
			imageData.data[i + 1] = (green1 + green/1.2) / 2;
			imageData.data[i + 2] = (blue1 + blue/1.2) / 2;
			// imageData.data[i + 3] = alpha - (255 - (red + green + blue)/3);
		}
			
		context2.putImageData(imageData, 0,0);
	}

	function reset () {
		context2.clearRect(0,0,width,height);
		context2.drawImage(img2, 0, 0, width, height);
		imageData = context2.getImageData(0,0, width, height);
	}
});
