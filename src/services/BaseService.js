import { makeRequest } from '@utils/requests';
import environment from '@config/environment';

// Classe base de todos os serviços (Page Object Model de API).
// Cada recurso da API (produtos, usuários, carrinhos...) tem o seu serviço,
// que herda daqui os métodos HTTP padrão: post, getAll, getId, putId, patchId e deleteId.
// Leitura (GET) vai sem token; escrita (POST, PUT, PATCH, DELETE) vai com o token do ambiente.
export class BaseService {
    constructor(request, endPoint, endPointAdd = endPoint) {
        this.request = request;
        this.endPoint = endPoint;
        this.endPointAdd = endPointAdd;
    }

    // Único ponto que chama o makeRequest: todos os métodos passam por aqui
    send({ method, endPoint, expectedStatus, saveResponseLog, body = null, token = null }) {
        return makeRequest({
            request: this.request,
            method,
            baseURL: environment.api.base_url,
            endPoint,
            token,
            body,
            expectedStatus,
            showResponseLog: false,
            saveResponseLog
        });
    }

    // Monta a query string a partir de um objeto, ex.: { limit: 5 } -> "?limit=5"
    buildQuery(query) {
        return query ? `?${new URLSearchParams(query)}` : '';
    }

    // POST /{recurso}/add
    post({ body, token = environment.api.token, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'POST',
            endPoint: this.endPointAdd,
            body,
            token,
            expectedStatus,
            saveResponseLog
        });
    }

    // GET /{recurso}
    getAll({ query, token = null, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: `${this.endPoint}${this.buildQuery(query)}`,
            token,
            expectedStatus,
            saveResponseLog
        });
    }

    // GET /{recurso}/{id}
    getId(id, { token = null, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: `${this.endPoint}/${id}`,
            token,
            expectedStatus,
            saveResponseLog
        });
    }

    // PUT /{recurso}/{id}
    putId(id, { body, token = environment.api.token, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'PUT',
            endPoint: `${this.endPoint}/${id}`,
            body,
            token,
            expectedStatus,
            saveResponseLog
        });
    }

    // PATCH /{recurso}/{id}
    patchId(id, { body, token = environment.api.token, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'PATCH',
            endPoint: `${this.endPoint}/${id}`,
            body,
            token,
            expectedStatus,
            saveResponseLog
        });
    }

    // DELETE /{recurso}/{id}
    deleteId(id, { token = environment.api.token, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'DELETE',
            endPoint: `${this.endPoint}/${id}`,
            token,
            expectedStatus,
            saveResponseLog
        });
    }
}
