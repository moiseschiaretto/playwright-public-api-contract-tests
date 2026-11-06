import { test } from '@playwright/test';
import { QuoteService } from '@services/QuoteService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /quotes - lista paginada de citações
test('GET /quotes - status 200', async ({ request }) => {
    const folderPath = 'public-api/quotes/GET/200';
    const quoteService = new QuoteService(request);

    const { responseData } = await quoteService.getAll({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
