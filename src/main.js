var coffee = require('coffeekup'),
    _thoughtpad;

var init = function (thoughtpad) {
    _thoughtpad = thoughtpad;
    _thoughtpad.subscribe("html-compile-request", compile);
},

compile = function *(obj) {
    if (obj.ext !== "coffee") return;

    yield _thoughtpad.notify("html-compile-complete", coffee.render(obj.contents, obj.data));
};

module.exports = {
    init: init
};