import { BaseService } from '@services/BaseService';
import { ENDPOINT_POSTS, ENDPOINT_POSTS_ADD, ENDPOINT_POSTS_BY_USER } from '@config/endpoints';

// Serviço de posts: herda post, getAll, getId, putId, patchId e deleteId do BaseService
export class PostService extends BaseService {
    constructor(request) {
        super(request, ENDPOINT_POSTS, ENDPOINT_POSTS_ADD);
    }

    // GET /posts/user/{userId}
    getByUser(userId, { expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_POSTS_BY_USER.replace('{userId}', userId),
            expectedStatus,
            saveResponseLog
        });
    }
}
