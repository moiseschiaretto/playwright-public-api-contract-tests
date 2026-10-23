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

// GET /carts/{id} - carrinho inexistente retorna 404
test('GET /carts/999999 - status 404', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/carts/GET/404";

    // Cria o serviço de carrinhos, que sabe montar as chamadas desse recurso
    const cartService = new CartService(request);

    // Consulta um carrinho que não existe e confere se a API responde 404
    const {
        responseData
    } = await cartService.getId({
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
