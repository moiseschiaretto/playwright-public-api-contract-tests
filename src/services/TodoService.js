import { BaseService } from '@services/BaseService';
import { ENDPOINT_TODOS, ENDPOINT_TODOS_ADD, ENDPOINT_TODOS_RANDOM } from '@config/endpoints';

// Serviço de tarefas: herda post, getAll, getId, putId, patchId e deleteId do BaseService
export class TodoService extends BaseService {
    constructor(request) {
        super(request, ENDPOINT_TODOS, ENDPOINT_TODOS_ADD);
    }

    // GET /todos/random
    getRandom({ expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_TODOS_RANDOM,
            expectedStatus,
            saveResponseLog
        });
    }
}
