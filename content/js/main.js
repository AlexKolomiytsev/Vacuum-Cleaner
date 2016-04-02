/**
 * Created by sanya on 07.03.2016.
 */
window.addEventListener("load", function() {

	var buttonsNav = document.getElementsByClassName('buttonsNav')[0];
	var btnAddGarb = document.getElementsByClassName('btn-dropGarb')[0];

	var chooseAlgo1 = document.getElementsByClassName('chooseAlgorithm1')[0];
	var algo1Buttons = document.getElementsByClassName('algoo1');
	var chooseAlgo2 = document.getElementsByClassName('chooseAlgorithm2')[0];
	var algo2Buttons = document.getElementsByClassName('algoo2');

	var btnDescription = document.getElementsByClassName('btn-descript')[0];


	var map1 = document.getElementById('map1');
	var map2 = document.getElementById('map2');

	var faq1 = document.getElementsByClassName('FAQ1')[0];
	var faq2 = document.getElementsByClassName('FAQ2')[0];
	var faq3 = document.getElementsByClassName('FAQ3')[0];

	faq1.classList.add('open');

	var chooseMapItems = document.getElementsByClassName('list-group-item');

	for (var i = 0; i < chooseMapItems.length; ++i) {
		chooseMapItems[i].addEventListener('click', function (e) {
			e.preventDefault();

			if (this.classList.contains('active')) {
				console.log("alilua");
			}
			else {
				var stem = this.getAttribute('data-stem');
				var base = 'content/partials/'+stem+'.html';

				btnDescription.style.display = 'none';

				deactiveItems(chooseMapItems);

				this.classList.add('active');

				chooseMap(base);

				faq1.classList.remove('open');
				faq2.classList.add('open');


			}
			return false;
		})
	}

	chooseMapItems[0].addEventListener('click', function (e) {
		buttonsNav.classList.add('open');
		chooseAlgo2.classList.remove('open');
		chooseAlgo1.classList.add('open');
		btnAddGarb.style.display = 'none';


		for (var j = 0; j < algo1Buttons.length; ++j) {
			algo1Buttons[j].addEventListener('click', function() {
				deactiveItems(algo1Buttons);
				this.classList.add('active');

				var algoBtn = this.getAttribute('data-algo');

				faq2.classList.remove('open');
				faq3.classList.add('open');

				var info = document.getElementsByClassName('info')[0];

				info.classList.add('open');

				if (algoBtn == 'algo1') algo1();
				else if (algoBtn == 'algo2') algo2();
				else if (algoBtn == 'algo3') algo3();

			});
		}
	});
	chooseMapItems[1].addEventListener('click', function(e) {
		buttonsNav.classList.add('open');
		chooseAlgo1.classList.remove('open');
		chooseAlgo2.classList.add('open');
		btnAddGarb.style.display = 'block';
		$('#vpm').tooltip();



		for (var j = 0; j < algo2Buttons.length; ++j) {
			algo2Buttons[j].addEventListener('click', function() {
				deactiveItems(algo2Buttons);
				this.classList.add('active');

				var algoBtn = this.getAttribute('data-algo');

				console.log(algoBtn);
				faq2.classList.remove('open');
				faq3.classList.add('open');

				var info = document.getElementsByClassName('info')[0];

				info.classList.add('open');


				if (algoBtn == 'algo4') algo4();
				else if (algoBtn == 'algo5') {
					algo5();
				}


			});
		}
	});

	if (map1.classList.contains('active')) {


	}
	if (map2.classList.contains('active')) {

	}

	function deactiveItems(collection) {
		for (var i = 0; i < collection.length; ++i) {
			collection[i].classList.remove('active');
		}
	}





});