const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// POST /products/add - simula criação de produto
test('POST /products/add - status 201', async ({ request }) => {
    const folderPath = "public-api/products/POST/201";

    const { responseData } = await makeRequest({
        request,
        method: 'POST',
        baseURL: environment.api.base_url,
        endPoint: '/products/add',
        token: environment.api.token,
        body: {
            "title": "Produto de Teste E2E",
            "price": 99.9,
            "category": "automation-tests"
        },
        expectedStatus: 201,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
    expect(responseData.title).toBe('Produto de Teste E2E');
});
