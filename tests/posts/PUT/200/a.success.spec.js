import { test, expect } from '@playwright/test';
import { PostService } from '@services/PostService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// PUT /posts/{id} - simula atualização de post
test('PUT /posts/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/posts/PUT/200';
    const body = loadJsonFixture('resources/fixtures/public-api/posts/PUT/request/valid.json');
    const postService = new PostService(request);

    const { responseData } = await postService.putId(1, {
        body,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.title).toBe(body.title);
});
