import { BaseService } from '@services/BaseService';
import { ENDPOINT_USERS, ENDPOINT_USERS_ADD, ENDPOINT_USERS_SEARCH } from '@config/endpoints';

// Serviço de usuários: herda post, getAll, getId, putId, patchId e deleteId do BaseService
export class UserService extends BaseService {
    constructor(request) {
        super(request, ENDPOINT_USERS, ENDPOINT_USERS_ADD);
    }

    // GET /users/search?q={termo}
    getSearch(term, { expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: `${ENDPOINT_USERS_SEARCH}${this.buildQuery({ q: term })}`,
            expectedStatus,
            saveResponseLog
        });
    }
}
