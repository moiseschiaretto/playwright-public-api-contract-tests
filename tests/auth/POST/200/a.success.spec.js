const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// POST /auth/login - autenticação válida retorna accessToken
test('POST /auth/login - status 200', async ({ request }) => {
    const folderPath = "public-api/auth/POST/200";

    const { responseData } = await makeRequest({
        request,
        method: 'POST',
        baseURL: environment.api.base_url,
        endPoint: '/auth/login',
        token: environment.api.token,
        body: {
            username: environment.api.username,
            password: environment.api.password,
            expiresInMins: 60
        },
        expectedStatus: 200,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
    expect(responseData).toHaveProperty('accessToken'); expect(typeof responseData.accessToken).toBe('string');
});
