import { test } from '@playwright/test';
import { TodoService } from '@services/TodoService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /todos - lista paginada de tarefas
test('GET /todos - status 200', async ({ request }) => {
    const folderPath = 'public-api/todos/GET/200';
    const todoService = new TodoService(request);

    const { responseData } = await todoService.getAll({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
