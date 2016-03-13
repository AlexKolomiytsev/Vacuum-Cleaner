/**
 * Created by sanya on 07.03.2016.
 */
window.addEventListener("load", function() {
	var infoBlock = document.getElementsByClassName('info')[0];

	var btn_algo1 = document.getElementsByClassName("algo1")[0];
	var btn_algo2 = document.getElementsByClassName("algo2")[0];
	var btn_algo3 = document.getElementsByClassName("algo3")[0];

	btn_algo1.addEventListener("click", function() {
		infoBlock.classList.add('open');
		algo1();
	});
	btn_algo2.addEventListener("click", function() {
		infoBlock.classList.add('open');
		algo2();
	});
	btn_algo3.addEventListener("click", function() {
		infoBlock.classList.add('open');
		algo3();
	});


});