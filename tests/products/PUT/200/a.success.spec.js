import { test, expect } from '@playwright/test';
import { ProductService } from '@services/ProductService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// PUT /products/{id} - simula atualização de produto
test('PUT /products/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/products/PUT/200';
    const body = loadJsonFixture('resources/fixtures/public-api/products/PUT/request/valid.json');
    const productService = new ProductService(request);

    const { responseData } = await productService.putId(1, {
        body,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.title).toBe(body.title);
});
