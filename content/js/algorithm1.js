/**
 * Created by sanya on 16.02.2016.
 */
function algo1() {

	var startTime = new Date();
	var startMsec = startTime.getMilliseconds();
	//startTime.setTime(5000000);

	var steps;
	var stepsInput = document.getElementsByClassName('stepsInput')[0];
	stepsInput.addEventListener('change', function() {
		steps = stepsInput.value;
	});


	var tBody = document.getElementsByClassName('tableBody')[0];
	var numOfGarbageBlock = document.getElementById('numOfGarbage');
	var aveDirtyDegreeBlock = document.getElementById('dirtyDegree');


	console.log(tBody);

	var tableCells = document.getElementsByClassName('tableCell');

	try {
		for (var i = 0, l = 100; i < l; ++i) {
			var randomNum = Math.round(0 + Math.random() * (120 - 1));
			var isGarbage = tableCells[randomNum].hasAttribute("garbage");
			if (!isGarbage) {
				tableCells[randomNum].insertAdjacentHTML('beforeEnd', '<img class="musor" src="content/images/garbage.png" alt="" width="60">');
				tableCells[randomNum].setAttribute("garbage", "");
			}
		}
	}
	catch(ex) {
		console.log(ex);
	}
	//tBody.insertAdjacentHTML('afterBegin', '<div id="cleaner" class="cleaner" width="66"> <img src="content/images/aspirator_64.png" alt="" width="100%" height="100%"> </div>');
	//var rand = 0;
	var isGarbage = tableCells[0].hasAttribute("garbage");

	if (!isGarbage) {
		var cellTop = tableCells[0].getBoundingClientRect().top;
		var cellLeft = tableCells[0].getBoundingClientRect().left;

		tBody.insertAdjacentHTML('afterBegin', '<div id="cleaner" class="cleaner" width="66"> <img src="content/images/aspirator_64.png" alt="" width="100%" height="100%"> </div>');
		var clnr = document.getElementById('cleaner');
		clnr.style.top = (cellTop-tBody.getBoundingClientRect().top)+'px';
		clnr.style.left = (cellLeft-tBody.getBoundingClientRect().left) + 'px';
		//break;
	}


	var musors = document.getElementsByClassName('musor');
	numOfGarbageBlock.innerHTML = musors.length;
	aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";



	var cleaner = document.getElementsByClassName('cleaner')[0];
	var cleanerTrue = cleaner.children[0];
	var wallsLeft = document.getElementsByClassName('wallCell1');
	var wallsBottom = document.getElementsByClassName('wallCell2');
	var tableBody = document.getElementsByClassName('tableBody')[0];

	var left = 0;
	var right = 0;
	var top = 0;
	var bottom = 0;

	var move;

	var speed = 1;
	//console.log(cleaner.getBoundingClientRect().right);
	//console.log(tableCells[103].getBoundingClientRect().left);

	function averageDirtyDegree() {
		var numOfGarbage = 0;
		for (var jj = 0; jj < tableCells.length; jj++) {
			if(tableCells[jj].children.length > 0) {
				++numOfGarbage;
			}
		}
		//var degree =
		return Math.round((numOfGarbage / tableCells.length) * 100);
	}

	function moveRight() {
		move = setInterval(function () {
			left += 1;
			cleaner.style.left = left+'px';
			for (var i = 0; i < tableCells.length; ++i) {
				//if (((cleaner.getBoundingClientRect().right == tableCells[i].getBoundingClientRect().right)
				//		|| cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left)
				//		&&(cleaner.getBoundingClientRect().top+1 == tableCells[i].getBoundingClientRect().top)) {
					if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
							&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
							&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {


						tableCells[i].setAttribute("clean", "");
						tableCells[i].removeAttribute("garbage");
						tableCells[i].innerHTML = "";
						numOfGarbageBlock.innerHTML = musors.length;
						aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";

						if (musors.length == 0) Finish();
						stepsInput.value = --steps;
						if (steps == 0) {
							clearInterval(move);
							//throw new Error('STOP!');
						}

						if (tableCells[i].nextElementSibling) {
							if (tableCells[i].nextElementSibling.classList.contains('wallCell1')) {
								clearInterval(move);
								moveLeft();
							}
							if (tableCells[i].nextElementSibling.classList.contains('wallCell3')) {
								console.log("yo");
								var parent = tableCells[i].parentNode.nextElementSibling;
								var count = 0;
								for (var q = 0; q < parent.children.length; ++q) {
									if(parent.children[q].classList.contains('wallCell2')) {
										count++;
									}
								}
								if (count) {
									clearInterval(move);
									moveUp();
								}
								else {
									clearInterval(move);
									moveLeft();
								}
							}
						}




						if((tableCells[i].getBoundingClientRect().right == tableBody.getBoundingClientRect().right)
							&& tableCells[i].parentNode.nextElementSibling) {
							clearInterval(move);
							moveLeft();
						}
						else if (tableCells[i].getBoundingClientRect().right == tableBody.getBoundingClientRect().right) {
							clearInterval(move);
							//moveLeft();
							moveUp();
						}
				}
			}
		}, speed);
	}
	function moveLeft() {
		move = setInterval(function () {
			left -= 1;
			cleaner.style.left = left+'px';
			for (var i = 0; i < tableCells.length; ++i) {
				//if ((cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1)
				//		&&((cleaner.getBoundingClientRect().top+1 == tableCells[i].getBoundingClientRect().top)
				//		||(cleaner.getBoundingClientRect().top+2 == tableCells[i].getBoundingClientRect().top))) {

					if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
							&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
							&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {

						tableCells[i].setAttribute("clean", "");
						tableCells[i].removeAttribute("garbage");
						tableCells[i].innerHTML = "";
						numOfGarbageBlock.innerHTML = musors.length;
						aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";

						if (musors.length == 0) Finish();

						stepsInput.value = --steps;
						if (steps == 0) {
							clearInterval(move);
							throw new Error('STOP!');
						}

						if(tableCells[i].getBoundingClientRect().left == tableBody.getBoundingClientRect().left) {
							clearInterval(move);
							moveDown();
						}

						if (tableCells[i].previousElementSibling) {
							if (tableCells[i].previousElementSibling.classList.contains('wallCell1')) {
								clearInterval(move);
								moveDown();
							}
						}
				}
			}
		}, speed);
	}
	function moveDown() {
		move = setInterval(function () {
			top += 1;
			cleaner.style.top = top+'px';
			for (var i = 0; i < tableCells.length; ++i) {
				//if (((cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left)
				//		|| (cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1))
				//		&&(cleaner.getBoundingClientRect().top+1 == tableCells[i].getBoundingClientRect().top)) {

					if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
							&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
							&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {

						tableCells[i].setAttribute("clean", "");
						tableCells[i].removeAttribute("garbage");
						tableCells[i].innerHTML = "";

						numOfGarbageBlock.innerHTML = musors.length;
						aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";

						stepsInput.value = --steps;
						if (steps == 0) {
							clearInterval(move);
							throw new Error('STOP!');
						}

						if (musors.length == 0) Finish();

						if(cleaner.getBoundingClientRect().bottom == tableBody.getBoundingClientRect().bottom) {
							clearInterval(move);
							moveRight();
						}


						if (tableCells[i].getBoundingClientRect().left == tableBody.getBoundingClientRect().left) {
							clearInterval(move);
							moveRight();
						}

						if (tableCells[i].previousElementSibling) {
							if (tableCells[i].previousElementSibling.classList.contains('wallCell1')) {
								//if (top % 66 == 0) {
									clearInterval(move);
									moveRight();
								//}
							}
						}


				}
			}

		}, speed);
	}
	function moveUp() {
		move = setInterval(function () {
			top -= 1;
			cleaner.style.top = top+'px';
			for (var i = 0; i < tableCells.length; ++i) {
				//if ((cleaner.getBoundingClientRect().right == tableCells[i].getBoundingClientRect().right)
				//		&&(cleaner.getBoundingClientRect().top+1 == tableCells[i].getBoundingClientRect().top)) {

					if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
							&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
							&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {

						tableCells[i].setAttribute("clean", "");
						tableCells[i].removeAttribute("garbage");
						tableCells[i].innerHTML = "";

						numOfGarbageBlock.innerHTML = musors.length;
						aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";

						stepsInput.value = --steps;
						if (steps == 0) {
							clearInterval(move);
							throw new Error('STOP!');
						}

						if (musors.length == 0) Finish();

						if(tableCells[i].getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1) {
							clearInterval(move);
							moveLeft();
						}
				}
			}





		}, speed);
	}

	var finishAlert = document.getElementsByClassName('finish')[0];
	function Finish() {
		clearInterval(move);
		var finishTime = new Date().getMilliseconds();
		//var elapsed = (finishTime.getTime() - startMsec) / 1000;

		//document.getElementById('elapsedTime').innerHTML = elapsed.toString();
		finishAlert.classList.add('open');
	}


	var btnStart = document.getElementsByClassName('btn-start')[0];
	var btnStop = document.getElementsByClassName('btn-stop')[0];
	var btnRetry = document.getElementsByClassName('btn-retry')[0];
	btnStart.addEventListener('click', function() {
		moveRight();
	});
	btnStop.addEventListener('click', function() {
		clearInterval(move);
	});
	btnRetry.addEventListener('click', function() {
		window.location.reload();
	});
}















	//function animate(options) {
