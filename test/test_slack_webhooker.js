const SlackWebhooker = require('../slack_webhooker');
const WEBHOOK_URL = process.env.WEBHOOK_URL;

describe('SlackWebhooker', function () {
    this.timeout(10000);
    describe('#post()', function () {
        it('should be executed without exceptions', function () {
            let slackWebhooker = new SlackWebhooker(WEBHOOK_URL);
            return slackWebhooker.post('test').then(console.log).catch(console.error);
        });
    });
});

