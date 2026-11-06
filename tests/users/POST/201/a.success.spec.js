import { test, expect } from '@playwright/test';
import { UserService } from '@services/UserService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// POST /users/add - simula criação de usuário
test('POST /users/add - status 201', async ({ request }) => {
    const folderPath = 'public-api/users/POST/201';
    const body = loadJsonFixture('resources/fixtures/public-api/users/POST/request/valid.json');
    const userService = new UserService(request);

    const { responseData } = await userService.post({
        body,
        expectedStatus: 201,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.firstName).toBe(body.firstName);
});
