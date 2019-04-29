const index = require('../index');

describe('index', function () {
    this.timeout(10000);
    describe('#main()', function () {
        it('should be executed without exceptions', function () {
            index.main();
        });
    });
});
