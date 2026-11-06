import { test } from '@playwright/test';
import { UserService } from '@services/UserService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /users/{id} - usuário inexistente retorna 404
test('GET /users/999999 - status 404', async ({ request }) => {
    const folderPath = 'public-api/users/GET/404';
    const userService = new UserService(request);

    const { responseData } = await userService.getId(999999, {
        expectedStatus: 404,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
