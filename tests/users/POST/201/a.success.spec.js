const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// POST /users/add - simula criação de usuário
test('POST /users/add - status 201', async ({ request }) => {
    const folderPath = "public-api/users/POST/201";

    const { responseData } = await makeRequest({
        request,
        method: 'POST',
        baseURL: environment.api.base_url,
        endPoint: '/users/add',
        token: environment.api.token,
        body: {
            "firstName": "Moises",
            "lastName": "QA",
            "age": 40
        },
        expectedStatus: 201,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
    expect(responseData.firstName).toBe('Moises');
});
