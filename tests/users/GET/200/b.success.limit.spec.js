import { test } from '@playwright/test';
import { UserService } from '@services/UserService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /users?limit=5&skip=10 - paginação
test('GET /users - status 200', async ({ request }) => {
    const folderPath = 'public-api/users/GET/200';
    const userService = new UserService(request);

    const { responseData } = await userService.getAll({
        query: { limit: 5, skip: 10 },
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'b.success.limit.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
