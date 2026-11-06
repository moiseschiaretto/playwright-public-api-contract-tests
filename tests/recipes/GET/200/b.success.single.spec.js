import { test } from '@playwright/test';
import { RecipeService } from '@services/RecipeService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /recipes/{id} - receita única
test('GET /recipes/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/recipes/GET/200';
    const recipeService = new RecipeService(request);

    const { responseData } = await recipeService.getId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'b.success.single.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
