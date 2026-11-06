import { test, expect } from '@playwright/test';
import { PostService } from '@services/PostService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// DELETE /posts/{id} - simula exclusão de post
test('DELETE /posts/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/posts/DELETE/200';
    const postService = new PostService(request);

    const { responseData } = await postService.deleteId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.isDeleted).toBe(true);
});
