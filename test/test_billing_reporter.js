const BillingReporter = require('../billing_reporter');
const PROJECT_ID = process.env.PROJECT_ID;
const BILLING_ACCOUNT_ID = process.env.BILLING_ACCOUNT_ID.replace(/-/g, '_');

describe('BillingReporter', function () {
    this.timeout(10000);
    describe('#query()', function () {
        it('should be executed without exceptions', function () {
            let billingReporter = new BillingReporter(
                PROJECT_ID,
                BILLING_ACCOUNT_ID,
            );
            return billingReporter.query().then(console.log).catch(console.error);
        });
    });
});

