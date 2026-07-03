const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// PUT /posts/{id} - simula atualização de post
test('PUT /posts/1 - status 200', async ({ request }) => {
    const folderPath = "public-api/posts/PUT/200";

    const { responseData } = await makeRequest({
        request,
        method: 'PUT',
        baseURL: environment.api.base_url,
        endPoint: '/posts/1',
        token: environment.api.token,
        body: {
            "title": "Título de post atualizado"
        },
        expectedStatus: 200,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
    expect(responseData.title).toBe('Título de post atualizado');
});
