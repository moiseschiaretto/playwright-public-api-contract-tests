import { BaseService } from '@services/BaseService';
import { ENDPOINT_CARTS, ENDPOINT_CARTS_ADD, ENDPOINT_CARTS_BY_USER } from '@config/endpoints';

// Serviço de carrinhos: herda post, getAll, getId, putId, patchId e deleteId do BaseService
export class CartService extends BaseService {
    constructor(request) {
        super(request, ENDPOINT_CARTS, ENDPOINT_CARTS_ADD);
    }

    // GET /carts/user/{userId}
    getByUser(userId, { expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_CARTS_BY_USER.replace('{userId}', userId),
            expectedStatus,
            saveResponseLog
        });
    }
}
