import { test } from '@playwright/test';
import { PostService } from '@services/PostService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /posts/user/{userId} - posts de um usuário
test('GET /posts/user/5 - status 200', async ({ request }) => {
    const folderPath = 'public-api/posts/GET/200';
    const postService = new PostService(request);

    const { responseData } = await postService.getByUser(5, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'c.success.by-user.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
