import { test } from '@playwright/test';
import { PostService } from '@services/PostService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /posts/{id} - post inexistente retorna 404
test('GET /posts/999999 - status 404', async ({ request }) => {
    const folderPath = 'public-api/posts/GET/404';
    const postService = new PostService(request);

    const { responseData } = await postService.getId(999999, {
        expectedStatus: 404,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
