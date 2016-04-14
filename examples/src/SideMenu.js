function SideMenu() {
	this.render();
	this._startTimer()
}
SideMenu.prototype = {
	render: function() {
		var config = this._getElementConfig();
		var data = this._getData();

		document.body.innerHTML = 'template + ' + JSON.stringify(data)
	},

	_getElementConfig: function() {
		console.log('_getElementConfig');
	},

	_getData: function() {
		console.log('_getData');
	},

	_startTimer: function() {
		
	}
}