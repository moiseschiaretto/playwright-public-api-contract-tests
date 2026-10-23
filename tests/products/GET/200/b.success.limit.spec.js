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

// GET /products?limit=5 - paginação com limit e skip
test('GET /products - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/products/GET/200";

    // Cria o serviço de produtos, que sabe montar as chamadas desse recurso
    const productService = new ProductService(request);

    // Consulta 5 produtos, pulando os 10 primeiros, e confere o status 200
    const {
        responseData
    } = await productService.getAllWithPagination({
        limit: 5,
        skip: 10,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'b.success.limit.json'
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
