function SideMenu() {
    this.render();
    this.a1();
}
SideMenu.prototype = {
    render: function () {
        var config = this.a2();
        var data = this.a3();
        document.body.innerHTML = 'template + ' + JSON.stringify(data);
    },
    a2: function () {
        console.log('_getElementConfig');
    },
    a3: function () {
        console.log('_getData');
    },
    a1: function () {
    }
};