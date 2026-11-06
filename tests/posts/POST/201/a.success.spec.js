import { test, expect } from '@playwright/test';
import { PostService } from '@services/PostService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// POST /posts/add - simula criação de post
test('POST /posts/add - status 201', async ({ request }) => {
    const folderPath = 'public-api/posts/POST/201';
    const body = loadJsonFixture('resources/fixtures/public-api/posts/POST/request/valid.json');
    const postService = new PostService(request);

    const { responseData } = await postService.post({
        body,
        expectedStatus: 201,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.title).toBe(body.title);
});
