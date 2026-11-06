import { test } from '@playwright/test';
import { CartService } from '@services/CartService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// PUT /carts/{id} - simula atualização de carrinho
test('PUT /carts/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/carts/PUT/200';
    const body = loadJsonFixture('resources/fixtures/public-api/carts/PUT/request/valid.json');
    const cartService = new CartService(request);

    const { responseData } = await cartService.putId(1, {
        body,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
