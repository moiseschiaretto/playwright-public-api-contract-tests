import { test } from '@playwright/test';
import { QuoteService } from '@services/QuoteService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /quotes/{id} - citação inexistente retorna 404
test('GET /quotes/999999 - status 404', async ({ request }) => {
    const folderPath = 'public-api/quotes/GET/404';
    const quoteService = new QuoteService(request);

    const { responseData } = await quoteService.getId(999999, {
        expectedStatus: 404,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
