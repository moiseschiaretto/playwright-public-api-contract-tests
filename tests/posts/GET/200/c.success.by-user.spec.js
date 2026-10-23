const {
    test
} = require('@playwright/test');

const {
    PostService
} = require('#services/PostService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData
} = require('#utils/files');

// GET /posts/user/{userId} - posts de um usuário
test('GET /posts/user/5 - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/posts/GET/200";

    // Cria o serviço de posts, que sabe montar as chamadas desse recurso
    const postService = new PostService(request);

    // Consulta os posts do usuário de id 5 e confere o status 200
    const {
        responseData
    } = await postService.getByUser({
        userId: 5,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'c.success.by-user.json'
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
