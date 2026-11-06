import { test } from '@playwright/test';
import { ProductService } from '@services/ProductService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /products?limit=5 - paginação com limit e skip
test('GET /products - status 200', async ({ request }) => {
    const folderPath = 'public-api/products/GET/200';
    const productService = new ProductService(request);

    const { responseData } = await productService.getAll({
        query: { limit: 5, skip: 10 },
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'b.success.limit.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
