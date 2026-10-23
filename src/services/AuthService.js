// ============================================================================
// AuthService — autenticação na API
// ----------------------------------------------------------------------------
// A autenticação não usa o CRUD padrão do BaseService.
// Usa somente os dois métodos abaixo: login e consulta do usuário autenticado.
// ============================================================================
const {
    BaseService
} = require('#services/BaseService');

const environment = require('#config/environment');

const {
    ENDPOINT_AUTH_LOGIN,
    ENDPOINT_AUTH_ME
} = require('#config/endpoints');

class AuthService extends BaseService {
    constructor(request) {
        super(request, null);
    }

    // Faz o login com usuário e senha enviados no corpo.
    // Exemplo: postLogin({ body: { username, password } }) chama POST /auth/login
    postLogin({ body, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'POST',
            endPoint: ENDPOINT_AUTH_LOGIN,
            token: environment.api.token,
            body,
            expectedStatus,
            saveResponseLog
        });
    }

    // Consulta os dados do usuário autenticado.
    // Por padrão envia o token do ambiente; informe token: null para testar sem token.
    // Exemplo: getMe({ token: null }) chama GET /auth/me sem o cabeçalho Authorization
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

module.exports = {
    AuthService
};
