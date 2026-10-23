const {
    test,
    expect
} = require('@playwright/test');

const {
    UserService
} = require('#services/UserService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData,
    loadJsonFixture
} = require('#utils/files');

// POST /users/add - simula criação de usuário
test('POST /users/add - status 201', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/users/POST/201";

    // Cria o serviço de usuários, que sabe montar as chamadas desse recurso
    const userService = new UserService(request);

    // Carrega o corpo da requisição (JSON Request) do arquivo
    const body = loadJsonFixture(
        'resources/fixtures/public-api/users/POST/request/valid.json'
    );

    // Cria um usuário novo e confere o status 201
    const {
        responseData
    } = await userService.post({
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

    // Confere se a API devolveu o nome enviado
    expect(responseData.firstName).toBe(body.firstName);
});
