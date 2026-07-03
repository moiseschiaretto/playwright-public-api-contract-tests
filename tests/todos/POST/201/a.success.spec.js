const { test, expect } = require('@playwright/test');
const { makeRequest } = require('../../../../src/utils/requests');
const { validateResponseWithJsonSchema } = require('../../../../src/utils/validators');
const { loadExpectedData } = require('../../../../src/utils/files');
const environment = require('../../../../src/config/environment');

// POST /todos/add - simula criação de tarefa
test('POST /todos/add - status 201', async ({ request }) => {
    const folderPath = "public-api/todos/POST/201";

    const { responseData } = await makeRequest({
        request,
        method: 'POST',
        baseURL: environment.api.base_url,
        endPoint: '/todos/add',
        token: environment.api.token,
        body: {
            "todo": "Revisar cenários de teste",
            "completed": false,
            "userId": 1
        },
        expectedStatus: 201,
        showResponseLog: false,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
    expect(responseData.todo).toBe('Revisar cenários de teste');
});
