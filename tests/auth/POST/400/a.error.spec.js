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

const environment = require('#config/environment');

// POST /auth/login - senha incorreta retorna 400
test('POST /auth/login - status 400', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/auth/POST/400";

    // Cria o serviço de autenticação, que sabe montar as chamadas desse recurso
    const authService = new AuthService(request);

    // Tenta o login com senha errada e confere se a API recusa com status 400
    const {
        responseData
    } = await authService.postLogin({
        body: {
            username: environment.api.username,
            password: 'senha-errada-de-proposito'
        },
        expectedStatus: 400,
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
