import { test } from '@playwright/test';
import { ProductService } from '@services/ProductService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /products/categories - lista de categorias
test('GET /products/categories - status 200', async ({ request }) => {
    const folderPath = 'public-api/products/GET/200';
    const productService = new ProductService(request);

    const { responseData } = await productService.getCategories({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'e.success.categories.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
