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
    loadExpectedData,
    loadJsonFixture
} = require('#utils/files');

// PUT /carts/{id} - simula atualização de carrinho
test('PUT /carts/1 - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/carts/PUT/200";

    // Cria o serviço de carrinhos, que sabe montar as chamadas desse recurso
    const cartService = new CartService(request);

    // Carrega o corpo da requisição (JSON Request) do arquivo
    const body = loadJsonFixture(
        'resources/fixtures/public-api/carts/PUT/request/valid.json'
    );

    // Atualiza o carrinho de id 1, somando 1 unidade do produto 2, e confere o status 200
    const {
        responseData
    } = await cartService.putId({
        id: 1,
        body,
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
