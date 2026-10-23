const {
    test
} = require('@playwright/test');

const {
    RecipeService
} = require('#services/RecipeService');

const {
    validateResponseWithJsonSchema
} = require('#utils/validators');

const {
    loadExpectedData
} = require('#utils/files');

// GET /recipes/{id} - receita única
test('GET /recipes/1 - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/recipes/GET/200";

    // Cria o serviço de receitas, que sabe montar as chamadas desse recurso
    const recipeService = new RecipeService(request);

    // Consulta a receita de id 1 e confere o status 200
    const {
        responseData
    } = await recipeService.getId({
        id: 1,
        expectedStatus: 200,
        saveResponseLog: folderPath
    });

    // Carrega o JSON de referência (contrato) para comparar com a resposta
    const expectedShape = loadExpectedData(
        folderPath,
        'b.success.single.json'
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
