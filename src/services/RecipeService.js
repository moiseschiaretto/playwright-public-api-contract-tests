// ============================================================================
// RecipeService — receitas
// ----------------------------------------------------------------------------
// Recurso só de consulta: a API não tem endpoint de criação de receitas.
// As consultas getAll e getId vêm do BaseService.
// Aqui fica só o endpoint exclusivo de receitas: busca.
// ============================================================================
const {
    BaseService
} = require('#services/BaseService');

const {
    ENDPOINT_RECIPES,
    ENDPOINT_RECIPES_SEARCH
} = require('#config/endpoints');

class RecipeService extends BaseService {
    // Informa ao BaseService só o endpoint principal (/recipes), sem endpoint de criação
    constructor(request) {
        super(request, ENDPOINT_RECIPES);
    }

    // Busca receitas por um termo.
    // Exemplo: getSearch({ term: 'chicken' }) chama GET /recipes/search?q=chicken
    getSearch({ term, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: `${ENDPOINT_RECIPES_SEARCH}?q=${term}`,
            expectedStatus,
            saveResponseLog
        });
    }
}

module.exports = {
    RecipeService
};
