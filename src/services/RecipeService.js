import { BaseService } from '@services/BaseService';
import { ENDPOINT_RECIPES, ENDPOINT_RECIPES_SEARCH } from '@config/endpoints';

// Serviço de receitas: herda post, getAll, getId, putId, patchId e deleteId do BaseService
export class RecipeService extends BaseService {
    constructor(request) {
        super(request, ENDPOINT_RECIPES);
    }

    // GET /recipes/search?q={termo}
    getSearch(term, { expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: `${ENDPOINT_RECIPES_SEARCH}${this.buildQuery({ q: term })}`,
            expectedStatus,
            saveResponseLog
        });
    }
}
