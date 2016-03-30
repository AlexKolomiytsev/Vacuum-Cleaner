/**
 * Created by sanya on 20.03.2016.
 */
function algo5() {
	drawWall();

	var steps;
	var counterForAddGargabe = 0;
	var stepsInput = document.getElementsByClassName('stepsInput')[0];
	steps = stepsInput.value = 1500;
	stepsInput.addEventListener('change', function() {
		steps = stepsInput.value;
	});


	Array.prototype.max = function() {
		return Math.max.apply(null, this);
	};

	Array.prototype.min = function() {
		return Math.min.apply(null, this);
	};

	var tBody = document.getElementsByClassName('tableBody')[0];
	var numOfGarbageBlock = document.getElementById('numOfGarbage');
	var aveDirtyDegreeBlock = document.getElementById('dirtyDegree');

	var tableCells = document.getElementsByClassName('tableCell');
	for (var i = 0; i < tableCells.length; i++) {
		tableCells[i].setAttribute('iwashere','false');
	}


	function insertGarbage() {
		try {
			var tableCells = document.getElementsByClassName('tableCell');
			for (var i = 0, l = 50; i < l; ++i) {
				var randomNum = Math.round(0 + Math.random() * (120 - 1));
				var isGarbage = tableCells[randomNum].hasAttribute("garbage");
				if (!isGarbage) {
					tableCells[randomNum].insertAdjacentHTML('beforeEnd', '<img class="musor" src="content/images/garbage.png" alt="" width="60">');
					tableCells[randomNum].setAttribute("garbage", "");
					tableCells[randomNum].setAttribute("iwashere","false");
				}
			}
		}
		catch(ex) {
			console.log(ex);
		}
	}

	//areaWithoutBorders
	for (var i = 0; i < tableCells.length; i++) {
		var rand = Math.round(Math.random()*120);
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
	numOfGarbageBlock.innerHTML = musors.length;
	aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";


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



	var goLeft;
	var goRight;
	var goUp;
	var goDown;

	var numOfGarbage = 0;
	var isRandomBehavior;
	function sensors(tableCell) {
		var cell = tableCell;
		var nextBrother = cell.nextElementSibling; // следующая ячейка
		var prevBrother = cell.previousElementSibling; // предыдущая ячейка
		var parent = cell.parentNode; //родитель текущей ячейки
		var cellClassArr = cell.className.split(" "); //массив с классами текущей ячейки

		cell.innerHTML = "";
		cell.setAttribute("iwashere","true");
		cell.removeAttribute("garbage");
		numOfGarbageBlock.innerHTML = musors.length;
		aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";
		if (musors.length == 0) {
			clearInterval(move);
			Finish();
		}

		var indexOfCurrentCell;
		for (var op = 0; op < parent.children.length; ++op) {
			if (cell == parent.children[op]) {
				indexOfCurrentCell = op;
			}
		}



		stepsInput.value = --steps;
		if (steps == 0) {
			clearInterval(move);
			throw new Error('STOP!');
		}

		//динамически добавляем мусор
		try {
			counterForAddGargabe += 1;
			if (counterForAddGargabe % 5 == 0) {
				var randd = Math.round(1 + Math.random() * (120 - 1));

				var isGarbage = tableCells[randd].hasAttribute('garbage');

				if (!isGarbage) {
					tableCells[randd].insertAdjacentHTML('beforeEnd', '<img class="musor" src="content/images/garbage.png" alt="" width="60">');
					tableCells[randd].setAttribute("garbage", "");
					tableCells[randd].setAttribute("iwashere","false");

					tableCells[randd].classList.remove('iwashere');
					tableCells[randd].classList.add('tableCell');
				}
			}
		}
		catch (ex) {
			console.log(ex);
		}




		randomBehavior();
		var goAway;

		function randomBehavior() {

			// ::::::::::::::::::: BRAIN ::::::::::::::::::::::::

			try {
				var iwashereUp = parent.previousElementSibling.children[indexOfCurrentCell].getAttribute('iwashere');
				var iwashereDown = parent.nextElementSibling.children[indexOfCurrentCell].getAttribute('iwashere');
				var iwashereLeft = prevBrother.getAttribute('iwashere');
				var iwashereRight = nextBrother.getAttribute('iwashere');
			}
			catch (ex) {
				console.log(ex);
			}

			var iwashere = cell.getAttribute('iwashere');
			if(iwashere) {
				cell.classList.add('iwashere');
			}





			// ::::::::::::::::::: ^^^ BRAIN ^^^ ::::::::::::::::::::::::


			var isTopLeftAngle = (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
					&& (cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left);
			var isTopRightAngle = (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
					&& (cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right);
			var isBottomLeftAngle = (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom)
					&& (cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left);
			var isBottomRightAngle = (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom)
					&& (cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right);

			if (isTopLeftAngle) {
				goAway = true;

				if (cell.classList.contains('igotoyou')) {
					cell.classList.remove('igotoyou');

					goLeft = false;
					goUp = false;
					goRight = false;
					goDown = false;
				}

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
			if (isTopRightAngle) {
				goAway = true;

				if (cell.classList.contains('igotoyou')) {
					cell.classList.remove('igotoyou');

					goLeft = false;
					goUp = false;
					goRight = false;
					goDown = false;
				}

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
				goAway = true;

				if (cell.classList.contains('igotoyou')) {
					cell.classList.remove('igotoyou');

					goLeft = false;
					goUp = false;
					goRight = false;
					goDown = false;
				}

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
				goAway = true;
				if (cell.classList.contains('igotoyou')) {
					cell.classList.remove('igotoyou');

					goLeft = false;
					goUp = false;
					goRight = false;
					goDown = false;
				}

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


			try {

				//поведение пылесоса под верхней и над нижней стенкой
				if ((parent.nextElementSibling.classList.contains('tableRow') || parent.previousElementSibling.classList.contains('tableRow'))
						&& ((nextBrother || prevBrother) || (nextBrother && prevBrother) )) {


					if (parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& (cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right)) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveDown();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveLeft();
							}
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveDown();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveLeft();
							}
						}



					}
					if (parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& (cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right)) {

						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveUp();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveLeft();
							}
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveUp();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveLeft();
							}
						}


					}
					if (parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& (cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left)) {

						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveUp();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveUp();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
						}


					}
					if (parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& (cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left)) {

						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveDown();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveDown();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
						}


					}


					//console.log('wall Up - right: '
					//		+ parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
					//		+ ' - ' + (cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right));
					//console.log('wall Down - right: '
					//		+ parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
					//		+ ' -- cell.right = ' + cell.getBoundingClientRect().right
					//		+ ' -- tbody.right = ' + tableBody.getBoundingClientRect().right);

					if (parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& !parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& !nextBrother.classList.contains('wallCell')
							&& !prevBrother.classList.contains('wallCell')
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right)
							&& !(cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left)) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							var direction = GenerateRandomNum(1,3);
							if (direction == 1) {
								clearInterval(move);
								moveUp();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
							else if (direction == 3) {
								clearInterval(move);
								moveLeft();
							}
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							var direction = GenerateRandomNum(1,3);
							if (direction == 1) {
								clearInterval(move);
								moveUp();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
							else if (direction == 3) {
								clearInterval(move);
								moveLeft();
							}
						}


					}
					if (parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& !parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& !nextBrother.classList.contains('wallCell')
							&& !prevBrother.classList.contains('wallCell')
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right)
							&& !(cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left)
					) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							var direction = GenerateRandomNum(1,3);
							if (direction == 1) {
								clearInterval(move);
								moveDown();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
							else if (direction == 3) {
								clearInterval(move);
								moveLeft();
							}
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							var direction = GenerateRandomNum(1,3);
							if (direction == 1) {
								clearInterval(move);
								moveDown();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
							else if (direction == 3) {
								clearInterval(move);
								moveLeft();
							}
						}



					}
					if (parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
					) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							var direction = GenerateRandomNum(1,2);
							if (direction == 1) {
								clearInterval(move);
								moveLeft();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							var direction = GenerateRandomNum(1,2);
							if (direction == 1) {
								clearInterval(move);
								moveLeft();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
						}


					}
					if (parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& nextBrother.classList.contains('wallCell')
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
					) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

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
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
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


					}
					if (parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& prevBrother.classList.contains('wallCell')
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
					) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

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
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
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


					}
					if (parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& nextBrother.classList.contains('wallCell')
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
					) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

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
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
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


					}
					if (parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& prevBrother.classList.contains('wallCell')
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
							&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
							&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
					) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

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
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
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


					}
					if (parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& nextBrother.classList.contains('wallCell')
							&& prevBrother.classList.contains('wallCell')) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							clearInterval(move);
							moveUp();
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							clearInterval(move);
							moveUp();
						}


					}
					if (parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& nextBrother.classList.contains('wallCell')) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							clearInterval(move);
							moveLeft();
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							clearInterval(move);
							moveLeft();
						}


					}
					if (parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& prevBrother.classList.contains('wallCell')) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							clearInterval(move);
							moveRight();
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							clearInterval(move);
							moveRight();
						}


					}
					if (parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& nextBrother.classList.contains('wallCell')
							&& prevBrother.classList.contains('wallCell')) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

							clearInterval(move);
							moveDown();
						}
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
							clearInterval(move);
							moveDown();
						}


					}

					if (parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
							&& !isTopLeftAngle
							&& !isTopRightAngle) {
						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

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
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
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


					}
					if (parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
							&& (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom)
							&& !isBottomLeftAngle
							&& !isBottomRightAngle) {

						goAway = true;

						if (cell.classList.contains('igotoyou')) {
							cell.classList.remove('igotoyou');

							goLeft = false;
							goUp = false;
							goRight = false;
							goDown = false;

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
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if (goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else {
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


					}




				}


				//-----------------------------
				//&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
				//&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
				//&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
				//&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))

				//-----------------------------







				if ((cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom)
						&& !isBottomLeftAngle
						&& !isBottomRightAngle
						&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom) )) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveRight();
						}
						else if (direction == 2) {
							clearInterval(move);
							moveLeft();
						}
						else if (direction == 3) {
							clearInterval(move);
							moveUp();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveRight();
						}
						else if (direction == 2) {
							clearInterval(move);
							moveLeft();
						}
						else if (direction == 3) {
							clearInterval(move);
							moveUp();
						}
					}


				}
				if ((cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
						&& !isTopLeftAngle
						&& !isTopRightAngle
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1))) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveRight();
						}
						else if (direction == 2) {
							clearInterval(move);
							moveLeft();
						}
						else if (direction == 3) {
							clearInterval(move);
							moveDown();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveRight();
						}
						else if (direction == 2) {
							clearInterval(move);
							moveLeft();
						}
						else if (direction == 3) {
							clearInterval(move);
							moveDown();
						}
					}

				}
				if ((cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right)
						&& !isTopRightAngle
						&& !isBottomRightAngle
						&& !(prevBrother.classList.contains('wallCell'))
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && (cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right))
						&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && (cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right))) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveLeft();
						}
						else if (direction == 2) {
							clearInterval(move);
							moveUp();
						}
						else if (direction == 3) {
							clearInterval(move);
							moveDown();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveLeft();
						}
						else if (direction == 2) {
							clearInterval(move);
							moveUp();
						}
						else if (direction == 3) {
							clearInterval(move);
							moveDown();
						}
					}


				}
				if ((cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left)
						&& !isTopLeftAngle
						&& !isBottomLeftAngle
						&& !(nextBrother.classList.contains('wallCell'))
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && (cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left))
						&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && (cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left))) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveRight();
						}
						else if (direction == 2) {
							clearInterval(move);
							moveUp();
						}
						else if (direction == 3) {
							clearInterval(move);
							moveDown();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveRight();
						}
						else if (direction == 2) {
							clearInterval(move);
							moveUp();
						}
						else if (direction == 3) {
							clearInterval(move);
							moveDown();
						}
					}
				}

				if (nextBrother.classList.contains('wallCell')
						&& !(prevBrother.classList.contains('wallCell'))
						&& !(cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left)
						&& !parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
						&& !parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
						&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
				) {

					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveLeft();
						}
						if (direction == 2) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 3) {
							clearInterval(move);
							moveDown();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveLeft();
						}
						if (direction == 2) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 3) {
							clearInterval(move);
							moveDown();
						}
					}


				}
				if (prevBrother.classList.contains('wallCell')
						&& !(nextBrother.classList.contains('wallCell'))
						&& !(cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right)
						&& !parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
						&& !parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
						&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
				) {

					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveRight();
						}
						if (direction == 2) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 3) {
							clearInterval(move);
							moveDown();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,3);

						if (direction == 1) {
							clearInterval(move);
							moveRight();
						}
						if (direction == 2) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 3) {
							clearInterval(move);
							moveDown();
						}
					}
				}
				if (prevBrother.classList.contains('wallCell') && nextBrother.classList.contains('wallCell')
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell'))
						&& !(parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
						&& !(parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell') && nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell'))
				) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,2);

						if (direction == 1) {
							clearInterval(move);
							moveDown();
						}
						if (direction == 2) {
							clearInterval(move);
							moveUp();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,2);

						if (direction == 1) {
							clearInterval(move);
							moveDown();
						}
						if (direction == 2) {
							clearInterval(move);
							moveUp();
						}
					}


				}
				if (nextBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
						&& !(nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1))) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,2);

						if (direction == 1) {
							clearInterval(move);
							moveDown();
						}
						if (direction == 2) {
							clearInterval(move);
							moveLeft();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,2);

						if (direction == 1) {
							clearInterval(move);
							moveDown();
						}
						if (direction == 2) {
							clearInterval(move);
							moveLeft();
						}
					}
				}
				if (prevBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
						&& !(nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1))) {

					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,2);

						if (direction == 1) {
							clearInterval(move);
							moveDown();
						}
						if (direction == 2) {
							clearInterval(move);
							moveRight();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,2);

						if (direction == 1) {
							clearInterval(move);
							moveDown();
						}
						if (direction == 2) {
							clearInterval(move);
							moveRight();
						}
					}


				}
				if (nextBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom)
						&& !(nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom))) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,2);

						if (direction == 1) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 2) {
							clearInterval(move);
							moveLeft();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,2);

						if (direction == 1) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 2) {
							clearInterval(move);
							moveLeft();
						}
					}


				}
				if (prevBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom)
						&& !(nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom))) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,2);
						if (direction == 1) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 2) {
							clearInterval(move);
							moveRight();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,2);
						if (direction == 1) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 2) {
							clearInterval(move);
							moveRight();
						}
					}
				}
				if (nextBrother.classList.contains('wallCell')
						&& prevBrother.classList.contains('wallCell')
						&& (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						clearInterval(move);
						moveDown();
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						clearInterval(move);
						moveDown();
					}

				}
				if (nextBrother.classList.contains('wallCell')
						&& prevBrother.classList.contains('wallCell')
						&& (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom)) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						clearInterval(move);
						moveUp();
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						clearInterval(move);
						moveUp();
					}


				}
				if ((cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left) && nextBrother.classList.contains('wallCell')) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,2);
						if (direction == 1) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 2) {
							clearInterval(move);
							moveDown();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,2);
						if (direction == 1) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 2) {
							clearInterval(move);
							moveDown();
						}
					}


				}
				if ((cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right) && prevBrother.classList.contains('wallCell')) {
					goAway = true;

					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;

						var direction = GenerateRandomNum(1,2);
						if (direction == 1) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 2) {
							clearInterval(move);
							moveDown();
						}
					}
					if (goUp) {
						clearInterval(move);
						moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}
					else {
						var direction = GenerateRandomNum(1,2);
						if (direction == 1) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 2) {
							clearInterval(move);
							moveDown();
						}
					}
				}



				// если находимся в ячейке, не окруженной стенками
				if (!(cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom)
						&& !(cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1)
						&& !(cell.getBoundingClientRect().right == tableBody.getBoundingClientRect().right)
						&& !(cell.getBoundingClientRect().left == tableBody.getBoundingClientRect().left)
						&& !(nextBrother.classList.contains('wallCell'))
						&& !(prevBrother.classList.contains('wallCell'))
						&& !((nextBrother.classList.contains('wallCell'))&&(prevBrother.classList.contains('wallCell')))
						&& !(nextBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1))
						&& !(prevBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1))
						&& !(prevBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom))
						&& !(nextBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom))
						&& !(nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().top == tableBody.getBoundingClientRect().top+1))
						&& !(nextBrother.classList.contains('wallCell') && prevBrother.classList.contains('wallCell') && (cell.getBoundingClientRect().bottom+1 == tableBody.getBoundingClientRect().bottom))
						&& !parent.nextElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')
						&& !parent.previousElementSibling.children[indexOfCurrentCell].classList.contains('wallCell')) {

					goAway = false;

					//определяем индекс СТРОКИ, на которой находится пылесос
					var indexOfParentRow;
					for (var c = 0; c < 9; ++c) {
						if (parent.parentNode.children[c].children[indexOfCurrentCell] == cell) {
							indexOfParentRow = c-2;
							break;
						}
					}


					/*(function gogogo() {
						for (var c = indexOfParentRow; c > 1; c--) {
							if (parent.parentNode.children[c].children[indexOfCurrentCell].classList.contains('igotoyou')) {
								iGoToYouUP = true;
								break;
							}
						}
						for (var c = indexOfParentRow; c < 9; c++) {
						  if (parent.parentNode.children[c].children[indexOfCurrentCell].classList.contains('igotoyou')) {
						  	iGoToYouDOWN = true;
						  	break;
						  }
						}

						if (prevBrother.classList.contains('igotoyou')) iGoToYouLEFT = true;
						if (nextBrother.classList.contains('igotoyou')) iGoToYouRIGHT = true;*!/

					})();*/







					/*if (iGoToYouUP) {
						console.log('go upupupupup');
						clearInterval(move);
						moveUp();
					}*/


					if (cell.classList.contains('igotoyou')) {
						cell.classList.remove('igotoyou');

						goLeft = false;
						goUp = false;
						goRight = false;
						goDown = false;
					}
					if (goUp) {
							clearInterval(move);
							moveUp();
					}
					else if (goLeft) {
						clearInterval(move);
						moveLeft();
					}
					else if (goRight) {
						clearInterval(move);
						moveRight();
					}
					else if (goDown) {
						clearInterval(move);
						moveDown();
					}


					else if ((iwashereUp == 'true' && iwashereDown == 'true' && iwashereLeft == 'true' && iwashereRight == 'true')
							&& !goAway) {

						for (var c = indexOfParentRow; c > 1; c--) {
							if (parent.parentNode.children[c].children[indexOfCurrentCell].classList.contains('wallCell')) {
								goUp = false;
								break;
							}
							else if (parent.parentNode.children[c].children[indexOfCurrentCell].getAttribute('iwashere') == 'false') {
								if (!goLeft && !goRight && !goDown) {
									parent.parentNode.children[c].children[indexOfCurrentCell].classList.add('igotoyou');
									goUp = true;
									break;
								}
							}
						}
						for (var c = indexOfParentRow; c < 9; c++) {
							if (parent.parentNode.children[c].children[indexOfCurrentCell].classList.contains('wallCell')) {
								goDown = false;
								break;
							}
							else if (parent.parentNode.children[c].children[indexOfCurrentCell].getAttribute('iwashere') == 'false') {
								if (!goLeft && !goRight && !goUp) {
									parent.parentNode.children[c].children[indexOfCurrentCell].classList.add('igotoyou');
									goDown = true;
									break;
								}
							}
						}
						for (var c = indexOfCurrentCell; c >= 0; c--) {
							if (parent.children[c].classList.contains('wallCell')) {
								goLeft = false;
								break;
							}
							else if (parent.children[c].getAttribute('iwashere') == 'false') {
								if (!goDown && !goRight && !goUp) {
									parent.children[c].classList.add('igotoyou');
									goLeft = true;
									break;
								}
							}
						}
						for (var c = indexOfCurrentCell; c < 20; c++) {
							if (parent.children[c].classList.contains('wallCell')) {
								goRight = false;
								break;
							}
							else if (parent.children[c].getAttribute('iwashere') == 'false') {
								if (!goDown && !goLeft && !goUp) {
									parent.children[c].classList.add('igotoyou');
									goRight = true;
									break;
								}
							}
						}

						//увидели цель - выбираем направление рандомно
						/*if (goUp && goDown && goLeft && goRight) {
							var direction = GenerateRandomNum(1,4);

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
							else if (direction == 4) {
								clearInterval(move);
								moveDown();
							}
						}
						else if (goUp && !goDown && !goLeft && !goRight) {
							clearInterval(move);
							moveUp();
						}
						else if (!goUp && goDown && !goLeft && !goRight) {
							clearInterval(move);
							moveDown();
						}
						else if (!goUp && !goDown && goLeft && !goRight) {
							clearInterval(move);
							moveLeft();
						}
						else if (!goUp && !goDown && !goLeft && goRight) {
							clearInterval(move);
							moveRight();
						}
						else if (goUp && goDown && !goLeft && !goRight) {
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
						else if (!goUp && goDown && goLeft && !goRight) {
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
						else if (!goUp && !goDown && goLeft && goRight) {
							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveLeft();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
						}
						else if (goUp && !goDown && !goLeft && goRight) {
							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveUp();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
						}
						else if (goUp && !goDown && goLeft && !goRight) {
							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveUp();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveLeft();
							}
						}
						else if (!goUp && goDown && !goLeft && goRight) {
							var direction = GenerateRandomNum(1,2);

							if (direction == 1) {
								clearInterval(move);
								moveDown();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
						}
						else if (goUp && goDown && goLeft && !goRight) {
							var direction = GenerateRandomNum(1,3);

							if (direction == 1) {
								clearInterval(move);
								moveDown();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveUp();
							}
							else if (direction == 3) {
								clearInterval(move);
								moveLeft();
							}
						}
						else if (!goUp && goDown && goLeft && goRight) {
							var direction = GenerateRandomNum(1,3);

							if (direction == 1) {
								clearInterval(move);
								moveDown();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
							else if (direction == 3) {
								clearInterval(move);
								moveLeft();
							}
						}
						else if (goUp && !goDown && goLeft && goRight) {
							var direction = GenerateRandomNum(1,3);

							if (direction == 1) {
								clearInterval(move);
								moveUp();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
							else if (direction == 3) {
								clearInterval(move);
								moveLeft();
							}
						}
						else if (goUp && goDown && !goLeft && goRight) {
							var direction = GenerateRandomNum(1,3);

							if (direction == 1) {
								clearInterval(move);
								moveDown();
							}
							else if (direction == 2) {
								clearInterval(move);
								moveRight();
							}
							else if (direction == 3) {
								clearInterval(move);
								moveUp();
							}
						}*/



						//увидели цель - едем строго к ней
						if (goUp) {
							clearInterval(move);
							moveUp();
						}
						else if (goDown) {
							clearInterval(move);
							moveDown();
						}
						else if (goLeft) {
							clearInterval(move);
							moveLeft();
						}
						else if(goRight) {
							clearInterval(move);
							moveRight();
						}

					}
					else {
						var direction = GenerateRandomNum(1,4);
						if (direction == 1) {
							clearInterval(move);
							moveUp();
						}
						if (direction == 2) {
							clearInterval(move);
							moveRight();
						}
						if (direction == 3) {
							clearInterval(move);
							moveLeft();

						}
						if (direction == 4) {
							clearInterval(move);
							moveDown();
						}
					}
				}


			}
			catch (ex) {
				console.log(ex);
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
				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left
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
				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left
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
				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left
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
				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left
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

	var btnNav = document.getElementsByClassName('btn-nav');
	var btnStart = document.getElementsByClassName('btn-start')[0];
	var btnStop = document.getElementsByClassName('btn-stop')[0];
	var btnRetry = document.getElementsByClassName('btn-retry')[0];
	var btnDropGarb = document.getElementsByClassName('btn-dropGarb')[0];

	btnDropGarb.addEventListener('click', insertGarbage);

	btnStart.addEventListener('click', function() {
		deactiveItems(btnNav);
		this.classList.add('active');

		var faq3 = document.getElementsByClassName('FAQ3')[0];
		faq3.classList.remove('open');
		moveDown();
	});
	btnStop.addEventListener('click', function() {
		deactiveItems(btnNav);
		this.classList.add('active');

		clearInterval(move);
	});
	btnRetry.addEventListener('click', function() {
		deactiveItems(btnNav);
		this.classList.add('active');

		window.location.reload();
	});
	function deactiveItems(collection) {
		for (var i = 0; i < collection.length; ++i) {
			collection[i].classList.remove('active');
		}
	}
}




