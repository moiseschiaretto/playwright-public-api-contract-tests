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

// GET /recipes - lista paginada de receitas
test('GET /recipes - status 200', async ({ request }) => {
    // Pasta onde fica o contrato esperado e onde o log da resposta será salvo
    const folderPath = "public-api/recipes/GET/200";

    // Cria o serviço de receitas, que sabe montar as chamadas desse recurso
    const recipeService = new RecipeService(request);

    // Consulta todas as receitas e confere o status 200
    const {
        responseData
    } = await recipeService.getAll({
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
