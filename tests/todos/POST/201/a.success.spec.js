import { test, expect } from '@playwright/test';
import { TodoService } from '@services/TodoService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// POST /todos/add - simula criação de tarefa
test('POST /todos/add - status 201', async ({ request }) => {
    const folderPath = 'public-api/todos/POST/201';
    const body = loadJsonFixture('resources/fixtures/public-api/todos/POST/request/valid.json');
    const todoService = new TodoService(request);

    const { responseData } = await todoService.post({
        body,
        expectedStatus: 201,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.todo).toBe(body.todo);
});
