import { test } from '@playwright/test';
import { QuoteService } from '@services/QuoteService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /quotes/{id} - citação única
test('GET /quotes/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/quotes/GET/200';
    const quoteService = new QuoteService(request);

    const { responseData } = await quoteService.getId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'b.success.single.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
