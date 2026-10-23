// ============================================================================
// QuoteService — citações
// ----------------------------------------------------------------------------
// Recurso só de consulta: a API não tem endpoint de criação de citações.
// As consultas getAll e getId vêm do BaseService.
// Aqui fica só o endpoint exclusivo de citações: citação aleatória.
// ============================================================================
const {
    BaseService
} = require('#services/BaseService');

const {
    ENDPOINT_QUOTES,
    ENDPOINT_QUOTES_RANDOM
} = require('#config/endpoints');

class QuoteService extends BaseService {
    // Informa ao BaseService só o endpoint principal (/quotes), sem endpoint de criação
    constructor(request) {
        super(request, ENDPOINT_QUOTES);
    }

    // Consulta uma citação aleatória.
    // Exemplo: getRandom() chama GET /quotes/random
    getRandom({ expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_QUOTES_RANDOM,
            expectedStatus,
            saveResponseLog
        });
    }
}

module.exports = {
    QuoteService
};
