document.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementById("canvas"),
		canvas2 = document.getElementById("canvas2"),
		hidden_canvas = document.querySelector('#canvas3'),
		context = canvas.getContext("2d"),
		context2 = canvas2.getContext("2d"),
		context3 = hidden_canvas.getContext("2d"),
		width = window.innerWidth,
		height = window.innerHeight,
		video = document.querySelector('#video'),
		videoContainer = document.querySelector('.video'),
		videoContainerWrapper = document.querySelector('.wrapper'),
		width2, height2, aRed, aGreen, aBlue,
		process = false;
                 
	var img = new Image();
	var img2 = new Image();
	img.src = "/img/@1x/back.jpg";
	img2.src = "/img/@1x/sofa.png";

	function load1 () {
		return new Promise((resolve)=>{
			img.onload = resolve;
		})
	}
	function load2 () {
		return new Promise((resolve)=>{
			img2.onload = resolve;
		})
	}

	Promise.all([
		load1(),
		load2()
	])
	.then(()=>{
		height = (img.height / img.width) * width;

		if (height > window.innerHeight) {
			height = window.innerHeight
			width = (img.width / img.height) * height
		}
	
		canvas.width = width;
		canvas.height =height;

		canvas2.width = width;
		canvas2.height =height;

		context.drawImage(img, 0, 0, width, height);
		reset();
	})

	window.addEventListener('resize', function () {
		width = window.innerWidth,
		height = window.innerHeight;

		height = (img.height / img.width) * width;

		if (height > window.innerHeight) {
			height = window.innerHeight
			width = (img.width / img.height) * height
		}

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
		let imageData = reset();

		for (var i = 0; i < imageData.data.length; i += 4) {
			let red = imageData.data[i]; // получаем компоненту красного цвета
			let green = imageData.data[i + 1];  // получаем компоненту зеленого цвета
			let blue = imageData.data[i + 2];   // получаем компоненту синего цвета
			let alpha = imageData.data[i + 3];   // получаем компоненту синего цвета

			let delta = ((red + green + blue) / 3) / 255;

			// imageData.data[i] = (red1 + red/1.2) / 2;
			// imageData.data[i + 1] = (green1 + green/1.2) / 2;
			// imageData.data[i + 2] = (blue1 + blue/1.2) / 2;
			imageData.data[i] = red1 * delta;
			imageData.data[i + 1] = green1 * delta;
			imageData.data[i + 2] = blue1 * delta;
		}
			
		context2.putImageData(imageData, 0,0);
	}

	function reset () {
		context2.clearRect(0,0,width,height);
		context2.drawImage(img2, 0, 0, width, height);

		return context2.getImageData(0,0, width, height);
	}

	(function initCamera() {
		// Получаем размер видео элемента.
		width2 = videoContainer.clientWidth,
		height2 = videoContainer.clientHeight,
	
		// Установка размеров canvas идентичных с video.
		hidden_canvas.width = width2;
		hidden_canvas.height = height2;
	})()

	function getVideoData(){
		// Отрисовка текущего кадра с video в canvas.
		context3.drawImage(video, 0, 0, width2, height2);

		var rectWidth = width2 * 0.1,
			rectHeight = height2 * 0.1,
			fromX = (width2 / 2) - (rectWidth / 2),
			fromY = (height2 / 2) - (rectHeight / 2);

		// console.log(fromX, fromY, toX, toY);
		// context3.beginPath();
		// context3.rect(fromX - 15, fromY - 15, rectWidth + 15, rectHeight + 15);
		// context3.closePath();
		// context3.strokeStyle = "white";
		// context3.stroke();

		return context3.getImageData(fromX + 5, fromY + 5, rectWidth - 5, rectHeight - 5);
	}

	function takeSnapshot() {
		var imageData = getVideoData(),
			colors = {
				red: [],
				green: [],
				blue: []
			};

		//Получим усреднённый цвет из центральной области
		for (var i = 0; i < imageData.data.length; i += 4) {
			let red = imageData.data[i]; // получаем компоненту красного цвета
			let green = imageData.data[i + 1];  // получаем компоненту зеленого цвета
			let blue = imageData.data[i + 2];   // получаем компоненту синего цвета


			colors.red.push(red)
			colors.green.push(green)
			colors.blue.push(blue)
		}

		let length = colors.red.length;
		aRed = colors.red.reduce((prev, current)=>prev + current) / length;
		aGreen = colors.green.reduce((prev, current)=>prev + current) / length;
		aBlue = colors.blue.reduce((prev, current)=>prev + current) / length;

		setExample (aRed, aGreen, aBlue);
	}

	function realTime () {
		takeSnapshot();

		if (!process) return null;

		requestAnimationFrame(realTime)
	}

	realTime();

	document.querySelector('.js-capture').addEventListener('click', ()=>{
		setColor([aRed, aGreen, aBlue]);
		document.querySelector('.js-open-video').style.backgroundColor = 'rgb(' + aRed + ',' + aGreen + ',' + aBlue + ')';
	});

	function setExample (r, g, b) {
		let obj = document.querySelector('.js-set-color');

		obj.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
	}

	//Events
	document.querySelector('.js-close-video').addEventListener('click', (e)=>{
		e.preventDefault();

		process = false;
		
		videoContainerWrapper.classList.remove('isOpened');
	})

	document.querySelector('.js-open-video').addEventListener('click', (e)=>{
		e.preventDefault();

		process = true;
		realTime();

		videoContainerWrapper.classList.add('isOpened');
	})
});


/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

const videoElement = document.querySelector('video');
const videoSelect = document.querySelector('select#videoSource');
const selectors = [videoSelect];

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
	option.value = deviceInfo.deviceId;
	
   if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    } else {
    //   console.log('Some other kind of source/device: ', deviceInfo);
    }
  }

  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);


function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }

  const videoSource = videoSelect.value;
  const constraints = {
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

videoSelect.onchange = start;

start();