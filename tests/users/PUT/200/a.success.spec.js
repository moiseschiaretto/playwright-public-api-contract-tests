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

// PUT /users/{id} - simula atualização de usuário
test('PUT /users/1 - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/users/PUT/200";

    // Cria o serviço de usuários, que sabe montar as chamadas desse recurso
    const userService = new UserService(request);

    // Carrega o corpo da requisição (JSON Request) do arquivo
    const body = loadJsonFixture(
        'resources/fixtures/public-api/users/PUT/request/valid.json'
    );

    // Atualiza o nome do usuário de id 1 e confere o status 200
    const {
        responseData
    } = await userService.putId({
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

    // Confere se a API devolveu o nome atualizado
    expect(responseData.firstName).toBe(body.firstName);
});
