const {
    test,
    expect
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

// POST /auth/login - autenticação válida retorna accessToken
test('POST /auth/login - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/auth/POST/200";

    // Cria o serviço de autenticação, que sabe montar as chamadas desse recurso
    const authService = new AuthService(request);

    // Faz o login com o usuário e a senha do ambiente e confere o status 200
    const {
        responseData
    } = await authService.postLogin({
        body: {
            username: environment.api.username,
            password: environment.api.password,
            expiresInMins: 60
        },
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

    // Confere se a API devolveu o token de acesso, em formato de texto
    expect(responseData).toHaveProperty('accessToken');
    expect(typeof responseData.accessToken).toBe('string');
});
