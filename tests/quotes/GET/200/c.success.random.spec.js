import { test } from '@playwright/test';
import { QuoteService } from '@services/QuoteService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /quotes/random - citação aleatória
test('GET /quotes/random - status 200', async ({ request }) => {
    const folderPath = 'public-api/quotes/GET/200';
    const quoteService = new QuoteService(request);

    const { responseData } = await quoteService.getRandom({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'c.success.random.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
