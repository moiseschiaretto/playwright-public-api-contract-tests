import { BaseService } from '@services/BaseService';
import { ENDPOINT_COMMENTS, ENDPOINT_COMMENTS_ADD } from '@config/endpoints';

// Serviço de comentários: herda post, getAll, getId, putId, patchId e deleteId do BaseService
export class CommentService extends BaseService {
    constructor(request) {
        super(request, ENDPOINT_COMMENTS, ENDPOINT_COMMENTS_ADD);
    }
}
