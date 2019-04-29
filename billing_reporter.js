const { BigQuery } = require('@google-cloud/bigquery');

const query = billingAccountId => `
SELECT
  invoice.month,
  SUM(cost)
    + SUM(IFNULL((SELECT SUM(c.amount)
                  FROM UNNEST(credits) c), 0))
    AS total,
  (SUM(CAST(cost * 1000000 AS int64))
    + SUM(IFNULL((SELECT SUM(CAST(c.amount * 1000000 as int64))
                  FROM UNNEST(credits) c), 0))) / 1000000
    AS total_exact
FROM \`billing.gcp_billing_export_v1_${billingAccountId}\`
GROUP BY 1
ORDER BY 1 ASC
;
`;
const billingReport = data => data[0].map(row => `month:${row.month} total:${row.total} total_exact:${row.total_exact}`).join('\n');

class BillingReporter {

    constructor(projectId, billingAccountId) {
        this.bigquery = new BigQuery({
            projectId: projectId,
        });
        this.billingAccountId = billingAccountId;
    }

    query() {
        return this.bigquery.query({
            query: query(this.billingAccountId),
            useLegacySql: false,
        }).then(data => new Promise(
            resolve => resolve(billingReport(data))
        ));
    }
}

module.exports = BillingReporter;
