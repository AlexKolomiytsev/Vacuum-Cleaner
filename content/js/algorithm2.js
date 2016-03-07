/**
 * Created by sanya on 07.03.2016.
 */
function algo2() {
	var tBody = document.getElementsByClassName('tableBody')[0];
	var numOfGarbageBlock = document.getElementById('numOfGarbage');

	console.log(tBody);

	var tableCells = document.getElementsByClassName('tableCell');

	try {
		for (var i = 0, l = 100; i < l; ++i) {
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
	numOfGarbageBlock.innerHTML = musors.length;


	var cleaner = document.getElementsByClassName('cleaner')[0];
	var wallsLeft = document.getElementsByClassName('wallCell1');
	var wallsBottom = document.getElementsByClassName('wallCell2');
	var tableBody = document.getElementsByClassName('tableBody')[0];

	var left = cellLeft-tBody.getBoundingClientRect().left ;
	var top = cellTop-tBody.getBoundingClientRect().top;

	var move;

	var speed = 1;

	function analize() {
		for (var i = 0; i < tableCells.length; ++i) {
			if (((cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left)
					|| (cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1)
					|| (cleaner.getBoundingClientRect().left+1 == tableCells[i].getBoundingClientRect().left))
					&& (cleaner.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top)) {

				var cell = tableCells[i];
				var nextBrother = cell.nextElementSibling;
				var prevBrother = cell.previousElementSibling;
				var parent = cell.parentNode;
				var cellClassArr = cell.className.split(" ");
				for (var j = 0; j < cellClassArr.length;j++) {
					var classNameSet;
					if (cellClassArr[j] == 'setBeforeWall1') {
						classNameSet = 'setBeforeWall1';
						break;
					}
					if (cellClassArr[j] == 'setWithoutWall') {
						classNameSet = 'setWithoutWall';
						break;
					}
				}

				var cellClass = cellClassArr[cellClassArr.length-1]; //класс конкретного ряда

				var before1Wall1 = document.getElementsByClassName('1beforeWall1');
				var before2Wall1 = document.getElementsByClassName('2beforeWall1');
				var before3Wall1 = document.getElementsByClassName('3beforeWall1');
				var before4Wall1 = document.getElementsByClassName('4beforeWall1');
				var before5Wall1 = document.getElementsByClassName('5beforeWall1');
				var setBeforeWall1 = document.getElementsByClassName('setBeforeWall1');

				cell.innerHTML = "";
				cell.setAttribute("clean","");
//:::::::::::::::area before first wall::::::::::::::::::::::::::::::::::::::::
				if (classNameSet == 'setBeforeWall1') {
					for (var q = 0; q < setBeforeWall1.length; q++) {
						var goToAnotherSet;
						var goToBefore1Wall1;
						var goToBefore2Wall1;
						var goToBefore3Wall1;
						var goToBefore4Wall1;
						var goToBefore5Wall1;

						if (setBeforeWall1[q].children.length > 0) {
							goToAnotherSet = false;
							break;
						}
						else {
							goToAnotherSet = true;
						}
					}

					$('.setBeforeWall1').each(function(w) {
						$(this).removeClass("setBeforeWall1");
					});

					for (var w = 0; w < before1Wall1.length; w++) {
						if (before1Wall1[w].children.length > 0) {
							goToBefore1Wall1 = true;
							break;
						}
						else {
							goToBefore1Wall1 = false;
							//clearInterval(move);
						}
					}
					if (goToBefore1Wall1) {
						//var indexOfGarbage;
						if (cellClass == '1beforeWall1') {
							clearInterval(move);
							moveLeft();
						}
						else {
							moveUp();
						}
					}

					if (goToAnotherSet) moveDown();
				}
//:::::::::::::::area without wall:::::::::::::::::::::::::::::::::::::::::
				if (classNameSet == 'setWithoutWall') {
					clearInterval(move);
					//moveRight();
				}



			}
		}
	}

	function moveRight() {
		move = setInterval(function () {
			analize();
			left += 1;
			cleaner.style.left = left+'px';
		}, speed);
	}
	function moveLeft() {
		move = setInterval(function () {
			analize();
			left -= 1;
			cleaner.style.left = left+'px';
		}, speed);
	}

	function moveDown() {
		move = setInterval(function () {
			analize();
			top += 1;
			cleaner.style.top = top+'px';

		}, speed);
	}

	function moveUp() {
		move = setInterval(function () {
			analize();
			top -= 1;
			cleaner.style.top = top+'px';

		}, speed);
	}

	//---------------------------------------------------------------------------------

	var finishAlert = document.getElementsByClassName('finish')[0];
	function Finish() {
		clearInterval(move);
		finishAlert.classList.add('open');
	}


	var btnStart = document.getElementsByClassName('btn-start')[0];
	var btnStop = document.getElementsByClassName('btn-stop')[0];
	var btnRetry = document.getElementsByClassName('btn-retry')[0];
	btnStart.addEventListener('click', function() {
		//moveUp();
		analize();
	});
	btnStop.addEventListener('click', function() {
		clearInterval(move);
	});
	btnRetry.addEventListener('click', function() {
		window.location.reload();
	});
}