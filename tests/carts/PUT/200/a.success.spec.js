const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// PUT /carts/{id} - simula atualização de carrinho
test('PUT /carts/1 - status 200', async ({ request }) => {
    const folderPath = "public-api/carts/PUT/200";

    const { responseData } = await makeRequest({
        request,
        method: 'PUT',
        baseURL: environment.api.base_url,
        endPoint: '/carts/1',
        token: environment.api.token,
        body: {
            "merge": true,
            "products": [
                {
                    "id": 2,
                    "quantity": 1
                }
            ]
        },
        expectedStatus: 200,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
