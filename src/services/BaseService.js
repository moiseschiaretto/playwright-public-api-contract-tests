// ============================================================================
// BaseService — classe base do padrão Page Object aplicado a APIs (Service Object)
// ----------------------------------------------------------------------------
// Aqui ficam, escritos uma única vez, o envio das requisições e os métodos
// HTTP comuns a todos os recursos da API:
//
//   post     → POST   /{recurso}/add    cria um registro novo
//   getAll   → GET    /{recurso}        consulta todos os registros
//   getId    → GET    /{recurso}/{id}   consulta um registro específico
//   putId    → PUT    /{recurso}/{id}   atualiza um registro específico
//   patchId  → PATCH  /{recurso}/{id}   atualiza só os campos enviados
//   deleteId → DELETE /{recurso}/{id}   exclui um registro específico
//
// Cada serviço (ProductService, UserService...) herda desta classe, informa
// os seus endpoints e escreve somente os métodos exclusivos do seu recurso.
// ============================================================================
const {
    makeRequest
} = require('#utils/requests');

const environment = require('#config/environment');

class BaseService {
    // request:  contexto de requisição do Playwright, recebido do teste
    // basePath: endpoint principal do recurso (ex.: '/products')
    // addPath:  endpoint de criação (ex.: '/products/add'); null quando o recurso não permite criar
    constructor(request, basePath, addPath = null) {
        this.request = request;
        this.basePath = basePath;
        this.addPath = addPath;
    }

    // Envia a requisição usando o makeRequest do projeto.
    // Preenche o que é igual em todas as chamadas (contexto, URL base e log no console),
    // e recebe do método o que muda (método HTTP, endpoint, status, corpo e token).
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

    // Cria um registro novo. Quem gera o id é a API.
    // Exemplo: post({ body: {...} }) chama POST /products/add
    post({ body, expectedStatus, saveResponseLog }) {
        if (!this.addPath) {
            throw new Error(`O recurso ${this.basePath} não permite criação`);
        }
        return this.send({
            method: 'POST',
            endPoint: this.addPath,
            token: environment.api.token,
            body,
            expectedStatus,
            saveResponseLog
        });
    }

    // Consulta todos os registros do recurso.
    // Exemplo: getAll() chama GET /products
    getAll({ expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: this.basePath,
            expectedStatus,
            saveResponseLog
        });
    }

    // Consulta os registros em páginas: limit = quantos trazer, skip = quantos pular.
    // Exemplo: getAllWithPagination({ limit: 5, skip: 10 }) chama GET /products?limit=5&skip=10
    getAllWithPagination({ limit, skip, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: `${this.basePath}?limit=${limit}&skip=${skip}`,
            expectedStatus,
            saveResponseLog
        });
    }

    // Consulta um registro específico pelo id.
    // Exemplo: getId({ id: 1 }) chama GET /products/1
    getId({ id, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: `${this.basePath}/${id}`,
            expectedStatus,
            saveResponseLog
        });
    }

    // Atualiza um registro específico pelo id.
    // Exemplo: putId({ id: 1, body: {...} }) chama PUT /products/1
    putId({ id, body, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'PUT',
            endPoint: `${this.basePath}/${id}`,
            token: environment.api.token,
            body,
            expectedStatus,
            saveResponseLog
        });
    }

    // Atualiza só os campos enviados de um registro específico (atualização parcial).
    // Exemplo: patchId({ id: 1, body: { title: 'Novo título' } }) chama PATCH /products/1
    patchId({ id, body, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'PATCH',
            endPoint: `${this.basePath}/${id}`,
            token: environment.api.token,
            body,
            expectedStatus,
            saveResponseLog
        });
    }

    // Exclui um registro específico pelo id.
    // Exemplo: deleteId({ id: 1 }) chama DELETE /products/1
    deleteId({ id, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'DELETE',
            endPoint: `${this.basePath}/${id}`,
            token: environment.api.token,
            expectedStatus,
            saveResponseLog
        });
    }
}

module.exports = {
    BaseService
};
