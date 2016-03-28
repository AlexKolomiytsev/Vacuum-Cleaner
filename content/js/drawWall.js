/**
 * Created by sanya on 20.03.2016.
 */
function drawWall() {
	var tableCells = document.getElementsByClassName('tableCell');

	for (var i = 0; i < tableCells.length; ++i) {
		tableCells[i].addEventListener('click', function() {
			if (!this.children.length > 0) {
				this.classList.toggle('tableCell');
				this.classList.toggle('wallCell');
				this.classList.remove('iwashere');
			}

		});
	}

	return false;
}