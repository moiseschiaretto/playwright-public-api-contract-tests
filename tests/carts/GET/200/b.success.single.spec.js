import { test } from '@playwright/test';
import { CartService } from '@services/CartService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /carts/{id} - carrinho único
test('GET /carts/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/carts/GET/200';
    const cartService = new CartService(request);

    const { responseData } = await cartService.getId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'b.success.single.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
