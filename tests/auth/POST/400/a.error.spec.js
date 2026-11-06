import { test } from '@playwright/test';
import { AuthService } from '@services/AuthService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';
import environment from '@config/environment';

// POST /auth/login - senha incorreta retorna 400
test('POST /auth/login - status 400', async ({ request }) => {
    const folderPath = 'public-api/auth/POST/400';
    const authService = new AuthService(request);

    const { responseData } = await authService.postLogin({
        body: {
            username: environment.api.username,
            password: environment.api.password_invalid
        },
        expectedStatus: 400,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
