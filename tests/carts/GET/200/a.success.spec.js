const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// GET /carts - lista paginada de carrinhos
test('GET /carts - status 200', async ({ request }) => {
    const folderPath = "public-api/carts/GET/200";

    const { responseData } = await makeRequest({
        request,
        method: 'GET',
        baseURL: environment.api.base_url,
        endPoint: '/carts',
        expectedStatus: 200,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
