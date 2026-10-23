const {
    test
} = require('@playwright/test');

const {
    QuoteService
} = require('#services/QuoteService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData
} = require('#utils/files');

// GET /quotes/{id} - citação inexistente retorna 404
test('GET /quotes/999999 - status 404', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/quotes/GET/404";

    // Cria o serviço de citações, que sabe montar as chamadas desse recurso
    const quoteService = new QuoteService(request);

    // Consulta uma citação que não existe e confere se a API responde 404
    const {
        responseData
    } = await quoteService.getId({
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
