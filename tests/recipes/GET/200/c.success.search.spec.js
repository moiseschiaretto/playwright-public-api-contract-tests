const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// GET /recipes/search?q= - busca por termo
test('GET /recipes/search - status 200', async ({ request }) => {
    const folderPath = "public-api/recipes/GET/200";

    const { responseData } = await makeRequest({
        request,
        method: 'GET',
        baseURL: environment.api.base_url,
        endPoint: '/recipes/search?q=chicken',
        expectedStatus: 200,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'c.success.search.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
