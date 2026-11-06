import { test, expect } from '@playwright/test';
import { ProductService } from '@services/ProductService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// POST /products/add - simula criação de produto
test('POST /products/add - status 201', async ({ request }) => {
    const folderPath = 'public-api/products/POST/201';
    const body = loadJsonFixture('resources/fixtures/public-api/products/POST/request/valid.json');
    const productService = new ProductService(request);

    const { responseData } = await productService.post({
        body,
        expectedStatus: 201,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.title).toBe(body.title);
});
