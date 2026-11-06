import { test, expect } from '@playwright/test';
import { TodoService } from '@services/TodoService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData, loadJsonFixture } from '@utils/files';

// PUT /todos/{id} - simula conclusão de tarefa
test('PUT /todos/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/todos/PUT/200';
    const body = loadJsonFixture('resources/fixtures/public-api/todos/PUT/request/valid.json');
    const todoService = new TodoService(request);

    const { responseData } = await todoService.putId(1, {
        body,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.completed).toBe(body.completed);
});
