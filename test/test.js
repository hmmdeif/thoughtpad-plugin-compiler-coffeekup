var should = require('should'),
    app = require('./../src/main'),
    co = require('co'),
    man = require('thoughtpad-plugin-manager'),
    thoughtpad;

describe("coffeekup compilation plugin", function () {
    it("should register correctly to events", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.true;
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "coffee", contents: "" });
        })();
    });

    it("should ignore anything other than coffeekup", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.false; // Should never hit here because the extension is not coffeekup
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "html" });
        })();
    });

    it("should compile coffeekup with content data", function (done) {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *(contents) {
            contents.should.equal('<div class="content">hello there</div>');
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "coffee", contents: "div '.content', ->\n\ttext @document.content", data: { document: { content: "hello there" } } });
            done();
        })();
    });
});