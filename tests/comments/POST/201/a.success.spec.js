import { test, expect } from '@playwright/test';
import { CommentService } from '@services/CommentService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// POST /comments/add - simula criação de comentário
test('POST /comments/add - status 201', async ({ request }) => {
    const folderPath = 'public-api/comments/POST/201';
    const body = loadJsonFixture('resources/fixtures/public-api/comments/POST/request/valid.json');
    const commentService = new CommentService(request);

    const { responseData } = await commentService.post({
        body,
        expectedStatus: 201,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.body).toBe(body.body);
});
