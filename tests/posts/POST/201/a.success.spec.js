const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// POST /posts/add - simula criação de post
test('POST /posts/add - status 201', async ({ request }) => {
    const folderPath = "public-api/posts/POST/201";

    const { responseData } = await makeRequest({
        request,
        method: 'POST',
        baseURL: environment.api.base_url,
        endPoint: '/posts/add',
        token: environment.api.token,
        body: {
            "title": "Post de teste automatizado",
            "userId": 1
        },
        expectedStatus: 201,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
    expect(responseData.title).toBe('Post de teste automatizado');
});
