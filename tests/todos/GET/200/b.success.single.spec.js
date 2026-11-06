import { test } from '@playwright/test';
import { TodoService } from '@services/TodoService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /todos/{id} - tarefa única
test('GET /todos/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/todos/GET/200';
    const todoService = new TodoService(request);

    const { responseData } = await todoService.getId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'b.success.single.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
