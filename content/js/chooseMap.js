/**
 * Created by sanya on 20.03.2016.
 */
function chooseMap(link) {

	var mapView = document.getElementsByClassName('mapView')[0];

	function showMap(link) {
		var http = new XMLHttpRequest();
		http.open('get', link);
		http.addEventListener('readystatechange', function() {
			if(http.readyState == 4) {
				mapView.innerHTML = http.responseText;
			}
		});
		http.send(null);
	}

	return showMap(link);
}

