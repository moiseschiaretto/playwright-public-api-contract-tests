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

// GET /quotes/random - citação aleatória
test('GET /quotes/random - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/quotes/GET/200";

    // Cria o serviço de citações, que sabe montar as chamadas desse recurso
    const quoteService = new QuoteService(request);

    // Consulta uma citação aleatória e confere o status 200
    const {
        responseData
    } = await quoteService.getRandom({
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'c.success.random.json'
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
