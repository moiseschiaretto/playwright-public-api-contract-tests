import { test } from '@playwright/test';
import { CartService } from '@services/CartService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /carts - lista paginada de carrinhos
test('GET /carts - status 200', async ({ request }) => {
    const folderPath = 'public-api/carts/GET/200';
    const cartService = new CartService(request);

    const { responseData } = await cartService.getAll({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
