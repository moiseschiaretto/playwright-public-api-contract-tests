import { test } from '@playwright/test';
import { TodoService } from '@services/TodoService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// GET /todos/random - tarefa aleatória
test('GET /todos/random - status 200', async ({ request }) => {
    const folderPath = 'public-api/todos/GET/200';
    const todoService = new TodoService(request);

    const { responseData } = await todoService.getRandom({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'c.success.random.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });
});
