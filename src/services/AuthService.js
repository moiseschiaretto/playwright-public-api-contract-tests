import { BaseService } from '@services/BaseService';
import { ENDPOINT_AUTH_LOGIN, ENDPOINT_AUTH_ME } from '@config/endpoints';
import environment from '@config/environment';

// Serviço de autenticação: /auth/login e /auth/me
export class AuthService extends BaseService {
    constructor(request) {
        super(request, ENDPOINT_AUTH_LOGIN);
    }

    // POST /auth/login
    postLogin({ body, token = environment.api.token, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'POST',
            endPoint: ENDPOINT_AUTH_LOGIN,
            body,
            token,
            expectedStatus,
            saveResponseLog
        });
    }

    // GET /auth/me
    getMe({ token = environment.api.token, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_AUTH_ME,
            token,
            expectedStatus,
            saveResponseLog
        });
    }
}
