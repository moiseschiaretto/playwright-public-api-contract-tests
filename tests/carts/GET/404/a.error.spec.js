import { test } from '@playwright/test';
import { CartService } from '@services/CartService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /carts/{id} - carrinho inexistente retorna 404
test('GET /carts/999999 - status 404', async ({ request }) => {
    const folderPath = 'public-api/carts/GET/404';
    const cartService = new CartService(request);

    const { responseData } = await cartService.getId(999999, {
        expectedStatus: 404,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
