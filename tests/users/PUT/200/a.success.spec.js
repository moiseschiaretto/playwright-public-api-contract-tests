import { test, expect } from '@playwright/test';
import { UserService } from '@services/UserService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// PUT /users/{id} - simula atualização de usuário
test('PUT /users/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/users/PUT/200';
    const body = loadJsonFixture('resources/fixtures/public-api/users/PUT/request/valid.json');
    const userService = new UserService(request);

    const { responseData } = await userService.putId(1, {
        body,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.firstName).toBe(body.firstName);
});
