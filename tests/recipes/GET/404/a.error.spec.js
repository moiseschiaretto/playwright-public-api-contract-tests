import { test } from '@playwright/test';
import { RecipeService } from '@services/RecipeService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /recipes/{id} - receita inexistente retorna 404
test('GET /recipes/999999 - status 404', async ({ request }) => {
    const folderPath = 'public-api/recipes/GET/404';
    const recipeService = new RecipeService(request);

    const { responseData } = await recipeService.getId(999999, {
        expectedStatus: 404,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
