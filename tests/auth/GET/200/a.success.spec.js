const {
    test
} = require('@playwright/test');

const {
    AuthService
} = require('#services/AuthService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData
} = require('#utils/files');

// GET /auth/me - retorna dados do usuário autenticado
test('GET /auth/me - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/auth/GET/200";

    // Cria o serviço de autenticação, que sabe montar as chamadas desse recurso
    const authService = new AuthService(request);

    // Consulta o usuário autenticado (com o token do ambiente) e confere o status 200
    const {
        responseData
    } = await authService.getMe({
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
});
