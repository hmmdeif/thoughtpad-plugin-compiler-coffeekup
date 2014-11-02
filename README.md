thoughtpad-plugin-compiler-coffeekup
=================================

[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

A thoughtpad plugin that responds to HTML compile events. Coffeekup will be compiled to HTML for use in the browser.

## Usage

The plugin should be loaded using the [thoughtpad-plugin-manager](https://github.com/hmmdeif/thoughtpad-plugin-manager). Once this has been done then the plugin will respond to events. To use standalone:

```JavaScript
var man = require('thoughtpad-plugin-manager'),
    coffeekup = require('thoughtpad-plugin-compiler-coffeekup');

var thoughtpad = man.registerPlugins([coffeekup]);
thoughtpad.subscribe("html-compile-complete", function (data) {
    console.log("HTML is returned here"); 
});
thoughtpad.notify("html-compile-request", { 
    ext: "coffee", 
    contents: "your coffeekup code here", 
    data: "your data here" 
});
```

## Variables

Additional data can be used in the Coffeekup code that allows you to dynamically generate code and create simple logical constructs. This extra data can be passed into the `html-compile-request` notification object as `data`.

## Tests

Ensure you have globally installed mocha - `npm -g install mocha`. Then you can run:

`mocha --harmony-generators`

Alternatively if you are in a *NIX environment `npm test` will run the tests plus coverage data.

## License

The code is available under the [MIT license](http://deif.mit-license.org/).

[travis-image]: https://img.shields.io/travis/hmmdeif/thoughtpad-plugin-compiler-coffeekup/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/hmmdeif/thoughtpad-plugin-compiler-coffeekup
[coveralls-image]: https://img.shields.io/coveralls/hmmdeif/thoughtpad-plugin-compiler-coffeekup/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/hmmdeif/thoughtpad-plugin-compiler-coffeekup?branch=master