//
	//	var start = performance.now();
//
	//	requestAnimationFrame(function animate(time) {
	//		// timeFraction от 0 до 1
	//		var timeFraction = (time - start) / options.duration;
	//		if (timeFraction > 1) timeFraction = 1;
//
	//		// текущее состояние анимации
	//		var progress = options.timing(timeFraction)
//
	//		options.draw(progress);
//
	//		if (timeFraction < 1) {
	//			requestAnimationFrame(animate);
	//		}
//
	//	});
	//}

	//for (var i = 0; i < 100; i++) {
	//animate({
	//	duration: 200,
	//	timing: function (timeFraction) {
	//		return timeFraction;
	//	},
	//	draw: function (progress) {
	//		cleaner.style.left = progress * 10 + 'px';
	//		cleaner.style.top = progress * 10 + 'px';
	//	}
	//});
	//}

	//for (var i = 0; i < 100; i++) {


	//}

	//var canvas = document.getElementsByClassName('vacuumCleaner')[0];
	//var ctx = canvas.getContext("2d");
	//console.log(canvas);
	//console.log(ctx);
/*
	Environment();
	function Environment() {
		ctx.strokeStyle="#423737";

		//top
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.moveTo(0, 0);
		ctx.lineTo(canvas.width,0);
		ctx.stroke();
		ctx.closePath();

		//left
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.moveTo(1, 0);
		ctx.lineTo(1,canvas.height);
		ctx.stroke();
		ctx.closePath();

		//bottom
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.moveTo(0, canvas.height);
		ctx.lineTo(canvas.width,canvas.height);
		ctx.stroke();
		ctx.closePath();

		//right
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.moveTo(canvas.width-1, 0);
		ctx.lineTo(canvas.width-1,canvas.height);
		ctx.stroke();
		ctx.closePath();

		//room
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.moveTo(198, 100);
		ctx.lineTo(1100,100);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.moveTo(1100,200);
		ctx.lineTo(1100,400);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.moveTo(1102,400);
		ctx.lineTo(198,400);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.moveTo(200,400);
		ctx.lineTo(200, 100);
		ctx.stroke();
		ctx.closePath();

	}
*/




