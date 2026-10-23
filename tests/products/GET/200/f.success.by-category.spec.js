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

// GET /products/category/{category} - filtro por categoria
test('GET /products/category/smartphones - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/products/GET/200";

    // Cria o serviço de produtos, que sabe montar as chamadas desse recurso
    const productService = new ProductService(request);

    // Consulta os produtos da categoria 'smartphones' e confere o status 200
    const {
        responseData
    } = await productService.getByCategory({
        category: 'smartphones',
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'f.success.by-category.json'
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
