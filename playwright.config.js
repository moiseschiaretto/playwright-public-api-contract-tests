// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 15000,
    retries: 1,
    workers: process.env.CI ? 2 : undefined,

    reporter: [
        ['list'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
        ['allure-playwright', { outputFolder: 'allure-results' }]
    ],

    projects: [
        {
            name: 'API Tests',
            testMatch: /.*\.spec\.js$/,
        }
    ],

    use: {
        trace: 'retain-on-failure',
        extraHTTPHeaders: {
            'Accept': 'application/json'
        }
    }
});
