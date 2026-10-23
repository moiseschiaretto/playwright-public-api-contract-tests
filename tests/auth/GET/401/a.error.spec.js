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

// GET /auth/me - sem token retorna 401
test('GET /auth/me - status 401', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/auth/GET/401";

    // Cria o serviço de autenticação, que sabe montar as chamadas desse recurso
    const authService = new AuthService(request);

    // Consulta o usuário SEM token e confere se a API recusa com status 401
    const {
        responseData
    } = await authService.getMe({
        token: null,
        expectedStatus: 401,
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
