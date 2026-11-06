import { test } from '@playwright/test';
import { CartService } from '@services/CartService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// POST /carts/add - simula criação de carrinho
test('POST /carts/add - status 201', async ({ request }) => {
    const folderPath = 'public-api/carts/POST/201';
    const body = loadJsonFixture('resources/fixtures/public-api/carts/POST/request/valid.json');
    const cartService = new CartService(request);

    const { responseData } = await cartService.post({
        body,
        expectedStatus: 201,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
