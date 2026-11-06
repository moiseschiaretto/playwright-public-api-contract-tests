import { test, expect } from '@playwright/test';
import { CartService } from '@services/CartService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// DELETE /carts/{id} - simula exclusão de carrinho
test('DELETE /carts/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/carts/DELETE/200';
    const cartService = new CartService(request);

    const { responseData } = await cartService.deleteId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.isDeleted).toBe(true);
});
