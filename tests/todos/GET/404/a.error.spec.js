import { test } from '@playwright/test';
import { TodoService } from '@services/TodoService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /todos/{id} - tarefa inexistente retorna 404
test('GET /todos/999999 - status 404', async ({ request }) => {
    const folderPath = 'public-api/todos/GET/404';
    const todoService = new TodoService(request);

    const { responseData } = await todoService.getId(999999, {
        expectedStatus: 404,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.error.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
