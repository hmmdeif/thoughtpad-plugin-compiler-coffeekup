var should = require('should'),
    app = require('./../src/main'),
    co = require('co'),
    man = require('thoughtpad-plugin-manager'),
    thoughtpad;

describe("coffeekup compilation plugin", function () {
    it("should register correctly to events", function (done) {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.true;
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "coffee", contents: "" });
            done();
        }).catch(done);
    });

    it("should ignore anything other than coffeekup", function (done) {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.false; // Should never hit here because the extension is not coffeekup
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "html" });
            done();
        }).catch(done);
    });

    it("should compile coffeekup with content data", function (done) {
        var contents = "",
            name = "";

        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = { foo: 'bar' };

        thoughtpad.subscribe("html-compile-complete", function *(res) {
            contents = res.contents;
            name = res.name;
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "coffee", contents: "div '.content', ->\n\ttext @document.content\n\ttext @foo", data: { document: { content: "hello there" } }, name: 'hello' });
            contents.should.equal('<div class="content">hello therebar</div>');
            name.should.equal('hello');
            done();
        }).catch(done);
    });
});