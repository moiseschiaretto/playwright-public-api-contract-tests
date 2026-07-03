const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// DELETE /products/{id} - simula exclusão de produto
test('DELETE /products/1 - status 200', async ({ request }) => {
    const folderPath = "public-api/products/DELETE/200";

    const { responseData } = await makeRequest({
        request,
        method: 'DELETE',
        baseURL: environment.api.base_url,
        endPoint: '/products/1',
        token: environment.api.token,
        expectedStatus: 200,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
    expect(responseData.isDeleted).toBe(true);
});
