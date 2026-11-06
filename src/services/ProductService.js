import { BaseService } from '@services/BaseService';
import { ENDPOINT_PRODUCTS, ENDPOINT_PRODUCTS_ADD, ENDPOINT_PRODUCTS_SEARCH, ENDPOINT_PRODUCTS_CATEGORIES, ENDPOINT_PRODUCTS_BY_CATEGORY } from '@config/endpoints';

// Serviço de produtos: herda post, getAll, getId, putId, patchId e deleteId do BaseService
export class ProductService extends BaseService {
    constructor(request) {
        super(request, ENDPOINT_PRODUCTS, ENDPOINT_PRODUCTS_ADD);
    }

    // GET /products/search?q={termo}
    getSearch(term, { expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: `${ENDPOINT_PRODUCTS_SEARCH}${this.buildQuery({ q: term })}`,
            expectedStatus,
            saveResponseLog
        });
    }

    // GET /products/categories
    getCategories({ expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_PRODUCTS_CATEGORIES,
            expectedStatus,
            saveResponseLog
        });
    }

    // GET /products/category/{category}
    getByCategory(category, { expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_PRODUCTS_BY_CATEGORY.replace('{category}', category),
            expectedStatus,
            saveResponseLog
        });
    }
}
