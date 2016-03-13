/**
 * Created by sanya on 07.03.2016.
 */
function algo3() {
	var startTime = new Date();
	Array.prototype.max = function() {
		return Math.max.apply(null, this);
	};

	Array.prototype.min = function() {
		return Math.min.apply(null, this);
	};

	var tBody = document.getElementsByClassName('tableBody')[0];
	var numOfGarbageBlock = document.getElementById('numOfGarbage');
	var numOfStepsBlock = document.getElementById('numOfSteps');
	console.log(tBody);

	var tableCells = document.getElementsByClassName('tableCell');


	try {
		for (var i = 0, l = 50; i < l; ++i) {
			var randomNum = Math.round(Math.random() * 122);
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
	for (var i = 0; i < tableCells.length; i++) {
		var rand = Math.round(Math.random()*122);
		var isGarbage = tableCells[rand].hasAttribute("garbage");

		if (!isGarbage) {
			var cellTop = tableCells[rand].getBoundingClientRect().top;
			var cellLeft = tableCells[rand].getBoundingClientRect().left;

			tBody.insertAdjacentHTML('afterBegin', '<div id="cleaner" class="cleaner" width="66"> <img src="content/images/aspirator_64.png" alt="" width="100%" height="100%"> </div>');
			var clnr = document.getElementById('cleaner');
			clnr.style.top = (cellTop-tBody.getBoundingClientRect().top)+'px';
			clnr.style.left = (cellLeft-tBody.getBoundingClientRect().left) + 'px';
			break;
		}
	}


	var musors = document.getElementsByClassName('musor');
	var steps = 0;
	numOfGarbageBlock.innerHTML = musors.length;
	numOfStepsBlock.innerHTML = steps;

	var cleaner = document.getElementsByClassName('cleaner')[0];
	var cleanerTrue = cleaner.children[0];
	var wallsLeft = document.getElementsByClassName('wallCell1');
	var wallsBottom = document.getElementsByClassName('wallCell2');
	var tableBody = document.getElementsByClassName('tableBody')[0];

	var left = cellLeft - tBody.getBoundingClientRect().left;
	var top = cellTop - tBody.getBoundingClientRect().top;

	var move;

	var speed = 1;

	function GenerateRandomNum(min, max) {
		var random = min + Math.random() * (max - min);
		random = Math.round(random);
		return random;
	}

	function sensors(tableCells) {
		var cell = tableCells;
		var nextBrother = cell.nextElementSibling; // следующая ячейка
		var prevBrother = cell.previousElementSibling; // предыдущая ячейка
		var parent = cell.parentNode; //родитель текущей ячейки
		var cellClassArr = cell.className.split(" "); //массив с классами текущей ячейки

		cell.innerHTML = "";
		cell.setAttribute("clean","");
		numOfGarbageBlock.innerHTML = musors.length;
		if (musors.length == 0) {
			clearInterval(move);
			Finish();
		}

		var isTopLeftAngle = (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
													&& (cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left);
		var isTopRightAngle = (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
													&& (cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right);
		var isBottomLeftAngle = (cell.getBoundingClientRect().bottom == tableBody.getBoundingClientRect().bottom)
														&& (cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left);
		var isBottomRightAngle = (cell.getBoundingClientRect().bottom == tableBody.getBoundingClientRect().bottom)
														&& (cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right);
		var isAboveWall3 = cell.classList.contains('preLast1AfterWall1');
		if (nextBrother) {
			var isTop1Wall1Angle = (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
														&& nextBrother.classList.contains('wallCell1');
			var isAboveW2Wall3Angle = (cell.classList.contains('aboveWall2'))
																&& (nextBrother.classList.contains('wallCell3'));
		}
		if (prevBrother) {
			var isTop2Wall1Angle = (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
														&& (prevBrother.classList.contains('wallCell1'));
			var isAboveW2Wall1Angle = (cell.classList.contains('aboveWall2'))
														&& (prevBrother.classList.contains('wallCell1'));
			var isAfterWall3 = prevBrother.classList.contains('wallCell3');
		}

		if (isTopLeftAngle) {
			var direction = GenerateRandomNum(1,2);
			if (direction == 1) {
				clearInterval(move);
				moveRight();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveDown();
			}
		}
		else if (isTopRightAngle) {
			var direction = GenerateRandomNum(1,2);
			if (direction == 1) {
				clearInterval(move);
				moveLeft();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveDown();
			}
		}
		if (isBottomLeftAngle) {
			var direction = GenerateRandomNum(1,2);
			if (direction == 1) {
				clearInterval(move);
				moveRight();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveUp();
			}
		}
		if (isBottomRightAngle) {
			var direction = GenerateRandomNum(1,2);
			if (direction == 1) {
				clearInterval(move);
				moveLeft();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveUp();
			}
		}
		if (isTop1Wall1Angle) {
			var direction = GenerateRandomNum(1,2);
			if (direction == 1) {
				clearInterval(move);
				moveLeft();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveDown();
			}
		}
		if (isTop2Wall1Angle) {
			var direction = GenerateRandomNum(1,2);
			if (direction == 1) {
				clearInterval(move);
				moveRight();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveDown();
			}
		}
		if (isAboveW2Wall1Angle) {
			var direction = GenerateRandomNum(1,2);
			if (direction == 1) {
				clearInterval(move);
				moveRight();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveUp();
			}
		}
		if (isAboveW2Wall3Angle) {
			var direction = GenerateRandomNum(1,2);
			if (direction == 1) {
				clearInterval(move);
				moveLeft();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveUp();
			}
		}
		if (isAboveWall3) {
			var direction = GenerateRandomNum(1,2);
			if (direction == 1) {
				clearInterval(move);
				moveRight();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveLeft();
			}
		}
		if (isAfterWall3) {
			var direction = GenerateRandomNum(1,2);
			if (direction == 1) {
				clearInterval(move);
				moveUp();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveDown();
			}
		}

		if (nextBrother) {
			if (nextBrother.classList.contains('wallCell1') && !isTop1Wall1Angle) {
				var direction = GenerateRandomNum(2,4);
				if (direction == 2) {
					clearInterval(move);
					moveLeft();
				}
				else if (direction == 3) {
					clearInterval(move);
					moveDown();
				}
				else if (direction == 4) {
					clearInterval(move);
					moveUp();
				}
			}
			if (nextBrother.classList.contains('wallCell3') && !isAboveW2Wall3Angle) {
				var direction = GenerateRandomNum(1,3);
				if (direction == 1) {
					clearInterval(move);
					moveLeft();
				}
				else if (direction == 2) {
					clearInterval(move);
					moveDown();
				}
				else if (direction == 3) {
					clearInterval(move);
					moveUp();
				}
			}
		}
		if (prevBrother) {
			if (prevBrother.classList.contains('wallCell1') && !isTop2Wall1Angle && !isAboveW2Wall1Angle) {
				var direction = GenerateRandomNum(1,3);
				if (direction == 1) {
					clearInterval(move);
					moveRight();
				}
				else if (direction == 2) {
					clearInterval(move);
					moveDown();
				}
				else if (direction == 3) {
					clearInterval(move);
					moveUp();
				}
			}
		}
		if (cell.classList.contains('aboveWall2') && !isAboveW2Wall1Angle && !isAboveW2Wall3Angle) {
			var direction = GenerateRandomNum(1,3);

			if (direction == 1) {
				clearInterval(move);
				moveLeft();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveRight();
			}
			else if (direction == 3) {
				clearInterval(move);
				moveUp();
			}
		}
		if (cell.classList.contains('underWall2')) {
			var direction = GenerateRandomNum(1,3);

			if (direction == 1) {
				clearInterval(move);
				moveLeft();
			}
			else if (direction == 2) {
				clearInterval(move);
				moveRight();
			}
			else if (direction == 3) {
				clearInterval(move);
				moveDown();
			}
		}

		if ((cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
			&& !isTop1Wall1Angle
			&& !isTop2Wall1Angle
			&& !isTopLeftAngle
			&& !isTopRightAngle
			&& !isAboveWall3) {
			var direction = GenerateRandomNum(1,3);

			if (direction == 1) {
				clearInterval(move);
				moveRight();
			}
			if (direction == 2) {
				clearInterval(move);
				moveLeft();
			}
			else if (direction == 3) {
				clearInterval(move);
				moveDown();
			}
		}

		if ((cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left)
			&& !isTopLeftAngle
			&& !isBottomLeftAngle) {
			var direction = GenerateRandomNum(1,3);

			if (direction == 1) {
				clearInterval(move);
				moveRight();
			}
			if (direction == 2) {
				clearInterval(move);
				moveDown();
			}
			else if (direction == 3) {
				clearInterval(move);
				moveUp();
			}
		}

		if ((cell.getBoundingClientRect().bottom == tableBody.getBoundingClientRect().bottom)
			&& !isBottomLeftAngle
			&& !isBottomRightAngle) {
			var direction = GenerateRandomNum(1,3);

			if (direction == 1) {
				clearInterval(move);
				moveRight();
			}
			if (direction == 2) {
				clearInterval(move);
				moveLeft();
			}
			else if (direction == 3) {
				clearInterval(move);
				moveUp();
			}
		}

		if ((cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right)
			&& !isBottomRightAngle
			&& !isTopRightAngle
			&& !isAfterWall3) {
			var direction = GenerateRandomNum(1,3);

			if (direction == 1) {
				clearInterval(move);
				moveLeft();
			}
			if (direction == 2) {
				clearInterval(move);
				moveDown();
			}
			else if (direction == 3) {
				clearInterval(move);
				moveUp();
			}
		}
		if (cell.classList.contains('areaWithoutBorders')) {
			var direction = GenerateRandomNum(1,4);

			if (direction == 1) {
				clearInterval(move);
				moveRight();
			}
			if (direction == 2) {
				clearInterval(move);
				moveLeft();
			}
			else if (direction == 3) {
				clearInterval(move);
				moveDown();
			}
			else if (direction == 4) {
				clearInterval(move);
				moveUp();
			}
		}
	}

	/**
	 * direction:
	 * 1 - Right
	 * 2 - Left
	 * 3 - Down
	 * 4 - Up
	 */


	function moveRight() {
		move = setInterval(function () {
			left += 1;
			cleaner.style.left = left+'px';
			for (var i = 0; i < tableCells.length; ++i) {
				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
					&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
					&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {

					sensors(tableCells[i]);

				}
			}
		}, speed);
	}

	function moveLeft() {
		move = setInterval(function () {
			left -= 1;
			cleaner.style.left = left+'px';

			for (var i = 0; i < tableCells.length; ++i) {
				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
					&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
					&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {

					sensors(tableCells[i]);

				}
			}
		}, speed);
	}

	function moveDown() {
		move = setInterval(function () {
			top += 1;
			cleaner.style.top = top+'px';

			for (var i = 0; i < tableCells.length; ++i) {
				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
					&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
					&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {

					sensors(tableCells[i]);

				}
			}
		}, speed);
	}

	function moveUp() {
		move = setInterval(function () {
			top -= 1;
			cleaner.style.top = top+'px';

			for (var i = 0; i < tableCells.length; ++i) {
				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
					  && cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
						&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {

					sensors(tableCells[i]);

				}
			}
		}, speed);
	}






	//---------------------------------------------------------------------------------

	var finishAlert = document.getElementsByClassName('finish')[0];
	function Finish() {
		clearInterval(move);
		clearInterval(move);
		var finishTime = new Date();
		document.getElementById('elapsedTime').innerHTML = ((finishTime - startTime)/1000).toString();
		finishAlert.classList.add('open');
	}


	var btnStart = document.getElementsByClassName('btn-start')[0];
	var btnStop = document.getElementsByClassName('btn-stop')[0];
	var btnRetry = document.getElementsByClassName('btn-retry')[0];
	btnStart.addEventListener('click', function() {
		moveDown();
	});
	btnStop.addEventListener('click', function() {
		clearInterval(move);
	});
	btnRetry.addEventListener('click', function() {
		window.location.reload();
	});
}




