// ============================================================================
// CartService — carrinhos
// ----------------------------------------------------------------------------
// O CRUD (post, getAll, getId, putId, patchId e deleteId) vem do BaseService.
// Aqui fica só o endpoint exclusivo de carrinhos: consulta por usuário.
// ============================================================================
const {
    BaseService
} = require('#services/BaseService');

const {
    ENDPOINT_CARTS,
    ENDPOINT_CARTS_ADD,
    ENDPOINT_CARTS_BY_USER
} = require('#config/endpoints');

class CartService extends BaseService {
    // Informa ao BaseService o endpoint principal (/carts) e o de criação (/carts/add)
    constructor(request) {
        super(request, ENDPOINT_CARTS, ENDPOINT_CARTS_ADD);
    }

    // Consulta os carrinhos de um usuário.
    // Exemplo: getByUser({ userId: 5 }) chama GET /carts/user/5
    getByUser({ userId, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_CARTS_BY_USER.replace('{userId}', userId),
            expectedStatus,
            saveResponseLog
        });
    }
}

module.exports = {
    CartService
};
