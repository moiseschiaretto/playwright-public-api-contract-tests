import { test } from '@playwright/test';
import { PostService } from '@services/PostService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /posts - lista paginada de posts
test('GET /posts - status 200', async ({ request }) => {
    const folderPath = 'public-api/posts/GET/200';
    const postService = new PostService(request);

    const { responseData } = await postService.getAll({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
