import { test, expect } from '@playwright/test';
import { TodoService } from '@services/TodoService';
import { validateResponseWithJsonSchema } from '@utils/validators';
import { loadExpectedData } from '@utils/files';

// DELETE /todos/{id} - simula exclusão de tarefa
test('DELETE /todos/1 - status 200', async ({ request }) => {
    const folderPath = 'public-api/todos/DELETE/200';
    const todoService = new TodoService(request);

    const { responseData } = await todoService.deleteId(1, {
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    const expectedShape = loadExpectedData(folderPath, 'a.success.json');
    await validateResponseWithJsonSchema(responseData, expectedShape, { validationMode: 'allow-extra' });

    expect(responseData.isDeleted).toBe(true);
});
