const {
    test
} = require('@playwright/test');

const {
    CartService
} = require('#services/CartService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData
} = require('#utils/files');

// GET /carts - lista paginada de carrinhos
test('GET /carts - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/carts/GET/200";

    // Cria o serviço de carrinhos, que sabe montar as chamadas desse recurso
    const cartService = new CartService(request);

    // Consulta todos os carrinhos e confere o status 200
    const {
        responseData
    } = await cartService.getAll({
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
});
