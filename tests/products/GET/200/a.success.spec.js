import { test } from '@playwright/test';
import { ProductService } from '@services/ProductService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /products - lista paginada de produtos
test('GET /products - status 200', async ({ request }) => {
    const folderPath = 'public-api/products/GET/200';
    const productService = new ProductService(request);

    const { responseData } = await productService.getAll({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
