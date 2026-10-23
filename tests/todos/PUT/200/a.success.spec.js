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

// PUT /todos/{id} - simula conclusão de tarefa
test('PUT /todos/1 - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/todos/PUT/200";

    // Cria o serviço de tarefas, que sabe montar as chamadas desse recurso
    const todoService = new TodoService(request);

    // Carrega o corpo da requisição (JSON Request) do arquivo
    const body = loadJsonFixture(
        'resources/fixtures/public-api/todos/PUT/request/valid.json'
    );

    // Marca a tarefa de id 1 como concluída e confere o status 200
    const {
        responseData
    } = await todoService.putId({
        id: 1,
        body,
        expectedStatus: 200,
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

    // Confere se a tarefa voltou como concluída
    expect(responseData.completed).toBe(body.completed);
});
