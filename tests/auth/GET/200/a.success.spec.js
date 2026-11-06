import { test } from '@playwright/test';
import { AuthService } from '@services/AuthService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /auth/me - retorna dados do usuário autenticado
test('GET /auth/me - status 200', async ({ request }) => {
    const folderPath = 'public-api/auth/GET/200';
    const authService = new AuthService(request);

    const { responseData } = await authService.getMe({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
