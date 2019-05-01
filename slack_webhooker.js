const https = require('https');
const { URL } = require('url');

class SlackWebhooker {
    constructor(webhookUrl) {
        this.webhookUrl = new URL(webhookUrl);
    }
    post(text) {
        return new Promise((resolve, reject) => {
            const request = https.request({
                method: 'POST',
                hostname: this.webhookUrl.hostname,
                path: this.webhookUrl.pathname,
                headers: {
                    'Content-Type': 'application/json',
                },
            }, response => {
                let rawData = '';
                response.on('data', (chunk) => { rawData += chunk; });
                response.on('end', () => {
                    if (response.statusCode === 200) {
                        resolve(rawData);
                    } else {
                        reject(rawData);
                    }
                });
            });
            request.write(JSON.stringify({
                text: text,
            }));
            request.on('error', reject);
            request.end();
        });
    }
}

module.exports = SlackWebhooker;
