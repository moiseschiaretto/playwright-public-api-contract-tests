import { test } from '@playwright/test';
import { RecipeService } from '@services/RecipeService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /recipes/search?q= - busca por termo
test('GET /recipes/search - status 200', async ({ request }) => {
    const folderPath = 'public-api/recipes/GET/200';
    const recipeService = new RecipeService(request);

    const { responseData } = await recipeService.getSearch('chicken', {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'c.success.search.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
