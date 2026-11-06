import { test, expect } from '@playwright/test';
import { UserService } from '@services/UserService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// DELETE /users/{id} - simula exclusão de usuário
test('DELETE /users/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/users/DELETE/200';
    const userService = new UserService(request);

    const { responseData } = await userService.deleteId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.isDeleted).toBe(true);
});
