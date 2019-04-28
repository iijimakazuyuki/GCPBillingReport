const BillingReporter = require('./billing_reporter');

const PROJECT_ID = process.env.PROJECT_ID;
const BILLING_ACCOUNT_ID = process.env.BILLING_ACCOUNT_ID.replace(/-/g, '_');

const billingReporter = new BillingReporter(
    PROJECT_ID,
    BILLING_ACCOUNT_ID,
);

billingReporter.query();
