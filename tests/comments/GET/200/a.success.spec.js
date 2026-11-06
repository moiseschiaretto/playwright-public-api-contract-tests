import { test } from '@playwright/test';
import { CommentService } from '@services/CommentService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /comments - lista paginada de comentários
test('GET /comments - status 200', async ({ request }) => {
    const folderPath = 'public-api/comments/GET/200';
    const commentService = new CommentService(request);

    const { responseData } = await commentService.getAll({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
