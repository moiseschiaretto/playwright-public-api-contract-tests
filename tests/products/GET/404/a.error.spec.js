const {
    test
} = require('@playwright/test');

const {
    ProductService
} = require('#services/ProductService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData
} = require('#utils/files');

// GET /products/{id} - produto inexistente retorna 404
test('GET /products/999999 - status 404', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/products/GET/404";

    // Cria o serviço de produtos, que sabe montar as chamadas desse recurso
    const productService = new ProductService(request);

    // Consulta um produto que não existe e confere se a API responde 404
    const {
        responseData
    } = await productService.getId({
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
