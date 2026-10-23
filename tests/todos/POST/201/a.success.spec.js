const {
    test,
    expect
} = require('@playwright/test');

const {
    TodoService
} = require('#services/TodoService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData,
    loadJsonFixture
} = require('#utils/files');

// POST /todos/add - simula criação de tarefa
test('POST /todos/add - status 201', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/todos/POST/201";

    // Cria o serviço de tarefas, que sabe montar as chamadas desse recurso
    const todoService = new TodoService(request);

    // Carrega o corpo da requisição (JSON Request) do arquivo
    const body = loadJsonFixture(
        'resources/fixtures/public-api/todos/POST/request/valid.json'
    );

    // Cria uma tarefa para o usuário 1 e confere o status 201
    const {
        responseData
    } = await todoService.post({
        body,
        expectedStatus: 201,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'a.success.json'
    );

    // Valida se a estrutura e os tipos da resposta seguem o contrato
    await validateResponseWithJsonSchema(
        responseData,
        expectedShape,
        {
            validationMode: 'allow-extra'
        }
    );

    // Confere se a API devolveu a descrição enviada
    expect(responseData.todo).toBe(body.todo);
});
