/**
 * Created by sanya on 20.03.2016.
 */
function algo4() {
	drawWall();

	var steps;
	var counterForAddGargabe = 0;
	var stepsInput = document.getElementsByClassName('stepsInput')[0];
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
	//areaWithoutBorders
	for (var i = 0; i < tableCells.length; i++) {
		var rand = Math.round(Math.random()*36);
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




	var numOfGarbage = 0;
	function sensors(tableCell) {
		var cell = tableCell;
		var nextBrother = cell.nextElementSibling; // следующая ячейка
		var prevBrother = cell.previousElementSibling; // предыдущая ячейка
		var parent = cell.parentNode; //родитель текущей ячейки
		var cellClassArr = cell.className.split(" "); //массив с классами текущей ячейки

		cell.innerHTML = "";
		cell.setAttribute("clean","");
		cell.removeAttribute("garbage");
		numOfGarbageBlock.innerHTML = musors.length;
		aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";
		if (musors.length == 0) {
			clearInterval(move);
			Finish();
		}
		stepsInput.value = --steps;
		if (steps == 0) {
			clearInterval(move);
			throw new Error('STOP!');
		}

		counterForAddGargabe += 0.5;
		if (counterForAddGargabe % 10 == 0) {
			var randd = Math.round(1 + Math.random() * (120 - 1));
			console.log(randd);
			var isGarbage = tableCells[randd].hasAttribute('garbage');
			console.log(isGarbage);
			if (!isGarbage) {
				tableCells[randd].insertAdjacentHTML('beforeEnd', '<img class="musor" src="content/images/garbage.png" alt="" width="60">');
				tableCells[randd].setAttribute("garbage", "");
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

	var btnNav = document.getElementsByClassName('btn-nav');
	var btnStart = document.getElementsByClassName('btn-start')[0];
	var btnStop = document.getElementsByClassName('btn-stop')[0];
	var btnRetry = document.getElementsByClassName('btn-retry')[0];
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




