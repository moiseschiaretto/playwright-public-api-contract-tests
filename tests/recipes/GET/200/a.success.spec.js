import { test } from '@playwright/test';
import { RecipeService } from '@services/RecipeService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /recipes - lista paginada de receitas
test('GET /recipes - status 200', async ({ request }) => {
    const folderPath = 'public-api/recipes/GET/200';
    const recipeService = new RecipeService(request);

    const { responseData } = await recipeService.getAll({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
