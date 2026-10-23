const {
    test,
    expect
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

// DELETE /carts/{id} - simula exclusão de carrinho
test('DELETE /carts/1 - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/carts/DELETE/200";

    // Cria o serviço de carrinhos, que sabe montar as chamadas desse recurso
    const cartService = new CartService(request);

    // Exclui o carrinho de id 1 e confere o status 200
    const {
        responseData
    } = await cartService.deleteId({
        id: 1,
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

    // Confere se a API marcou o registro como excluído
    expect(responseData.isDeleted).toBe(true);
});
