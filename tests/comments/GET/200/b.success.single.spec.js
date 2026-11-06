import { test } from '@playwright/test';
import { CommentService } from '@services/CommentService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /comments/{id} - comentário único
test('GET /comments/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/comments/GET/200';
    const commentService = new CommentService(request);

    const { responseData } = await commentService.getId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'b.success.single.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
