var coffee = require('coffeekup'),
    extend = require('util')._extend;

var init = function (thoughtpad) {
    thoughtpad.subscribe("html-compile-request", compile);
},

compile = function *(obj) {
    if (obj.ext !== "coffee") return;

    if (obj.data) {
        obj.thoughtpad.config = extend(obj.thoughtpad.config, obj.data);
    }

    yield obj.thoughtpad.notify("html-compile-complete", { contents: coffee.render(obj.contents, obj.thoughtpad.config), name: obj.name });
};

module.exports = {
    init: init
};