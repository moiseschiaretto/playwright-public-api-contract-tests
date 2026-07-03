const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// POST /auth/login - senha incorreta retorna 400
test('POST /auth/login - status 400', async ({ request }) => {
    const folderPath = "public-api/auth/POST/400";

    const { responseData } = await makeRequest({
        request,
        method: 'POST',
        baseURL: environment.api.base_url,
        endPoint: '/auth/login',
        token: environment.api.token,
        body: {
            username: environment.api.username,
            password: 'senha-errada-de-proposito'
        },
        expectedStatus: 400,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
