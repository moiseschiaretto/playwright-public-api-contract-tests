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

// GET /todos/random - tarefa aleatória
test('GET /todos/random - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/todos/GET/200";

    // Cria o serviço de tarefas, que sabe montar as chamadas desse recurso
    const todoService = new TodoService(request);

    // Consulta uma tarefa aleatória e confere o status 200
    const {
        responseData
    } = await todoService.getRandom({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'c.success.random.json'
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
