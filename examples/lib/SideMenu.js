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
        console.log('a2');
    },
    a3: function () {
        console.log('a3');
    },
    a1: function () {
    },
    methods: [{
            key: 'a3',
            value: function () {
            }
        }]
};