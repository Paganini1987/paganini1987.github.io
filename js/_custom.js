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
      console.log('Some other kind of source/device: ', deviceInfo);
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