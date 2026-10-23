const {
    test,
    expect
} = require('@playwright/test');

const {
    UserService
} = require('#services/UserService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData
} = require('#utils/files');

// DELETE /users/{id} - simula exclusão de usuário
test('DELETE /users/1 - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/users/DELETE/200";

    // Cria o serviço de usuários, que sabe montar as chamadas desse recurso
    const userService = new UserService(request);

    // Exclui o usuário de id 1 e confere o status 200
    const {
        responseData
    } = await userService.deleteId({
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
