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

// GET /comments/{id} - comentário inexistente retorna 404
test('GET /comments/999999 - status 404', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/comments/GET/404";

    // Cria o serviço de comentários, que sabe montar as chamadas desse recurso
    const commentService = new CommentService(request);

    // Consulta um comentário que não existe e confere se a API responde 404
    const {
        responseData
    } = await commentService.getId({
        id: 999999,
        expectedStatus: 404,
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
