// ============================================================================
// CommentService — comentários
// ----------------------------------------------------------------------------
// O CRUD (post, getAll, getId, putId, patchId e deleteId) vem do BaseService.
// Comentários não têm endpoints exclusivos, por isso a classe só informa os endpoints.
// ============================================================================
const {
    BaseService
} = require('#services/BaseService');

const {
    ENDPOINT_COMMENTS,
    ENDPOINT_COMMENTS_ADD
} = require('#config/endpoints');

class CommentService extends BaseService {
    // Informa ao BaseService o endpoint principal (/comments) e o de criação (/comments/add)
    constructor(request) {
        super(request, ENDPOINT_COMMENTS, ENDPOINT_COMMENTS_ADD);
    }
}

module.exports = {
    CommentService
};
