const {
    test,
    expect
} = require('@playwright/test');

const {
    CommentService
} = require('#services/CommentService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData,
    loadJsonFixture
} = require('#utils/files');

// POST /comments/add - simula criação de comentário
test('POST /comments/add - status 201', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/comments/POST/201";

    // Cria o serviço de comentários, que sabe montar as chamadas desse recurso
    const commentService = new CommentService(request);

    // Carrega o corpo da requisição (JSON Request) do arquivo
    const body = loadJsonFixture(
        'resources/fixtures/public-api/comments/POST/request/valid.json'
    );

    // Cria um comentário no post 1 e confere o status 201
    const {
        responseData
    } = await commentService.post({
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

    // Confere se a API devolveu o texto enviado
    expect(responseData.body).toBe(body.body);
});
