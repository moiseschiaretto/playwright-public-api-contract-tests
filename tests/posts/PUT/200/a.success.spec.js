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

// PUT /posts/{id} - simula atualização de post
test('PUT /posts/1 - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/posts/PUT/200";

    // Cria o serviço de posts, que sabe montar as chamadas desse recurso
    const postService = new PostService(request);

    // Carrega o corpo da requisição (JSON Request) do arquivo
    const body = loadJsonFixture(
        'resources/fixtures/public-api/posts/PUT/request/valid.json'
    );

    // Atualiza o título do post de id 1 e confere o status 200
    const {
        responseData
    } = await postService.putId({
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

    // Confere se a API devolveu o título atualizado
    expect(responseData.title).toBe(body.title);
});
