const {
    test
} = require('@playwright/test');

const {
    TodoService
} = require('#services/TodoService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData
} = require('#utils/files');

// GET /todos/{id} - tarefa única
test('GET /todos/1 - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/todos/GET/200";

    // Cria o serviço de tarefas, que sabe montar as chamadas desse recurso
    const todoService = new TodoService(request);

    // Consulta a tarefa de id 1 e confere o status 200
    const {
        responseData
    } = await todoService.getId({
        id: 1,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'b.success.single.json'
    );

    // Valida se a estrutura e os tipos da resposta seguem o contrato
    await validateResponseWithJsonSchema(
        responseData,
        expectedShape,
        {
            validationMode: 'allow-extra'
        }
    );
});
