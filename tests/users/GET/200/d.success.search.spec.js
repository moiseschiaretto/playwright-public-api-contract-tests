import { test } from '@playwright/test';
import { UserService } from '@services/UserService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /users/search?q= - busca por termo
test('GET /users/search - status 200', async ({ request }) => {
    const folderPath = 'public-api/users/GET/200';
    const userService = new UserService(request);

    const { responseData } = await userService.getSearch('John', {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'd.success.search.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
