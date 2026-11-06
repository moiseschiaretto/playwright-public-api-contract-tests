import { test } from '@playwright/test';
import { PostService } from '@services/PostService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /posts/{id} - post único
test('GET /posts/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/posts/GET/200';
    const postService = new PostService(request);

    const { responseData } = await postService.getId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'b.success.single.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
