var should = require('should'),
    app = require('./../src/main'),
    man = require('thoughtpad-plugin-manager'),
    thoughtpad;

describe("coffeekup compilation plugin", function () {
    it("should register correctly to events", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.true;
        });

        thoughtpad.notify("html-compile-request", { ext: "" });
    });

    it("should ignore anything other than coffeekup", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.false; // Should never hit here because the extension is not coffeekup
        });

        thoughtpad.notify("html-compile-request", { ext: "html" });
    });

    it("should compile coffeekup with content data", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *(contents) {
            contents.should.equal('<div class="content">hello</div>');
        });

        thoughtpad.notify("html-compile-request", { ext: "coffee", contents: "div '.content', ->\n\ttext @document.content", data: { document: { content: "hello" } } });
    });
});