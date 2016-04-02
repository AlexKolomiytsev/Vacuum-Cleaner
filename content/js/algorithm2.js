/**
 * Created by sanya on 07.03.2016.
 */
function algo2() {
	var startTime = new Date();

	var counterForAddGargabe = 0;

	var steps;
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
	aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";



	var cleaner = document.getElementsByClassName('cleaner')[0];
	var cleanerTrue = cleaner.children[0];
	var wallsLeft = document.getElementsByClassName('wallCell1');
	var wallsBottom = document.getElementsByClassName('wallCell2');
	var tableBody = document.getElementsByClassName('tableBody')[0];

	var left = cellLeft-tBody.getBoundingClientRect().left ;
	var top = cellTop-tBody.getBoundingClientRect().top;

	var move;

	var speed = 1;

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
				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
						&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
						&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {




					var cell = tableCells[i];
					var nextBrother = cell.nextElementSibling; // следующая ячейка
					var prevBrother = cell.previousElementSibling; // предыдущая ячейка
					var parent = cell.parentNode; //родитель текущей ячейки
					var cellClassArr = cell.className.split(" "); //массив с классами текущей ячейки

					// очищаем ячейку от "грязи"
					cell.innerHTML = "";
					cell.setAttribute("clean","");
					tableCells[i].removeAttribute("garbage");
					numOfGarbageBlock.innerHTML = musors.length;
					aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";


					if (musors.length == 0) {
						clearInterval(move);
						throw new Error('STOP!');
						Finish();
					}

					stepsInput.value = --steps;
					if (steps == 0) {
						clearInterval(move);
						throw new Error('STOP!');
					}

					/*counterForAddGargabe += 0.5;
					if (counterForAddGargabe % 10 == 0) {
						try {
							for (var i = 0, l = 1; i < l; ++i) {
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
					}*/


					//определяем к какой области принадлежит текущая йчейка
					var arrOfAreas = ['setBeforeWall1', 'setAfterWall1', 'setWithoutWall', 'setAfterWall3']
					for (var j = 0; j < cellClassArr.length;j++) {
						var classNameSet;
						for (var jj = 0; jj < arrOfAreas.length; jj++) {
							if (cellClassArr[j] == arrOfAreas[jj]) {
								classNameSet = arrOfAreas[jj];
								break;
							}
						}
					}
					//класс конкретного ряда
					var cellClass = cellClassArr[cellClassArr.length-1];


					//берем отдельно каждую строчку в области перед первой стенкой
					var rowBefore1Wall1 = document.getElementsByClassName('1beforeWall1');
					var rowBefore2Wall1 = document.getElementsByClassName('2beforeWall1');
					var rowBefore3Wall1 = document.getElementsByClassName('3beforeWall1');
					var rowBefore4Wall1 = document.getElementsByClassName('4beforeWall1');
					var rowBefore5Wall1 = document.getElementsByClassName('5beforeWall1');
					//берем все элементы перед первой стенкой
					var setBeforeWall1 = document.getElementsByClassName('setBeforeWall1');
					//определяем есть ли в области перед первой стенкой мусор
					for (var q0 = 0; q0 < setBeforeWall1.length; q0++) {
						goToAnotherSet = false;
						if (setBeforeWall1[q0].children.length > 0) {
							goToAnotherSet = false;
							break;
						}
						else {
							goToAnotherSet = true;
						}
					} //goToAnotherSet


					//берем отдельно каждую строчку в области без стенок
					var row1WW = document.getElementsByClassName('without1Wall');
					var row2WW = document.getElementsByClassName('without2Wall');
					//берем все элементы в области без стенок
					var setWW = document.getElementsByClassName('setWithoutWall');
					//определяем есть ли в области без стенок мусор
					for (var w0 = 0; w0 < setWW.length; w0++) {
						goToAnotherSetWW = false;
						if (setWW[w0].children.length > 0) {
							goToAnotherSetWW = false;
							break;
						}
						else {
							goToAnotherSetWW = true;
						}
					} //goToAnotherSetWW

					//берем отдельно каждую строчку в области после третьей стенки
					var rowAfter1Wall3 = document.getElementsByClassName('1afterWall3');
					var rowAfter2Wall3 = document.getElementsByClassName('2afterWall3');
					var rowAfter3Wall3 = document.getElementsByClassName('3afterWall3');
					var rowAfter4Wall3 = document.getElementsByClassName('4afterWall3');
					//берем все элементы из области после третьей стенки
					var setAfterWall3 = document.getElementsByClassName('setAfterWall3');
					//определяем есть ли в области после третьей стенки мусор
					for (var e0 = 0; e0 < setAfterWall3.length; e0++) {
						goToAnotherSetAfterW3 = false;
						if (setAfterWall3[e0].children.length > 0) {
							goToAnotherSetAfterW3 = false;
							break;
						}
						else {
							goToAnotherSetAfterW3 = true;
						}
					} //goToAnotherSetAfterW3


					//берем отдельно каждую строчку в области после первой стенки
					var rowAfter1Wall1 = document.getElementsByClassName('1afterWall1');
					var rowAfter2Wall1 = document.getElementsByClassName('2afterWall1');
					var rowAfter3Wall1 = document.getElementsByClassName('3afterWall1');
					var rowAfter4Wall1 = document.getElementsByClassName('4afterWall1');
					//берем все элементы из области после первой стенки
					var setAfterWall1 = document.getElementsByClassName('setAfterWall1');
					for (var r0 = 0; r0 < setAfterWall1.length; r0++) {
						goToAnotherSetAfterW1 = false;
						if (setAfterWall1[r0].children.length > 0) {
							goToAnotherSetAfterW1 = false;
							break;
						}
						else {
							goToAnotherSetAfterW1 = true;
						}
					} //goToAnotherSetAfterW1



					//:::::::::: пылесос находиться в области перед первой стенкой? ::::::::::
					if (classNameSet == 'setBeforeWall1') {

						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSet;
						var goToRowBefore1Wall1;
						var goToRowBefore2Wall1;
						var goToRowBefore3Wall1;
						var goToRowBefore4Wall1;
						var goToRowBefore5Wall1;

						//определяем есть ли в области перед первой стенкой мусор
						for (var q0 = 0; q0 < setBeforeWall1.length; q0++) {
							goToAnotherSet = false;
							if (setBeforeWall1[q0].children.length > 0) {
								goToAnotherSet = false;
								break;
							}
							else {
								goToAnotherSet = true;
							}
						}
						//определяем есть ли в первой строке перед первой стенкой мусор
						for (var q1 = 0; q1 < rowBefore1Wall1.length; q1++) {
							goToRowBefore1Wall1 = false;
							if (rowBefore1Wall1[q1].children.length > 0) {
								goToRowBefore1Wall1 = true;
								break;
							}
							else {
								goToRowBefore1Wall1 = false
							}
						}
						//определяем есть ли во второй строке перед первой стенкой мусор
						for (var q2 = 0; q2 < rowBefore2Wall1.length; q2++) {
							goToRowBefore2Wall1 = false;
							if (rowBefore2Wall1[q2].children.length > 0) {
								goToRowBefore2Wall1 = true;
								break;
							}
							else {
								goToRowBefore2Wall1 = false
							}
						}
						//определяем есть ли в третьей строке перед первой стенкой мусор
						for (var q3 = 0; q3 < rowBefore3Wall1.length; q3++) {
							goToRowBefore3Wall1 = false;
							if (rowBefore3Wall1[q3].children.length > 0) {
								goToRowBefore3Wall1 = true;
								break;
							}
							else {
								goToRowBefore3Wall1 = false
							}
						}
						//определяем есть ли в четвертой строке перед первой стенкой мусор
						for (var q4 = 0; q4 < rowBefore4Wall1.length; q4++) {
							goToRowBefore4Wall1 = false;
							if (rowBefore4Wall1[q4].children.length > 0) {
								goToRowBefore4Wall1 = true;
								break;
							}
							else {
								goToRowBefore4Wall1 = false
							}
						}
						//определяем есть ли в пятой строке перед первой стенкой мусор
						for (var q5 = 0; q5 < rowBefore5Wall1.length; q5++) {
							goToRowBefore5Wall1 = false;
							if (rowBefore5Wall1[q5].children.length > 0) {
								goToRowBefore5Wall1 = true;
								break;
							}
							else {
								goToRowBefore5Wall1 = false
							}
						}

						//если в первой строчке есть мусор, идем на нее, дальше определяем на какой строчке находится пылесос
						if (goToRowBefore1Wall1) {
							if (cellClass == '1beforeWall1') {
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goToRowBefore2Wall1 && !goToRowBefore1Wall1){
							if (cellClass == '1beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							else if (cellClass == '2beforeWall1') {
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goToRowBefore3Wall1 && !goToRowBefore1Wall1 && !goToRowBefore2Wall1) {
							if (cellClass == '1beforeWall1' || cellClass == '2beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							else if (cellClass == '3beforeWall1') {
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goToRowBefore4Wall1 && !goToRowBefore1Wall1 && !goToRowBefore2Wall1 && !goToRowBefore3Wall1) {
							if (cellClass == '1beforeWall1' || cellClass == '2beforeWall1' || cellClass == '3beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							else if(cellClass == '4beforeWall1') {
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goToRowBefore5Wall1 && !goToRowBefore1Wall1 && !goToRowBefore2Wall1 && !goToRowBefore3Wall1 && !goToRowBefore4Wall1) {
							if (cellClass == '1beforeWall1' || cellClass == '2beforeWall1' || cellClass == '3beforeWall1' || cellClass == '4beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							else if(cellClass == '5beforeWall1') {
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}

						//если в области перед стенкой нету мусора, выходим из этой области
						if (goToAnotherSet) {
							clearInterval(move);
							moveDown();
						}
					}
					//:::::::::: пылесос находится в области без стенок ::::::::::
					if (classNameSet == 'setWithoutWall') {

						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetWW;
						var goTo1RowWW;
						var goTo2RowWW;

						//for (var qwe = 0; qwe < row1WW.length; )
						for (var ww1 = 0; ww1 < row1WW.length; ww1++) {
							goTo1RowWW = false;
							if (row1WW[ww1].children.length > 0) {
								goTo1RowWW = true;
								break;
							}
							else {
								goTo1RowWW = false
							}
						}
						for (var ww2 = 0; ww2 < row2WW.length; ww2++) {
							goTo2RowWW = false;
							if (row2WW[ww2].children.length > 0) {
								goTo2RowWW = true;
								break;
							}
							else {
								goTo2RowWW = false
							}
						}

						var GarbageArray1ForIndexes = [];
						var GarbageArray2ForIndexes = [];
						for (var www = 0; www < row1WW.length; www++) {
							if (row1WW[www].children.length > 0) {
								GarbageArray1ForIndexes.push(www);
							}
						}
						for (var www = 0; www < row2WW.length; www++) {
							if (row2WW[www].children.length > 0) {
								GarbageArray2ForIndexes.push(www);
							}
						}

						var minIrow1 = GarbageArray1ForIndexes.min();
						var minIrow2 = GarbageArray2ForIndexes.min();


						if (goTo1RowWW && !(goTo1RowWW && goTo2RowWW)) {
							if (cellClass == 'without1Wall') {
								clearInterval(move);
								moveRight();
							}
							if (cellClass == 'without2Wall') {
								clearInterval(move);
								moveUp();
							}
						}
						if (goTo2RowWW && !(goTo1RowWW && goTo2RowWW)) {
							if (cellClass == 'without2Wall') {
								clearInterval(move);
								moveRight();
							}
							if (cellClass == 'without1Wall') {
								clearInterval(move);
								moveDown();
							}
						}
						if (goTo1RowWW && goTo2RowWW) {
							if (cellClass == "without1Wall") {
								if (minIrow1 > minIrow2) {
									clearInterval(move);
									moveDown();
								}
							}
							if (cellClass == 'without2Wall') {
								if (minIrow2 > minIrow1) {
									clearInterval(move);
									moveUp();
								}
							}
							//alert(cellClass);
						}

						if (!goToAnotherSet && cell.classList.contains('goUp') ) {
								clearInterval(move);
								moveUp();
						}
						else if (!goToAnotherSetAfterW1 && cell.classList.contains('AngoUp')) {
								clearInterval(move);
								moveUp();
						}
						else if (!goToAnotherSetAfterW3 && cell.classList.contains('AngoUp')) {
							clearInterval(move);
							moveUp();
						}


						if(goToAnotherSetWW) {
							if(goToAnotherSetAfterW1 && goToAnotherSetAfterW3) {
								clearInterval(move);
								moveLeft();
							}
							if(goToAnotherSet) {
								clearInterval(move);
								moveRight();
								if (cell.classList.contains('AngoUp')) {
									clearInterval(move);
									moveUp();
								}
							}
						}

					}
					//:::::::::: пылесос находится в области пссле третьей стенки ::::::::::
					if(classNameSet == 'setAfterWall3') {
						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetAfterW3;
						var goTo1RowAfterW3;
						var goTo2RowAfterW3;
						var goTo3RowAfterW3;
						var goTo4RowAfterW3;

						if (!goToAnotherSetAfterW1) {
							clearInterval(move);
							moveUp();
						}
						else {
							clearInterval(move);
							moveDown();
						}
					}
					//:::::::::: пылесос находится в области пссле первой стенки ::::::::::
					if(classNameSet == 'setAfterWall1') {
						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetAfterW1;
						var goTo1RowAfterW1;
						var goTo2RowAfterW1;
						var goTo3RowAfterW1;
						var goTo4RowAfterW1;

						//for (var qwe = 0; qwe < row1WW.length; )
						for (var ww1 = 0; ww1 < rowAfter1Wall1.length; ww1++) {
							goTo1RowAfterW1 = false;
							if (rowAfter1Wall1[ww1].children.length > 0) {
								goTo1RowAfterW1 = true;
								break;
							}
							else {
								goTo1RowAfterW1 = false
							}
						}
						for (var ww1 = 0; ww1 < rowAfter2Wall1.length; ww1++) {
							goTo2RowAfterW1 = false;
							if (rowAfter2Wall1[ww1].children.length > 0) {
								goTo2RowAfterW1 = true;
								break;
							}
							else {
								goTo2RowAfterW1 = false
							}
						}
						for (var ww1 = 0; ww1 < rowAfter3Wall1.length; ww1++) {
							goTo3RowAfterW1 = false;
							if (rowAfter3Wall1[ww1].children.length > 0) {
								goTo3RowAfterW1 = true;
								break;
							}
							else {
								goTo3RowAfterW1 = false
							}
						}
						for (var ww1 = 0; ww1 < rowAfter4Wall1.length; ww1++) {
							goTo4RowAfterW1 = false;
							if (rowAfter4Wall1[ww1].children.length > 0) {
								goTo4RowAfterW1 = true;
								break;
							}
							else {
								goTo4RowAfterW1 = false
							}
						}


						if (!goToAnotherSetAfterW1) {
							if (cell.classList.contains('betweenW1W3')) {
								clearInterval(move);
								moveLeft();
							}
						}


						if (goTo1RowAfterW1) {
							if (cellClass == '1afterWall1') {
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
							else {
								if (cellClass == '1afterWall1'
										&& ((cell.classList.contains('preLast1AfterWall1'))
										|| (cell.classList.contains('betweenW1W3')))) {
									clearInterval(move);
									moveLeft();
								}
								else {
									if (!((cell.classList.contains('preLast1AfterWall1'))
											|| (cell.classList.contains('betweenW1W3')))) {
										clearInterval(move);
										moveUp();
									}
								}
							}
						}
						if (goTo2RowAfterW1 && !goTo1RowAfterW1){
							if (cellClass == '1afterWall1'
									&& !(cell.classList.contains('preLast1AfterWall1'))
									&& !(cell.classList.contains('betweenW1W3'))) {
								clearInterval(move);
								//moveDown();
							}
							else if (cellClass == '2afterWall1') {
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
							else if (cellClass == '1afterWall1'
									&& ((cell.classList.contains('preLast1AfterWall1'))
									|| (cell.classList.contains('betweenW1W3')))) {
								clearInterval(move);
								moveLeft();
							}
							else {
								if (cellClass == '1afterWall1'
										&& ((cell.classList.contains('preLast1AfterWall1'))
										|| (cell.classList.contains('betweenW1W3')))) {
									clearInterval(move);
									moveLeft();
								}
								else {
									if (!((cell.classList.contains('preLast1AfterWall1'))
											|| (cell.classList.contains('betweenW1W3')))) {
										clearInterval(move);
										moveUp();
									}
								}
							}
						}
						if (goTo3RowAfterW1 && !goTo1RowAfterW1 && !goTo2RowAfterW1){
							if ((cellClass == '1afterWall1' || cellClass == '2afterWall1')) {
								clearInterval(move);
								moveDown();
							}
							else if (cellClass == '3afterWall1') {
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
							else if (cellClass == '1afterWall1'
									&& ((cell.classList.contains('preLast1AfterWall1'))
									|| (cell.classList.contains('betweenW1W3')))) {
								clearInterval(move);
								moveLeft();
							}
							else {
								if (cellClass == '1afterWall1'
										&& ((cell.classList.contains('preLast1AfterWall1'))
										|| (cell.classList.contains('betweenW1W3')))) {
									clearInterval(move);
									moveLeft();
								}
								else {
									clearInterval(move);
									moveUp();
								}
							}
						}
						if (goTo4RowAfterW1 && !goTo1RowAfterW1 && !goTo2RowAfterW1 && !goTo3RowAfterW1){
							if ((cellClass == '1afterWall1' || cellClass == '2afterWall1' || cellClass == '3afterWall1')
									&& !(cell.classList.contains('preLast1AfterWall1'))
									&& !(cell.classList.contains('betweenW1W3'))) {
								clearInterval(move);
								moveDown();
							}
							else if (cellClass == '4afterWall1') {
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
							else if (cellClass == '1afterWall1'
									&& ((cell.classList.contains('preLast1AfterWall1'))
									|| (cell.classList.contains('betweenW1W3')))) {
								clearInterval(move);
								moveLeft();
							}
							else {
								if (cellClass == '1afterWall1'
										&& ((cell.classList.contains('preLast1AfterWall1'))
										|| (cell.classList.contains('betweenW1W3')))) {
									clearInterval(move);
									moveLeft();
								}
								else {
									clearInterval(move);
									moveUp();
								}
							}
						}


						if (goToAnotherSetAfterW1) {
							if (cellClass == '1afterWall1') {
								clearInterval(move);
								moveRight();
							}
							if (cell.classList.contains('betweenW1W3')) {
								clearInterval(move);
								moveDown();
							}
							if (cellClass == '2afterWall1' || cellClass == '3afterWall1' || cellClass == '4afterWall1') {
								clearInterval(move);
								moveUp();
							}
						}
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
				//if (((cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left)
				//		|| (cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1)
				//		|| (cleaner.getBoundingClientRect().left+1 == tableCells[i].getBoundingClientRect().left))
				//		&& ((cleaner.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top)
				//		|| (cleaner.getBoundingClientRect().top+1 == tableCells[i].getBoundingClientRect().top)
				//		|| (cleaner.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top+1))) {

					if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
							&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
							&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {

						var cell = tableCells[i];
						var nextBrother = cell.nextElementSibling; // следующая ячейка
						var prevBrother = cell.previousElementSibling; // предыдущая ячейка
						var parent = cell.parentNode; //родитель текущей ячейки
						var cellClassArr = cell.className.split(" "); //массив с классами текущей ячейки

						// очищаем ячейку от "грязи"
						cell.innerHTML = "";
						cell.setAttribute("clean","");
						tableCells[i].removeAttribute("garbage");
						numOfGarbageBlock.innerHTML = musors.length;
						aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";

						if (musors.length == 0) {
							clearInterval(move);
							throw new Error('STOP!');
							Finish();
						}

						stepsInput.value = --steps;
						if (steps == 0) {
							clearInterval(move);
							throw new Error('STOP!');
						}


						/*counterForAddGargabe += 0.5;
						if (counterForAddGargabe % 10 == 0) {
							try {
								for (var i = 0, l = 1; i < l; ++i) {
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
						}*/

						//определяем к какой области принадлежит текущая йчейка
						var arrOfAreas = ['setBeforeWall1', 'setAfterWall1', 'setWithoutWall', 'setAfterWall3']
						for (var j = 0; j < cellClassArr.length;j++) {
							var classNameSet;
							for (var jj = 0; jj < arrOfAreas.length; jj++) {
								if (cellClassArr[j] == arrOfAreas[jj]) {
									classNameSet = arrOfAreas[jj];
									break;
								}
							}
						}
						//класс конкретного ряда
						var cellClass = cellClassArr[cellClassArr.length-1];


						//берем отдельно каждую строчку в области перед первой стенкой
						var rowBefore1Wall1 = document.getElementsByClassName('1beforeWall1');
						var rowBefore2Wall1 = document.getElementsByClassName('2beforeWall1');
						var rowBefore3Wall1 = document.getElementsByClassName('3beforeWall1');
						var rowBefore4Wall1 = document.getElementsByClassName('4beforeWall1');
						var rowBefore5Wall1 = document.getElementsByClassName('5beforeWall1');
						//берем все элементы перед первой стенкой
						var setBeforeWall1 = document.getElementsByClassName('setBeforeWall1');
						//определяем есть ли в области перед первой стенкой мусор
						for (var q0 = 0; q0 < setBeforeWall1.length; q0++) {
						goToAnotherSet = false;
						if (setBeforeWall1[q0].children.length > 0) {
							goToAnotherSet = false;
							break;
						}
						else {
							goToAnotherSet = true;
						}
					} //goToAnotherSet


						//берем отдельно каждую строчку в области без стенок
						var row1WW = document.getElementsByClassName('without1Wall');
						var row2WW = document.getElementsByClassName('without2Wall');
						//берем все элементы в области без стенок
						var setWW = document.getElementsByClassName('setWithoutWall');
						//определяем есть ли в области без стенок мусор
						for (var w0 = 0; w0 < setWW.length; w0++) {
						goToAnotherSetWW = false;
						if (setWW[w0].children.length > 0) {
							goToAnotherSetWW = false;
							break;
						}
						else {
							goToAnotherSetWW = true;
						}
					} //goToAnotherSetWW


						//берем отдельно каждую строчку в области после третьей стенки
						var rowAfter1Wall3 = document.getElementsByClassName('1afterWall3');
						var rowAfter2Wall3 = document.getElementsByClassName('2afterWall3');
						var rowAfter3Wall3 = document.getElementsByClassName('3afterWall3');
						var rowAfter4Wall3 = document.getElementsByClassName('4afterWall3');
						//берем все элементы из области после третьей стенки
						var setAfterWall3 = document.getElementsByClassName('setAfterWall3');
						//определяем есть ли в области после третьей стенки мусор
						for (var e0 = 0; e0 < setAfterWall3.length; e0++) {
						goToAnotherSetAfterW3 = false;
						if (setAfterWall3[e0].children.length > 0) {
							goToAnotherSetAfterW3 = false;
							break;
						}
						else {
							goToAnotherSetAfterW3 = true;
						}
					} //goToAnotherSetAfterW3


						//берем отдельно каждую строчку в области после первой стенки
						var rowAfter1Wall1 = document.getElementsByClassName('1afterWall1');
						var rowAfter2Wall1 = document.getElementsByClassName('2afterWall1');
						var rowAfter3Wall1 = document.getElementsByClassName('3afterWall1');
						var rowAfter4Wall1 = document.getElementsByClassName('4afterWall1');
						//берем все элементы из области после первой стенки
						var setAfterWall1 = document.getElementsByClassName('setAfterWall1');
						for (var r0 = 0; r0 < setAfterWall1.length; r0++) {
						goToAnotherSetAfterW1 = false;
						if (setAfterWall1[r0].children.length > 0) {
							goToAnotherSetAfterW1 = false;
							break;
						}
						else {
							goToAnotherSetAfterW1 = true;
						}
					} //goToAnotherSetAfterW1


					//:::::::::: пылесос находиться в области перед первой стенкой? ::::::::::
					if (classNameSet == 'setBeforeWall1') {


						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSet;
						var goToRowBefore1Wall1;
						var goToRowBefore2Wall1;
						var goToRowBefore3Wall1;
						var goToRowBefore4Wall1;
						var goToRowBefore5Wall1;

						//определяем есть ли в области перед первой стенкой мусор
						for (var q0 = 0; q0 < setBeforeWall1.length; q0++) {
							goToAnotherSet = false;
							if (setBeforeWall1[q0].children.length > 0) {
								goToAnotherSet = false;
								break;
							}
							else {
								goToAnotherSet = true;
							}
						}
						//определяем есть ли в первой строке перед первой стенкой мусор
						for (var q1 = 0; q1 < rowBefore1Wall1.length; q1++) {
							goToRowBefore1Wall1 = false;
							if (rowBefore1Wall1[q1].children.length > 0) {
								goToRowBefore1Wall1 = true;
								break;
							}
							else {
								goToRowBefore1Wall1 = false
							}
						}
						//определяем есть ли во второй строке перед первой стенкой мусор
						for (var q2 = 0; q2 < rowBefore2Wall1.length; q2++) {
							goToRowBefore2Wall1 = false;
							if (rowBefore2Wall1[q2].children.length > 0) {
								goToRowBefore2Wall1 = true;
								break;
							}
							else {
								goToRowBefore2Wall1 = false
							}
						}
						//определяем есть ли в третьей строке перед первой стенкой мусор
						for (var q3 = 0; q3 < rowBefore3Wall1.length; q3++) {
							goToRowBefore3Wall1 = false;
							if (rowBefore3Wall1[q3].children.length > 0) {
								goToRowBefore3Wall1 = true;
								break;
							}
							else {
								goToRowBefore3Wall1 = false
							}
						}
						//определяем есть ли в четвертой строке перед первой стенкой мусор
						for (var q4 = 0; q4 < rowBefore4Wall1.length; q4++) {
							goToRowBefore4Wall1 = false;
							if (rowBefore4Wall1[q4].children.length > 0) {
								goToRowBefore4Wall1 = true;
								break;
							}
							else {
								goToRowBefore4Wall1 = false
							}
						}
						//определяем есть ли в пятой строке перед первой стенкой мусор
						for (var q5 = 0; q5 < rowBefore5Wall1.length; q5++) {
							goToRowBefore5Wall1 = false;
							if (rowBefore5Wall1[q5].children.length > 0) {
								goToRowBefore5Wall1 = true;
								break;
							}
							else {
								goToRowBefore5Wall1 = false
							}
						}

						//если в первой строчке есть мусор, идем на нее, дальше определяем на какой строчке находится пылесос
						if (goToRowBefore1Wall1) {
							if (cellClass == '1beforeWall1') {
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goToRowBefore2Wall1){
							if (cellClass == '1beforeWall1' && !goToRowBefore1Wall1) {
								clearInterval(move);
								moveDown();
							}
						}
						if (goToRowBefore3Wall1 && !goToRowBefore1Wall1 && !goToRowBefore2Wall1) {
							if (cellClass == '1beforeWall1' || cellClass == '2beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							else if (cellClass == '3beforeWall1') {
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goToRowBefore4Wall1 && !goToRowBefore1Wall1 && !goToRowBefore2Wall1 && !goToRowBefore3Wall1) {
							if (cellClass == '1beforeWall1' || cellClass == '2beforeWall1' || cellClass == '3beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							else if(cellClass == '4beforeWall1') {
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goToRowBefore5Wall1 && !goToRowBefore1Wall1 && !goToRowBefore2Wall1 && !goToRowBefore3Wall1 && !goToRowBefore4Wall1) {
							if (cellClass == '1beforeWall1' || cellClass == '2beforeWall1' || cellClass == '3beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							else if(cellClass == '5beforeWall1') {
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}

						//если в области перед стенкой нету мусора, выходим из этой области
						if (goToAnotherSet) {
							clearInterval(move);
							moveDown();
						}
					}
					//:::::::::: пылесос находится в области без стенок ::::::::::
					if (classNameSet == 'setWithoutWall') {

						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetWW;
						var goTo1RowWW;
						var goTo2RowWW;

						//for (var qwe = 0; qwe < row1WW.length; )
						for (var ww1 = 0; ww1 < row1WW.length; ww1++) {
							goTo1RowWW = false;
							if (row1WW[ww1].children.length > 0) {
								goTo1RowWW = true;
								break;
							}
							else {
								goTo1RowWW = false
							}
						}
						for (var ww2 = 0; ww2 < row2WW.length; ww2++) {
							goTo2RowWW = false;
							if (row2WW[ww2].children.length > 0) {
								goTo2RowWW = true;
								break;
							}
							else {
								goTo2RowWW = false
							}
						}

						var GarbageArray1ForIndexes = [];
						var GarbageArray2ForIndexes = [];
						for (var www = 0; www < row1WW.length; www++) {
							if (row1WW[www].children.length > 0) {
								GarbageArray1ForIndexes.push(www);
							}
						}
						for (var www = 0; www < row2WW.length; www++) {
							if (row2WW[www].children.length > 0) {
								GarbageArray2ForIndexes.push(www);
							}
						}

						var maxIrow1 = GarbageArray1ForIndexes.max();
						var maxIrow2 = GarbageArray2ForIndexes.max();

						if (tableBody.getBoundingClientRect().left == cell.getBoundingClientRect().left) {
							clearInterval(move);
							moveUp();
						}

						if (goTo1RowWW && !(goTo1RowWW && goTo2RowWW)) {
							if (cellClass == 'without1Wall') {
								clearInterval(move);
								moveLeft();
							}
							if (cellClass == 'without2Wall') {
								clearInterval(move);
								moveUp();
							}
						}
						if (goTo2RowWW && !(goTo1RowWW && goTo2RowWW)) {
							if (cellClass == 'without2Wall') {
								clearInterval(move);
								moveLeft();
							}
							if (cellClass == 'without1Wall') {
								clearInterval(move);
								moveDown();
							}
						}
						if (goTo1RowWW && goTo2RowWW) {
							if (cellClass == "without1Wall") {
								if (maxIrow1 < maxIrow2) {
									clearInterval(move);
									moveDown();
								}
							}
							if (cellClass == 'without2Wall') {
								if (maxIrow2 < maxIrow1) {
									clearInterval(move);
									moveUp();
								}
							}
							//alert(cellClass);
						}


						if(goToAnotherSetWW) {
							if(goToAnotherSetAfterW1 || goToAnotherSetAfterW3) {
								if (cell.classList.contains('goUp')) {
									clearInterval(move);
									moveUp();
								}
							}
							if(goToAnotherSet) {
								clearInterval(move);
								moveRight();
							}
						}

					}
					//:::::::::: пылесос находится в области пссле третьей стенки ::::::::::
					if(classNameSet == 'setAfterWall3') {
						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetAfterW3;
						var goTo1RowAfterW3;
						var goTo2RowAfterW3;
						var goTo3RowAfterW3;
						var goTo4RowAfterW3;
					}
					//:::::::::: пылесос находится в области пссле первой стенки ::::::::::
					if(classNameSet == 'setAfterWall1') {
						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetAfterW1;
						var goTo1RowAfterW1;
						var goTo2RowAfterW1;
						var goTo3RowAfterW1;
						var goTo4RowAfterW1;

						//for (var qwe = 0; qwe < row1WW.length; )
						for (var ww1 = 0; ww1 < rowAfter1Wall1.length; ww1++) {
							goTo1RowAfterW1 = false;
							if (rowAfter1Wall1[ww1].children.length > 0) {
								goTo1RowAfterW1 = true;
								break;
							}
							else {
								goTo1RowAfterW1 = false
							}
						}
						for (var ww1 = 0; ww1 < rowAfter2Wall1.length; ww1++) {
							goTo2RowAfterW1 = false;
							if (rowAfter2Wall1[ww1].children.length > 0) {
								goTo2RowAfterW1 = true;
								break;
							}
							else {
								goTo2RowAfterW1 = false
							}
						}
						for (var ww1 = 0; ww1 < rowAfter3Wall1.length; ww1++) {
							goTo3RowAfterW1 = false;
							if (rowAfter3Wall1[ww1].children.length > 0) {
								goTo3RowAfterW1 = true;
								break;
							}
							else {
								goTo3RowAfterW1 = false
							}
						}
						for (var ww1 = 0; ww1 < rowAfter4Wall1.length; ww1++) {
							goTo4RowAfterW1 = false;
							if (rowAfter4Wall1[ww1].children.length > 0) {
								goTo4RowAfterW1 = true;
								break;
							}
							else {
								goTo4RowAfterW1 = false
							}
						}
						/*//--------------------------
						var GarbageArray1ForIndexes = [];
						var GarbageArray2ForIndexes = [];
						var GarbageArray3ForIndexes = [];
						var GarbageArray4ForIndexes = [];
						for (var www = 0; www < rowAfter1Wall1.length; www++) {
							if (rowAfter1Wall1[www].children.length > 0) {
								GarbageArray1ForIndexes.push(www);
							}
						}
						for (var www = 0; www < rowAfter2Wall1.length; www++) {
							if (rowAfter2Wall1[www].children.length > 0) {
								GarbageArray2ForIndexes.push(www);
							}
						}
						for (var www = 0; www < rowAfter3Wall1.length; www++) {
							if (rowAfter3Wall1[www].children.length > 0) {
								GarbageArray3ForIndexes.push(www);
							}
						}
						for (var www = 0; www < rowAfter4Wall1.length; www++) {
							if (rowAfter4Wall1[www].children.length > 0) {
								GarbageArray4ForIndexes.push(www);
							}
						}


						var maxIrow1 = GarbageArray1ForIndexes.max();
						var maxIrow2 = GarbageArray2ForIndexes.max();
						var maxIrow3 = GarbageArray3ForIndexes.max();
						var maxIrow4 = GarbageArray4ForIndexes.max();

						if (cell.classList.contains('betweenW1W3') && !goToAnotherSetAfterW1) {
							clearInterval(move);
							moveLeft();
						}

						if (goTo1RowAfterW1 && goTo2RowAfterW1 && goTo3RowAfterW1 && goTo4RowAfterW1) {
							if (cellClass == '1afterWall1') {
								if ((maxIrow1 > maxIrow2) && (maxIrow1 > maxIrow3) && (maxIrow1 > maxIrow4)) {
									clearInterval(move);
									moveLeft();
								}
								if (!((maxIrow1 > maxIrow2) && (maxIrow1 > maxIrow3) && (maxIrow1 > maxIrow4)) && (cell.classList.contains('preLast1AfterWall1'))) {
									clearInterval(move);
									moveLeft();
								}
								if (!((maxIrow1 > maxIrow2) && (maxIrow1 > maxIrow3) && (maxIrow1 > maxIrow4))
										&& !(cell.classList.contains('preLast1AfterWall1'))
										&& !(cell.classList.contains('betweenW1W3'))) {
									clearInterval(move);
									moveDown();
								}

							}
						}
						//--------------------
						*/
						//if (prevBrother.classList.contains('wallCell1')) {
						//	clearInterval(move);
						//	moveRight();
						//}
						if (goTo1RowAfterW1) {
							if (cellClass == '1afterWall1') {
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
							else if (cellClass == '1afterWall1'
									&& ((cell.classList.contains('preLast1AfterWall1'))
									|| (cell.classList.contains('betweenW1W3')))) {
								clearInterval(move);
								moveLeft();
							}
							else {
								if (cellClass == '1afterWall1'
										&& ((cell.classList.contains('preLast1AfterWall1'))
										|| (cell.classList.contains('betweenW1W3')))) {
									clearInterval(move);
									moveLeft();
								}
								else {
									if (!((cell.classList.contains('preLast1AfterWall1'))
											|| (cell.classList.contains('betweenW1W3')))) {
										clearInterval(move);
										moveUp();
									}
								}
							}
						}
						if (goTo2RowAfterW1 && !goTo1RowAfterW1){
							if (cellClass == '1afterWall1'
									&& !(cell.classList.contains('preLast1AfterWall1'))
									&& !(cell.classList.contains('betweenW1W3'))) {
								clearInterval(move);
								moveDown();
							}
							else if (cellClass == '2afterWall1') {
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
							else if (cellClass == '1afterWall1'
									&& ((cell.classList.contains('preLast1AfterWall1'))
									|| (cell.classList.contains('betweenW1W3')))) {
								clearInterval(move);
								moveLeft();
							}
							else {
								if (cellClass == '1afterWall1'
										&& ((cell.classList.contains('preLast1AfterWall1'))
										|| (cell.classList.contains('betweenW1W3')))) {
									clearInterval(move);
									moveLeft();
								}
								else {
									if (!((cell.classList.contains('preLast1AfterWall1'))
											|| (cell.classList.contains('betweenW1W3')))) {
										clearInterval(move);
										moveUp();
									}
								}
							}
						}
						if (goTo3RowAfterW1 && !goTo1RowAfterW1 && !goTo2RowAfterW1){
							if ((cellClass == '1afterWall1' || cellClass == '2afterWall1')
									&& !(cell.classList.contains('preLast1AfterWall1'))
									&& !(cell.classList.contains('betweenW1W3'))) {
								clearInterval(move);
								moveDown();
							}
							else if (cellClass == '3afterWall1') {
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
							else if (cellClass == '1afterWall1'
									&& ((cell.classList.contains('preLast1AfterWall1'))
									|| (cell.classList.contains('betweenW1W3')))) {
								clearInterval(move);
								moveLeft();
							}
							else {
								if (cellClass == '1afterWall1'
										&& ((cell.classList.contains('preLast1AfterWall1'))
										|| (cell.classList.contains('betweenW1W3')))) {
									clearInterval(move);
									moveLeft();
								}
								else {
									if (!((cell.classList.contains('preLast1AfterWall1'))
											|| (cell.classList.contains('betweenW1W3')))) {
										clearInterval(move);
										moveUp();
									}
								}
							}
						}
						if (goTo4RowAfterW1 && !goTo1RowAfterW1 && !goTo2RowAfterW1 && !goTo3RowAfterW1){
							if ((cellClass == '1afterWall1' || cellClass == '2afterWall1' || cellClass == '3afterWall1')
									&& !(cell.classList.contains('preLast1AfterWall1'))
									&& !(cell.classList.contains('betweenW1W3'))) {
								clearInterval(move);
								moveDown();
							}
							else if (cellClass == '4afterWall1') {
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
							else if (cellClass == '1afterWall1'
									&& ((cell.classList.contains('preLast1AfterWall1'))
									|| (cell.classList.contains('betweenW1W3')))) {
								clearInterval(move);
								moveLeft();
							}
							else {
								if (cellClass == '1afterWall1'
										&& ((cell.classList.contains('preLast1AfterWall1'))
										|| (cell.classList.contains('betweenW1W3')))) {
									clearInterval(move);
									moveLeft();
								}
								else {
									if (!((cell.classList.contains('preLast1AfterWall1'))
											|| (cell.classList.contains('betweenW1W3')))) {
										clearInterval(move);
										moveUp();
									}
								}
							}
						}



						if (goToAnotherSetAfterW1) {
							if (cellClass == '1afterWall1') {
								clearInterval(move);
								moveRight();
							}
							if (cell.classList.contains('betweenW1W3')) {
								clearInterval(move);
								moveDown();
							}
							if (cellClass == '2afterWall1' || cellClass == '3afterWall1' || cellClass == '4afterWall1') {
								clearInterval(move);
								moveUp();
							}
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
				//		|| (cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1)
				//		|| (cleaner.getBoundingClientRect().left+1 == tableCells[i].getBoundingClientRect().left))
				//		&& ((cleaner.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top)
				//		|| (cleaner.getBoundingClientRect().top+1 == tableCells[i].getBoundingClientRect().top)
				//		|| (cleaner.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top+1))) {

				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
						&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
						&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {

					var cell = tableCells[i];
					var nextBrother = cell.nextElementSibling; // следующая ячейка
					var prevBrother = cell.previousElementSibling; // предыдущая ячейка
					var parent = cell.parentNode; //родитель текущей ячейки
					var cellClassArr = cell.className.split(" "); //массив с классами текущей ячейки

					// очищаем ячейку от "грязи"
					cell.innerHTML = "";
					cell.setAttribute("clean","");
					tableCells[i].removeAttribute("garbage");
					numOfGarbageBlock.innerHTML = musors.length;
					aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";

					if (musors.length == 0) {
						clearInterval(move);
						throw new Error('STOP!');
						Finish();
					}

					stepsInput.value = --steps;
					if (steps == 0) {
						clearInterval(move);
						throw new Error('STOP!');
					}

					/*counterForAddGargabe += 0.5;
					if (counterForAddGargabe % 10 == 0) {
						try {
							for (var i = 0, l = 1; i < l; ++i) {
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
					}*/

					//определяем к какой области принадлежит текущая йчейка
					var arrOfAreas = ['setBeforeWall1', 'setAfterWall1', 'setWithoutWall', 'setAfterWall3']
					for (var j = 0; j < cellClassArr.length;j++) {
						var classNameSet;
						for (var jj = 0; jj < arrOfAreas.length; jj++) {
							if (cellClassArr[j] == arrOfAreas[jj]) {
								classNameSet = arrOfAreas[jj];
								break;
							}
						}
					}
					//класс конкретного ряда
					var cellClass = cellClassArr[cellClassArr.length-1];



					//берем отдельно каждую строчку в области перед первой стенкой
					var rowBefore1Wall1 = document.getElementsByClassName('1beforeWall1');
					var rowBefore2Wall1 = document.getElementsByClassName('2beforeWall1');
					var rowBefore3Wall1 = document.getElementsByClassName('3beforeWall1');
					var rowBefore4Wall1 = document.getElementsByClassName('4beforeWall1');
					var rowBefore5Wall1 = document.getElementsByClassName('5beforeWall1');
					//берем все элементы перед первой стенкой
					var setBeforeWall1 = document.getElementsByClassName('setBeforeWall1');
					//определяем есть ли в области перед первой стенкой мусор
					for (var q0 = 0; q0 < setBeforeWall1.length; q0++) {
						goToAnotherSet = false;
						if (setBeforeWall1[q0].children.length > 0) {
							goToAnotherSet = false;
							break;
						}
						else {
							goToAnotherSet = true;
						}
					} //goToAnotherSet


					//берем отдельно каждую строчку в области без стенок
					var row1WW = document.getElementsByClassName('without1Wall');
					var row2WW = document.getElementsByClassName('without2Wall');
					//берем все элементы в области без стенок
					var setWW = document.getElementsByClassName('setWithoutWall');
					//определяем есть ли в области без стенок мусор
					for (var w0 = 0; w0 < setWW.length; w0++) {
						goToAnotherSetWW = false;
						if (setWW[w0].children.length > 0) {
							goToAnotherSetWW = false;
							break;
						}
						else {
							goToAnotherSetWW = true;
						}
					} //goToAnotherSetWW


					//берем отдельно каждую строчку в области после третьей стенки
					var rowAfter1Wall3 = document.getElementsByClassName('1afterWall3');
					var rowAfter2Wall3 = document.getElementsByClassName('2afterWall3');
					var rowAfter3Wall3 = document.getElementsByClassName('3afterWall3');
					var rowAfter4Wall3 = document.getElementsByClassName('4afterWall3');
					//берем все элементы из области после третьей стенки
					var setAfterWall3 = document.getElementsByClassName('setAfterWall3');
					//определяем есть ли в области после третьей стенки мусор
					for (var e0 = 0; e0 < setAfterWall3.length; e0++) {
						goToAnotherSetAfterW3 = false;
						if (setAfterWall3[e0].children.length > 0) {
							goToAnotherSetAfterW3 = false;
							break;
						}
						else {
							goToAnotherSetAfterW3 = true;
						}
					} //goToAnotherSetAfterW3


					//берем отдельно каждую строчку в области после первой стенки
					var rowAfter1Wall1 = document.getElementsByClassName('1afterWall1');
					var rowAfter2Wall1 = document.getElementsByClassName('2afterWall1');
					var rowAfter3Wall1 = document.getElementsByClassName('3afterWall1');
					var rowAfter4Wall1 = document.getElementsByClassName('4afterWall1');
					//берем все элементы из области после первой стенки
					var setAfterWall1 = document.getElementsByClassName('setAfterWall1');
					for (var r0 = 0; r0 < setAfterWall1.length; r0++) {
						goToAnotherSetAfterW1 = false;
						if (setAfterWall1[r0].children.length > 0) {
							goToAnotherSetAfterW1 = false;
							break;
						}
						else {
							goToAnotherSetAfterW1 = true;
						}
					} //goToAnotherSetAfterW1

					//:::::::::: пылесос находиться в области перед первой стенкой? ::::::::::
					if (classNameSet == 'setBeforeWall1') {


						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSet;
						var goToRowBefore1Wall1;
						var goToRowBefore2Wall1;
						var goToRowBefore3Wall1;
						var goToRowBefore4Wall1;
						var goToRowBefore5Wall1;

						//определяем есть ли в области перед первой стенкой мусор
						for (var q0 = 0; q0 < setBeforeWall1.length; q0++) {
							goToAnotherSet = false;
							if (setBeforeWall1[q0].children.length > 0) {
								goToAnotherSet = false;
								break;
							}
							else {
								goToAnotherSet = true;
							}
						}
						//определяем есть ли в первой строке перед первой стенкой мусор
						for (var q1 = 0; q1 < rowBefore1Wall1.length; q1++) {
							goToRowBefore1Wall1 = false;
							if (rowBefore1Wall1[q1].children.length > 0) {
								goToRowBefore1Wall1 = true;
								break;
							}
							else {
								goToRowBefore1Wall1 = false
							}
						}
						//определяем есть ли во второй строке перед первой стенкой мусор
						for (var q2 = 0; q2 < rowBefore2Wall1.length; q2++) {
							goToRowBefore2Wall1 = false;
							if (rowBefore2Wall1[q2].children.length > 0) {
								goToRowBefore2Wall1 = true;
								break;
							}
							else {
								goToRowBefore2Wall1 = false
							}
						}
						//определяем есть ли в третьей строке перед первой стенкой мусор
						for (var q3 = 0; q3 < rowBefore3Wall1.length; q3++) {
							goToRowBefore3Wall1 = false;
							if (rowBefore3Wall1[q3].children.length > 0) {
								goToRowBefore3Wall1 = true;
								break;
							}
							else {
								goToRowBefore3Wall1 = false
							}
						}
						//определяем есть ли в четвертой строке перед первой стенкой мусор
						for (var q4 = 0; q4 < rowBefore4Wall1.length; q4++) {
							goToRowBefore4Wall1 = false;
							if (rowBefore4Wall1[q4].children.length > 0) {
								goToRowBefore4Wall1 = true;
								break;
							}
							else {
								goToRowBefore4Wall1 = false
							}
						}
						//определяем есть ли в пятой строке перед первой стенкой мусор
						for (var q5 = 0; q5 < rowBefore5Wall1.length; q5++) {
							goToRowBefore5Wall1 = false;
							if (rowBefore5Wall1[q5].children.length > 0) {
								goToRowBefore5Wall1 = true;
								break;
							}
							else {
								goToRowBefore5Wall1 = false
							}
						}

						//если в первой строчке есть мусор, идем на нее, дальше определяем на какой строчке находится пылесос
						if (goToRowBefore1Wall1) {
							if (cellClass == '1beforeWall1') {
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goToRowBefore2Wall1){
							if (cellClass == '2beforeWall1') {
								clearInterval(move);
								moveRight();
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
						}
						if (goToRowBefore3Wall1){
							if (cellClass == '3beforeWall1') {
								clearInterval(move);
								moveRight();
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
						}
						if (goToRowBefore4Wall1) {
							if (cellClass == '4beforeWall1') {
								clearInterval(move);
								moveRight();
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
						}
						if (goToRowBefore5Wall1) {
							if (cellClass == '5beforeWall1') {
								clearInterval(move);
								moveRight();
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
						}

						//если в области перед стенкой нету мусора, выходим из этой области
						if (goToAnotherSet) {
							clearInterval(move);
							moveDown();
						}
					}
					//:::::::::: пылесос находится в области без стенок ::::::::::
					if (classNameSet == 'setWithoutWall') {

						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetWW;
						var goTo1RowWW;
						var goTo2RowWW;

						for (var ww1 = 0; ww1 < row1WW.length; ww1++) {
							goTo1RowWW = false;
							if (row1WW[ww1].children.length > 0) {
								goTo1RowWW = true;
								break;
							}
							else {
								goTo1RowWW = false
							}
						}
						for (var ww2 = 0; ww2 < row2WW.length; ww2++) {
							goTo2RowWW = false;
							if (row2WW[ww2].children.length > 0) {
								goTo2RowWW = true;
								break;
							}
							else {
								goTo2RowWW = false
							}
						}

						var GarbageArray1ForIndexes = [];
						var GarbageArray2ForIndexes = [];
						for (var www = 0; www < row1WW.length; www++) {
							if (row1WW[www].children.length > 0) {
								GarbageArray1ForIndexes.push(www);
							}
						}
						for (var www = 0; www < row2WW.length; www++) {
							if (row2WW[www].children.length > 0) {
								GarbageArray2ForIndexes.push(www);
							}
						}

						var minIrow1 = GarbageArray1ForIndexes.min();
						var minIrow2 = GarbageArray2ForIndexes.min();

						var maxIrow1 = GarbageArray1ForIndexes.max();
						var maxIrow2 = GarbageArray2ForIndexes.max();

						if ((!goToAnotherSet || !goToAnotherSetWW) && !(!goToAnotherSetAfterW1 || !goToAnotherSetAfterW3)) {
							if (goTo1RowWW && !(goTo1RowWW && goTo2RowWW)) {
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveLeft();
								}
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveUp();
								}
							}
							if (goTo2RowWW && !(goTo1RowWW && goTo2RowWW)) {
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveLeft();
								}
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveDown();
								}
							}
							if (goTo1RowWW && goTo2RowWW) {
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveLeft();
								}
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveLeft();
								}
								//alert(cellClass);
							}

						}
						else if (!goToAnotherSetAfterW1 || !goToAnotherSetAfterW3) {
							if (goTo1RowWW && !(goTo1RowWW && goTo2RowWW)) {
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveRight();
								}
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveUp();
								}
							}
							if (goTo2RowWW && !(goTo1RowWW && goTo2RowWW)) {
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveRight();
								}
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveDown();
								}
							}
							if (goTo1RowWW && goTo2RowWW) {
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveRight();
								}
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveRight();
								}
								//alert(cellClass);
							}
						}




						if(goToAnotherSetWW) {
							if(goToAnotherSetAfterW1 && goToAnotherSetAfterW3) {
								clearInterval(move);
								moveLeft();
							}
							if(goToAnotherSet) {
								clearInterval(move);
								moveRight();
								if (cell.classList.contains('AngoUp')) {
									clearInterval(move);
									moveUp();
								}
							}
						}
						}
					if(classNameSet == 'setAfterWall3') {
						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetAfterW3;
						var goTo1RowAfterW3;
						var goTo2RowAfterW3;
						var goTo3RowAfterW3;
						var goTo4RowAfterW3;
					}
					//:::::::::: пылесос находится в области пссле первой стенки ::::::::::
					if(classNameSet == 'setAfterWall1') {
						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetAfterW1;
						var goTo1RowAfterW1;
						var goTo2RowAfterW1;
						var goTo3RowAfterW1;
						var goTo4RowAfterW1;

						//for (var qwe = 0; qwe < row1WW.length; )
						for (var ww1 = 0; ww1 < rowAfter1Wall1.length; ww1++) {
							goTo1RowAfterW1 = false;
							if (rowAfter1Wall1[ww1].children.length > 0) {
								goTo1RowAfterW1 = true;
								break;
							}
							else {
								goTo1RowAfterW1 = false
							}
						}
						for (var ww1 = 0; ww1 < rowAfter2Wall1.length; ww1++) {
							goTo2RowAfterW1 = false;
							if (rowAfter2Wall1[ww1].children.length > 0) {
								goTo2RowAfterW1 = true;
								break;
							}
							else {
								goTo2RowAfterW1 = false
							}
						}
						for (var ww1 = 0; ww1 < rowAfter3Wall1.length; ww1++) {
							goTo3RowAfterW1 = false;
							if (rowAfter3Wall1[ww1].children.length > 0) {
								goTo3RowAfterW1 = true;
								break;
							}
							else {
								goTo3RowAfterW1 = false
							}
						}
						for (var ww1 = 0; ww1 < rowAfter4Wall1.length; ww1++) {
							goTo4RowAfterW1 = false;
							if (rowAfter4Wall1[ww1].children.length > 0) {
								goTo4RowAfterW1 = true;
								break;
							}
							else {
								goTo4RowAfterW1 = false
							}
						}
						/*//-----------------------------
						var GarbageArray1ForIndexes = [];
						var GarbageArray2ForIndexes = [];
						var GarbageArray3ForIndexes = [];
						var GarbageArray4ForIndexes = [];
						for (var www = 0; www < rowAfter1Wall1.length; www++) {
							if (rowAfter1Wall1[www].children.length > 0) {
								GarbageArray1ForIndexes.push(www);
							}
						}
						for (var www = 0; www < rowAfter2Wall1.length; www++) {
							if (rowAfter2Wall1[www].children.length > 0) {
								GarbageArray2ForIndexes.push(www);
							}
						}
						for (var www = 0; www < rowAfter3Wall1.length; www++) {
							if (rowAfter3Wall1[www].children.length > 0) {
								GarbageArray3ForIndexes.push(www);
							}
						}
						for (var www = 0; www < rowAfter4Wall1.length; www++) {
							if (rowAfter4Wall1[www].children.length > 0) {
								GarbageArray4ForIndexes.push(www);
							}
						}


						var maxIrow1 = GarbageArray1ForIndexes.max();
						var maxIrow2 = GarbageArray2ForIndexes.max();
						var maxIrow3 = GarbageArray3ForIndexes.max();
						var maxIrow4 = GarbageArray4ForIndexes.max();



						if (goTo1RowAfterW1 && goTo2RowAfterW1 && goTo3RowAfterW1 && goTo4RowAfterW1) {
							if (cellClass == '1afterWall1') {
								if ((maxIrow1 > maxIrow2) && (maxIrow1 > maxIrow3) && (maxIrow1 > maxIrow4)) {
									clearInterval(move);
									moveLeft();
								}
								if (!((maxIrow1 > maxIrow2) && (maxIrow1 > maxIrow3) && (maxIrow1 > maxIrow4))
										&& (cell.classList.contains('preLast1AfterWall1'))) {
									clearInterval(move);
									moveLeft();
								}
								if (!((maxIrow1 > maxIrow2) && (maxIrow1 > maxIrow3) && (maxIrow1 > maxIrow4))
										&& !(cell.classList.contains('preLast1AfterWall1'))
										&& !(cell.classList.contains('betweenW1W3'))) {
									clearInterval(move);
									moveDown();
								}
							}
							if (cellClass == '2afterWall1') {
								if ((maxIrow2 > maxIrow1) && (maxIrow2 > maxIrow3) && (maxIrow2 > maxIrow4)) {
									clearInterval(move);
									moveLeft();
								}
								if (!((maxIrow2 > maxIrow1) && (maxIrow2 > maxIrow3) && (maxIrow2 > maxIrow4))) {
									clearInterval(move);
									moveDown();
								}
							}
						}
						//----------------
						*/

						if (cell.classList.contains('betweenW1W3') && !goToAnotherSetAfterW1) {
							clearInterval(move);
							moveLeft();
						}

						if (goTo1RowAfterW1) {
							if (cellClass == '1afterWall1') {
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goTo2RowAfterW1) {
							if (cellClass == '2afterWall1') {
								clearInterval(move);
								moveLeft();
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
						}
						if (goTo3RowAfterW1){
							if (cellClass == '3afterWall1') {
								clearInterval(move);
								moveLeft();
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
						}
						if (goTo4RowAfterW1) {
							if (cellClass == '4afterWall1') {
								clearInterval(move);
								moveLeft();
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
						}

						if (goToAnotherSetAfterW1) {
							if (cellClass == '1afterWall1') {
								clearInterval(move);
								moveRight();
							}
							if (cell.classList.contains('betweenW1W3')) {
								clearInterval(move);
								moveDown();
							}
							if (cellClass == '2afterWall1' || cellClass == '3afterWall1' || cellClass == '4afterWall1') {
								clearInterval(move);
								moveUp();
							}
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
				//if (((cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left)
				//		|| (cleaner.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1)
				//		|| (cleaner.getBoundingClientRect().left+1 == tableCells[i].getBoundingClientRect().left))
				//		&& ((cleaner.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top)
				//		|| (cleaner.getBoundingClientRect().top+1 == tableCells[i].getBoundingClientRect().top)
				//		|| (cleaner.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top+1))) {

				if (cleanerTrue.getBoundingClientRect().left == tableCells[i].getBoundingClientRect().left+1
						&& cleanerTrue.getBoundingClientRect().top == tableCells[i].getBoundingClientRect().top
						&& cleanerTrue.getBoundingClientRect().bottom+2 == tableCells[i].getBoundingClientRect().bottom) {


					var cell = tableCells[i];
					var nextBrother = cell.nextElementSibling; // следующая ячейка
					var prevBrother = cell.previousElementSibling; // предыдущая ячейка
					var parent = cell.parentNode; //родитель текущей ячейки
					var cellClassArr = cell.className.split(" "); //массив с классами текущей ячейки

					// очищаем ячейку от "грязи"
					cell.innerHTML = "";
					cell.setAttribute("clean","");
					tableCells[i].removeAttribute("garbage");
					numOfGarbageBlock.innerHTML = musors.length;
					aveDirtyDegreeBlock.innerHTML = averageDirtyDegree() + "%";

					if (musors.length == 0) {
						clearInterval(move);
						throw new Error('STOP!');
						Finish();
					}

					stepsInput.value = --steps;
					if (steps == 0) {
						clearInterval(move);
						throw new Error('STOP!');
					}

					/*counterForAddGargabe += 0.5;
					if (counterForAddGargabe % 10 == 0) {
						try {
							for (var i = 0, l = 1; i < l; ++i) {
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
					}*/

					//определяем к какой области принадлежит текущая йчейка
					var arrOfAreas = ['setBeforeWall1', 'setAfterWall1', 'setWithoutWall', 'setAfterWall3']
					for (var j = 0; j < cellClassArr.length;j++) {
						var classNameSet;
						for (var jj = 0; jj < arrOfAreas.length; jj++) {
							if (cellClassArr[j] == arrOfAreas[jj]) {
								classNameSet = arrOfAreas[jj];
								break;
							}
						}
					}
					//класс конкретного ряда
					var cellClass = cellClassArr[cellClassArr.length-1];


					//берем отдельно каждую строчку в области перед первой стенкой
					var rowBefore1Wall1 = document.getElementsByClassName('1beforeWall1');
					var rowBefore2Wall1 = document.getElementsByClassName('2beforeWall1');
					var rowBefore3Wall1 = document.getElementsByClassName('3beforeWall1');
					var rowBefore4Wall1 = document.getElementsByClassName('4beforeWall1');
					var rowBefore5Wall1 = document.getElementsByClassName('5beforeWall1');
					//берем все элементы перед первой стенкой
					var setBeforeWall1 = document.getElementsByClassName('setBeforeWall1');
					//определяем есть ли в области перед первой стенкой мусор
					for (var q0 = 0; q0 < setBeforeWall1.length; q0++) {
						goToAnotherSet = false;
						if (setBeforeWall1[q0].children.length > 0) {
							goToAnotherSet = false;
							break;
						}
						else {
							goToAnotherSet = true;
						}
					} //goToAnotherSet


					//берем отдельно каждую строчку в области без стенок
					var row1WW = document.getElementsByClassName('without1Wall');
					var row2WW = document.getElementsByClassName('without2Wall');
					//берем все элементы в области без стенок
					var setWW = document.getElementsByClassName('setWithoutWall');
					//определяем есть ли в области без стенок мусор
					for (var w0 = 0; w0 < setWW.length; w0++) {
						goToAnotherSetWW = false;
						if (setWW[w0].children.length > 0) {
							goToAnotherSetWW = false;
							break;
						}
						else {
							goToAnotherSetWW = true;
						}
					} //goToAnotherSetWW


					//берем отдельно каждую строчку в области после третьей стенки
					var rowAfter1Wall3 = document.getElementsByClassName('1afterWall3');
					var rowAfter2Wall3 = document.getElementsByClassName('2afterWall3');
					var rowAfter3Wall3 = document.getElementsByClassName('3afterWall3');
					var rowAfter4Wall3 = document.getElementsByClassName('4afterWall3');
					//берем все элементы из области после третьей стенки
					var setAfterWall3 = document.getElementsByClassName('setAfterWall3');
					//определяем есть ли в области после третьей стенки мусор
					for (var e0 = 0; e0 < setAfterWall3.length; e0++) {
						goToAnotherSetAfterW3 = false;
						if (setAfterWall3[e0].children.length > 0) {
							goToAnotherSetAfterW3 = false;
							break;
						}
						else {
							goToAnotherSetAfterW3 = true;
						}
					} //goToAnotherSetAfterW3


					//берем отдельно каждую строчку в области после первой стенки
					var rowAfter1Wall1 = document.getElementsByClassName('1afterWall1');
					var rowAfter2Wall1 = document.getElementsByClassName('2afterWall1');
					var rowAfter3Wall1 = document.getElementsByClassName('3afterWall1');
					var rowAfter4Wall1 = document.getElementsByClassName('4afterWall1');
					//берем все элементы из области после первой стенки
					var setAfterWall1 = document.getElementsByClassName('setAfterWall1');
					for (var r0 = 0; r0 < setAfterWall1.length; r0++) {
						goToAnotherSetAfterW1 = false;
						if (setAfterWall1[r0].children.length > 0) {
							goToAnotherSetAfterW1 = false;
							break;
						}
						else {
							goToAnotherSetAfterW1 = true;
						}
					} //goToAnotherSetAfterW1


					//:::::::::: пылесос находиться в области перед первой стенкой? ::::::::::
					if (classNameSet == 'setBeforeWall1') {


						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSet;
						var goToRowBefore1Wall1;
						var goToRowBefore2Wall1;
						var goToRowBefore3Wall1;
						var goToRowBefore4Wall1;
						var goToRowBefore5Wall1;

						//определяем есть ли в области перед первой стенкой мусор
						for (var q0 = 0; q0 < setBeforeWall1.length; q0++) {
							goToAnotherSet = false;
							if (setBeforeWall1[q0].children.length > 0) {
								goToAnotherSet = false;
								break;
							}
							else {
								goToAnotherSet = true;
							}
						}
						//определяем есть ли в первой строке перед первой стенкой мусор
						for (var q1 = 0; q1 < rowBefore1Wall1.length; q1++) {
							goToRowBefore1Wall1 = false;
							if (rowBefore1Wall1[q1].children.length > 0) {
								goToRowBefore1Wall1 = true;
								break;
							}
							else {
								goToRowBefore1Wall1 = false
							}
						}
						//определяем есть ли во второй строке перед первой стенкой мусор
						for (var q2 = 0; q2 < rowBefore2Wall1.length; q2++) {
							goToRowBefore2Wall1 = false;
							if (rowBefore2Wall1[q2].children.length > 0) {
								goToRowBefore2Wall1 = true;
								break;
							}
							else {
								goToRowBefore2Wall1 = false
							}
						}
						//определяем есть ли в третьей строке перед первой стенкой мусор
						for (var q3 = 0; q3 < rowBefore3Wall1.length; q3++) {
							goToRowBefore3Wall1 = false;
							if (rowBefore3Wall1[q3].children.length > 0) {
								goToRowBefore3Wall1 = true;
								break;
							}
							else {
								goToRowBefore3Wall1 = false
							}
						}
						//определяем есть ли в четвертой строке перед первой стенкой мусор
						for (var q4 = 0; q4 < rowBefore4Wall1.length; q4++) {
							goToRowBefore4Wall1 = false;
							if (rowBefore4Wall1[q4].children.length > 0) {
								goToRowBefore4Wall1 = true;
								break;
							}
							else {
								goToRowBefore4Wall1 = false
							}
						}
						//определяем есть ли в пятой строке перед первой стенкой мусор
						for (var q5 = 0; q5 < rowBefore5Wall1.length; q5++) {
							goToRowBefore5Wall1 = false;
							if (rowBefore5Wall1[q5].children.length > 0) {
								goToRowBefore5Wall1 = true;
								break;
							}
							else {
								goToRowBefore5Wall1 = false
							}
						}

						//если в первой строчке есть мусор, идем на нее, дальше определяем на какой строчке находится пылесос
						if (goToRowBefore1Wall1) {
							if (cellClass == '1beforeWall1') {
								clearInterval(move);
								moveRight();
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goToRowBefore2Wall1 && !goToRowBefore1Wall1){
							if (cellClass == '1beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							if (cellClass == '2beforeWall1') {
								clearInterval(move);
								moveRight();
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
						}
						if (goToRowBefore3Wall1 && !goToRowBefore1Wall1 && !goToRowBefore2Wall1) {
							if (cellClass == '1beforeWall1' || cellClass == '2beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							if (cellClass == '3beforeWall1') {
								clearInterval(move);
								moveRight();
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
						}
						if (goToRowBefore4Wall1 && !goToRowBefore1Wall1 && !goToRowBefore2Wall1 && !goToRowBefore3Wall1) {
							if (cellClass == '1beforeWall1' || cellClass == '2beforeWall1' || cellClass == '3beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							if (cellClass == '4beforeWall1') {
								clearInterval(move);
								moveRight();
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
						}
						if (goToRowBefore5Wall1 && !goToRowBefore1Wall1 && !goToRowBefore2Wall1 && !goToRowBefore3Wall1 && !goToRowBefore4Wall1) {
							if (cellClass == '1beforeWall1' || cellClass == '2beforeWall1' || cellClass == '3beforeWall1' || cellClass == '4beforeWall1') {
								clearInterval(move);
								moveDown();
							}
							if (cellClass == '5beforeWall1') {
								clearInterval(move);
								moveRight();
								if (nextBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveLeft();
								}
							}
						}



						//если в области перед стенкой нету мусор, выходим из этой области
						if (goToAnotherSet) {
							clearInterval(move);
							moveDown();
						}
					}

					//:::::::::: пылесос находится в области без стенок ::::::::::
					if (classNameSet == 'setWithoutWall') {

						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetWW;
						var goTo1RowWW;
						var goTo2RowWW;

						for (var ww1 = 0; ww1 < row1WW.length; ww1++) {
							goTo1RowWW = false;
							if (row1WW[ww1].children.length > 0) {
								goTo1RowWW = true;
								break;
							}
							else {
								goTo1RowWW = false
							}
						}
						for (var ww2 = 0; ww2 < row2WW.length; ww2++) {
							goTo2RowWW = false;
							if (row2WW[ww2].children.length > 0) {
								goTo2RowWW = true;
								break;
							}
							else {
								goTo2RowWW = false
							}
						}

						var GarbageArray1ForIndexes = [];
						var GarbageArray2ForIndexes = [];
						for (var www = 0; www < row1WW.length; www++) {
							if (row1WW[www].children.length > 0) {
								GarbageArray1ForIndexes.push(www);
							}
						}
						for (var www = 0; www < row2WW.length; www++) {
							if (row2WW[www].children.length > 0) {
								GarbageArray2ForIndexes.push(www);
							}
						}

						var minIrow1 = GarbageArray1ForIndexes.min();
						var minIrow2 = GarbageArray2ForIndexes.min();
						//if ()
						if (!goToAnotherSet && !(!goToAnotherSetAfterW1 || !goToAnotherSetAfterW3)) {
							if (goTo1RowWW && !(goTo1RowWW && goTo2RowWW)) {
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveLeft();
								}
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveUp();
								}
							}
							if (goTo2RowWW && !(goTo1RowWW && goTo2RowWW)) {
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveLeft();
								}
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveDown();
								}
							}
							if (goTo1RowWW && goTo2RowWW) {
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveLeft();
								}
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveLeft();
								}
								//alert(cellClass);
							}
						}
						else if ((!goToAnotherSetAfterW1 || !goToAnotherSetAfterW3)&&!!goToAnotherSet) {
							if (goTo1RowWW && !(goTo1RowWW && goTo2RowWW)) {
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveRight();
								}
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveUp();
								}
							}
							if (goTo2RowWW && !(goTo1RowWW && goTo2RowWW)) {
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveRight();
								}
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveDown();
								}
							}
							if (goTo1RowWW && goTo2RowWW) {
								if (cellClass == 'without1Wall') {
									clearInterval(move);
									moveRight();
								}
								if (cellClass == 'without2Wall') {
									clearInterval(move);
									moveRight();
								}
								//alert(cellClass);
							}
						}



						if(goToAnotherSetWW) {
							if(goToAnotherSetAfterW1 && goToAnotherSetAfterW3) {
								clearInterval(move);
								moveLeft();
							}
							if(goToAnotherSet) {
								clearInterval(move);
								moveRight();
								if (cell.classList.contains('AngoUp')) {
									clearInterval(move);
									moveUp();
								}
							}
						}
					}
					//:::::::::: пылесос находится в области пссле третьей стенки ::::::::::
					if(classNameSet == 'setAfterWall3') {
						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetAfterW3;
						var goTo1RowAfterW3;
						var goTo2RowAfterW3;
						var goTo3RowAfterW3;
						var goTo4RowAfterW3;

						if(goToAnotherSetAfterW3) {
							if (goToAnotherSetAfterW1) {
								clearInterval(move);
								moveDown();
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
					}
					//:::::::::: пылесос находится в области пссле первой стенки ::::::::::
					if(classNameSet == 'setAfterWall1') {
						//переменные, отвечающие за то, куда пойти пылесосу
						var goToAnotherSetAfterW1;
						var goTo1RowAfterW1;
						var goTo2RowAfterW1;
						var goTo3RowAfterW1;
						var goTo4RowAfterW1;

						if (cell.classList.contains('betweenW1W3') && !goToAnotherSetAfterW1) {
							clearInterval(move);
							moveLeft();
						}
						for (var q1 = 0; q1 < rowAfter1Wall1.length; q1++) {
							goTo1RowAfterW1 = false;
							if (rowAfter1Wall1[q1].children.length > 0) {
								goTo1RowAfterW1 = true;
								break;
							}
							else {
								goTo1RowAfterW1 = false
							}
						}
						for (var q1 = 0; q1 < rowAfter2Wall1.length; q1++) {
							goTo2RowAfterW1 = false;
							if (rowAfter2Wall1[q1].children.length > 0) {
								goTo2RowAfterW1 = true;
								break;
							}
							else {
								goTo2RowAfterW1 = false
							}
						}
						for (var q1 = 0; q1 < rowAfter3Wall1.length; q1++) {
							goTo3RowAfterW1 = false;
							if (rowAfter3Wall1[q1].children.length > 0) {
								goTo3RowAfterW1 = true;
								break;
							}
							else {
								goTo3RowAfterW1 = false
							}
						}
						for (var q1 = 0; q1 < rowAfter4Wall1.length; q1++) {
							goTo4RowAfterW1 = false;
							if (rowAfter4Wall1[q1].children.length > 0) {
								goTo4RowAfterW1 = true;
								break;
							}
							else {
								goTo4RowAfterW1 = false
							}
						}

						if (goTo1RowAfterW1) {
							if (cellClass == '1afterWall1') {
								clearInterval(move);
								moveLeft();
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
						if (goTo2RowAfterW1 && !goTo1RowAfterW1){
							if (cellClass == '1afterWall1') {
								clearInterval(move);
								moveDown();
							}
							if (cellClass == '2afterWall1') {
								clearInterval(move);
								moveLeft();
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
						}
						if (goTo3RowAfterW1 && !goTo1RowAfterW1 && !goTo2RowAfterW1) {
							if (cellClass == '1afterWall1' || cellClass == '2afterWall1') {
								clearInterval(move);
								moveDown();
							}
							if (cellClass == '3afterWall1') {
								clearInterval(move);
								moveLeft();
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
						}
						if (goTo4RowAfterW1 && !goTo1RowAfterW1 && !goTo2RowAfterW1 && !goTo3RowAfterW1) {
							if (cellClass == '1afterWall1' || cellClass == '2afterWall1' || cellClass == '3afterWall1') {
								clearInterval(move);
								moveDown();
							}
							if (cellClass == '4afterWall1') {
								clearInterval(move);
								moveLeft();
								if (prevBrother.classList.contains('wallCell1')) {
									clearInterval(move);
									moveRight();
								}
							}
						}

						if (goToAnotherSetAfterW1) {
							if (cellClass == '1afterWall1') {
								clearInterval(move);
								moveRight();
							}
							else {
								clearInterval(move);
								moveUp();
							}
						}
					}
				}
			}

		}, speed);
	}



	//moveRight();
	//moveDown();


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
		moveRight();
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