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

// GET /users?limit=5&skip=10 - paginação
test('GET /users - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/users/GET/200";

    // Cria o serviço de usuários, que sabe montar as chamadas desse recurso
    const userService = new UserService(request);

    // Consulta 5 usuários, pulando os 10 primeiros, e confere o status 200
    const {
        responseData
    } = await userService.getAllWithPagination({
        limit: 5,
        skip: 10,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'b.success.limit.json'
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
