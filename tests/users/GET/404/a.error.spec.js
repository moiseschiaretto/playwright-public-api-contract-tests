const {
    test
} = require('@playwright/test');

const {
    UserService
} = require('#services/UserService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData
} = require('#utils/files');

// GET /users/{id} - usuário inexistente retorna 404
test('GET /users/999999 - status 404', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/users/GET/404";

    // Cria o serviço de usuários, que sabe montar as chamadas desse recurso
    const userService = new UserService(request);

    // Consulta um usuário que não existe e confere se a API responde 404
    const {
        responseData
    } = await userService.getId({
        id: 999999,
        expectedStatus: 404,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'a.error.json'
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
