import { test } from '@playwright/test';
import { CartService } from '@services/CartService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /carts/user/{userId} - carrinhos de um usuário
test('GET /carts/user/5 - status 200', async ({ request }) => {
    const folderPath = 'public-api/carts/GET/200';
    const cartService = new CartService(request);

    const { responseData } = await cartService.getByUser(5, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'c.success.by-user.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
