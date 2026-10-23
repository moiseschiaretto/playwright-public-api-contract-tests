// ============================================================================
// UserService — usuários
// ----------------------------------------------------------------------------
// O CRUD (post, getAll, getId, putId, patchId e deleteId) vem do BaseService.
// Aqui fica só o endpoint exclusivo de usuários: busca.
// ============================================================================
const {
    BaseService
} = require('#services/BaseService');

const {
    ENDPOINT_USERS,
    ENDPOINT_USERS_ADD,
    ENDPOINT_USERS_SEARCH
} = require('#config/endpoints');

class UserService extends BaseService {
    // Informa ao BaseService o endpoint principal (/users) e o de criação (/users/add)
    constructor(request) {
        super(request, ENDPOINT_USERS, ENDPOINT_USERS_ADD);
    }

    // Busca usuários por um termo.
    // Exemplo: getSearch({ term: 'John' }) chama GET /users/search?q=John
    getSearch({ term, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: `${ENDPOINT_USERS_SEARCH}?q=${term}`,
            expectedStatus,
            saveResponseLog
        });
    }
}

module.exports = {
    UserService
};
