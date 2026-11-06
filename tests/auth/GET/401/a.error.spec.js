import { test } from '@playwright/test';
import { AuthService } from '@services/AuthService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /auth/me - sem token retorna 401
test('GET /auth/me - status 401', async ({ request }) => {
    const folderPath = 'public-api/auth/GET/401';
    const authService = new AuthService(request);

    const { responseData } = await authService.getMe({
        token: null,
        expectedStatus: 401,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
