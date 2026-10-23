const {
    test,
    expect
} = require('@playwright/test');

const {
    ProductService
} = require('#services/ProductService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData,
    loadJsonFixture
} = require('#utils/files');

// POST /products/add - simula criação de produto
test('POST /products/add - status 201', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/products/POST/201";

    // Cria o serviço de produtos, que sabe montar as chamadas desse recurso
    const productService = new ProductService(request);

    // Carrega o corpo da requisição (JSON Request) do arquivo
    const body = loadJsonFixture(
        'resources/fixtures/public-api/products/POST/request/valid.json'
    );

    // Cria um produto novo e confere o status 201
    const {
        responseData
    } = await productService.post({
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

    // Confere se a API devolveu o título enviado
    expect(responseData.title).toBe(body.title);
});
