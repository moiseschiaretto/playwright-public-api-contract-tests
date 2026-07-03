const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// POST /carts/add - simula criação de carrinho
test('POST /carts/add - status 201', async ({ request }) => {
    const folderPath = "public-api/carts/POST/201";

    const { responseData } = await makeRequest({
        request,
        method: 'POST',
        baseURL: environment.api.base_url,
        endPoint: '/carts/add',
        token: environment.api.token,
        body: {
            "userId": 1,
            "products": [
                {
                    "id": 1,
                    "quantity": 2
                }
            ]
        },
        expectedStatus: 201,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
