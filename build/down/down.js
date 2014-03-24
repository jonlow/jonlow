console.log(document.URL);

var addDown = function() {

	var div = document.createElement('div'),
			img = document.createElement('img'),
			animationTrans = "all .3s ease-out",
			imgWidth = 313;

	div.style.position = 'fixed';
	div.style.outline = 0;
	div.style.top = Math.round( window.innerHeight * Math.random() ) - (imgWidth/2) + 'px';
	div.style.left = Math.round( window.innerWidth * Math.random() ) - (imgWidth/2) + 'px';
	div.style.cursor = "pointer";
	div.style.zIndex = 1000;

	div.style.WebkitTransition = animationTrans;
	div.style.transition = animationTrans;
	div.style.WebkitTransform = "rotate(1deg) scale(1.01,1.01)";

	img.setAttribute('src','http://jonlow.com.au/down/down.png');

	div.onclick = addDown;

	div.onmouseover = function() {
		this.style.transform = "translate(0, 100px)";
		this.style.WebkitTransform = "translate(-50px, 100px)";

	};

	div.onmouseout = function() {
		this.style.transform = "translate(0, 0)";
		this.style.WebkitTransform = "translate(0, 0)";
	};



	document.body.appendChild(div);
	div.appendChild(img);

	setTimeout(function () {
		div.onmouseover();

		setTimeout(function () {
			div.onmouseout();
		},500);

	},300);

};

addDown();
