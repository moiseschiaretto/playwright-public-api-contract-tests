import { test } from '@playwright/test';
import { ProductService } from '@services/ProductService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /products/search?q= - busca por termo
test('GET /products/search - status 200', async ({ request }) => {
    const folderPath = 'public-api/products/GET/200';
    const productService = new ProductService(request);

    const { responseData } = await productService.getSearch('phone', {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'd.success.search.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
