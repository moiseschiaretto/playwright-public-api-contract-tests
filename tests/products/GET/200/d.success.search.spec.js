const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// GET /products/search?q= - busca por termo
test('GET /products/search - status 200', async ({ request }) => {
    const folderPath = "public-api/products/GET/200";

    const { responseData } = await makeRequest({
        request,
        method: 'GET',
        baseURL: environment.api.base_url,
        endPoint: '/products/search?q=phone',
        expectedStatus: 200,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'd.success.search.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
