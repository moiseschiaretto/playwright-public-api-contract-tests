const {
    test
} = require('@playwright/test');

const {
    CommentService
} = require('#services/CommentService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData
} = require('#utils/files');

// GET /comments/{id} - comentário único
test('GET /comments/1 - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/comments/GET/200";

    // Cria o serviço de comentários, que sabe montar as chamadas desse recurso
    const commentService = new CommentService(request);

    // Consulta o comentário de id 1 e confere o status 200
    const {
        responseData
    } = await commentService.getId({
        id: 1,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'b.success.single.json'
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
