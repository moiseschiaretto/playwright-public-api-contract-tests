const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// GET /comments - lista paginada de comentários
test('GET /comments - status 200', async ({ request }) => {
    const folderPath = "public-api/comments/GET/200";

    const { responseData } = await makeRequest({
        request,
        method: 'GET',
        baseURL: environment.api.base_url,
        endPoint: '/comments',
        expectedStatus: 200,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
