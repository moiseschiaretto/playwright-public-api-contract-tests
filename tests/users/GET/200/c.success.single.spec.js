import { test } from '@playwright/test';
import { UserService } from '@services/UserService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /users/{id} - usuário único
test('GET /users/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/users/GET/200';
    const userService = new UserService(request);

    const { responseData } = await userService.getId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'c.success.single.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
