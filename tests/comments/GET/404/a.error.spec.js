import { test } from '@playwright/test';
import { CommentService } from '@services/CommentService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /comments/{id} - comentário inexistente retorna 404
test('GET /comments/999999 - status 404', async ({ request }) => {
    const folderPath = 'public-api/comments/GET/404';
    const commentService = new CommentService(request);

    const { responseData } = await commentService.getId(999999, {
        expectedStatus: 404,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
