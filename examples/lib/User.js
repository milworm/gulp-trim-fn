function User() {
    this.render();
    this.a1();
}
User.prototype = {
    render: function () {
        var config = this.a1();
        var data = this.a2();
        document.body.innerHTML = 'template + ' + JSON.stringify(data);
    },
    a1: function () {
        console.log('_getElementConfig');
    },
    a2: function () {
        console.log('_getData');
    }
};