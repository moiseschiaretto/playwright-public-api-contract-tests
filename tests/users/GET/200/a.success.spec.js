import { test } from '@playwright/test';
import { UserService } from '@services/UserService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /users - lista paginada de usuários
test('GET /users - status 200', async ({ request }) => {
    const folderPath = 'public-api/users/GET/200';
    const userService = new UserService(request);

    const { responseData } = await userService.getAll({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
