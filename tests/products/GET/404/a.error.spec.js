import { test } from '@playwright/test';
import { ProductService } from '@services/ProductService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /products/{id} - produto inexistente retorna 404
test('GET /products/999999 - status 404', async ({ request }) => {
    const folderPath = 'public-api/products/GET/404';
    const productService = new ProductService(request);

    const { responseData } = await productService.getId(999999, {
        expectedStatus: 404,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
