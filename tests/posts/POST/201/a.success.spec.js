const {
    test,
    expect
} = require('@playwright/test');

const {
    PostService
} = require('#services/PostService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData,
    loadJsonFixture
} = require('#utils/files');

// POST /posts/add - simula criação de post
test('POST /posts/add - status 201', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/posts/POST/201";

    // Cria o serviço de posts, que sabe montar as chamadas desse recurso
    const postService = new PostService(request);

    // Carrega o corpo da requisição (JSON Request) do arquivo
    const body = loadJsonFixture(
        'resources/fixtures/public-api/posts/POST/request/valid.json'
    );

    // Cria um post para o usuário 1 e confere o status 201
    const {
        responseData
    } = await postService.post({
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

    // Confere se a API devolveu o título enviado
    expect(responseData.title).toBe(body.title);
});
