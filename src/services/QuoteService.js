import { BaseService } from '@services/BaseService';
import { ENDPOINT_QUOTES, ENDPOINT_QUOTES_RANDOM } from '@config/endpoints';

// Serviço de citações: herda post, getAll, getId, putId, patchId e deleteId do BaseService
export class QuoteService extends BaseService {
    constructor(request) {
        super(request, ENDPOINT_QUOTES);
    }

    // GET /quotes/random
    getRandom({ expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_QUOTES_RANDOM,
            expectedStatus,
            saveResponseLog
        });
    }
}
