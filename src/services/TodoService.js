// ============================================================================
// TodoService — tarefas
// ----------------------------------------------------------------------------
// O CRUD (post, getAll, getId, putId, patchId e deleteId) vem do BaseService.
// Aqui fica só o endpoint exclusivo de tarefas: tarefa aleatória.
// ============================================================================
const {
    BaseService
} = require('#services/BaseService');

const {
    ENDPOINT_TODOS,
    ENDPOINT_TODOS_ADD,
    ENDPOINT_TODOS_RANDOM
} = require('#config/endpoints');

class TodoService extends BaseService {
    // Informa ao BaseService o endpoint principal (/todos) e o de criação (/todos/add)
    constructor(request) {
        super(request, ENDPOINT_TODOS, ENDPOINT_TODOS_ADD);
    }

    // Consulta uma tarefa aleatória.
    // Exemplo: getRandom() chama GET /todos/random
    getRandom({ expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_TODOS_RANDOM,
            expectedStatus,
            saveResponseLog
        });
    }
}

module.exports = {
    TodoService
};
