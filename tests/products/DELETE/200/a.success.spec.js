import { test, expect } from '@playwright/test';
import { ProductService } from '@services/ProductService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// DELETE /products/{id} - simula exclusão de produto
test('DELETE /products/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/products/DELETE/200';
    const productService = new ProductService(request);

    const { responseData } = await productService.deleteId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.isDeleted).toBe(true);
});
