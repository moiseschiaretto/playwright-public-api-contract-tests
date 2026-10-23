// ============================================================================
// PostService — posts
// ----------------------------------------------------------------------------
// O CRUD (post, getAll, getId, putId, patchId e deleteId) vem do BaseService.
// Aqui fica só o endpoint exclusivo de posts: consulta por usuário.
// ============================================================================
const {
    BaseService
} = require('#services/BaseService');

const {
    ENDPOINT_POSTS,
    ENDPOINT_POSTS_ADD,
    ENDPOINT_POSTS_BY_USER
} = require('#config/endpoints');

class PostService extends BaseService {
    // Informa ao BaseService o endpoint principal (/posts) e o de criação (/posts/add)
    constructor(request) {
        super(request, ENDPOINT_POSTS, ENDPOINT_POSTS_ADD);
    }

    // Consulta os posts de um usuário.
    // Exemplo: getByUser({ userId: 5 }) chama GET /posts/user/5
    getByUser({ userId, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_POSTS_BY_USER.replace('{userId}', userId),
            expectedStatus,
            saveResponseLog
        });
    }
}

module.exports = {
    PostService
};
