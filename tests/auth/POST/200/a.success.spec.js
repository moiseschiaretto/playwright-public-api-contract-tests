import { test, expect } from '@playwright/test';
import { AuthService } from '@services/AuthService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';
import environment from '@config/environment';

// POST /auth/login - autenticação válida retorna accessToken
test('POST /auth/login - status 200', async ({ request }) => {
    const folderPath = 'public-api/auth/POST/200';
    const authService = new AuthService(request);

    const { responseData } = await authService.postLogin({
        body: {
            username: environment.api.username,
            password: environment.api.password,
            expiresInMins: 60
        },
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData).toHaveProperty('accessToken');
    expect(typeof responseData.accessToken).toBe('string');
});
