(function() {
	function collapse_header() {
		var header=document.querySelector('#responsive_header');

		header.classList.add('min_header');
	}

	window.addEventListener('scroll', collapse_header);
})();
