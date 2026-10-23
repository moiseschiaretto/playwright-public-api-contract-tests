// ============================================================================
// ProductService — produtos
// ----------------------------------------------------------------------------
// O CRUD (post, getAll, getId, putId, patchId e deleteId) vem do BaseService.
// Aqui ficam só os endpoints exclusivos de produtos: busca e categorias.
// ============================================================================
const {
    BaseService
} = require('#services/BaseService');

const {
    ENDPOINT_PRODUCTS,
    ENDPOINT_PRODUCTS_ADD,
    ENDPOINT_PRODUCTS_SEARCH,
    ENDPOINT_PRODUCTS_CATEGORIES,
    ENDPOINT_PRODUCTS_BY_CATEGORY
} = require('#config/endpoints');

class ProductService extends BaseService {
    // Informa ao BaseService o endpoint principal (/products) e o de criação (/products/add)
    constructor(request) {
        super(request, ENDPOINT_PRODUCTS, ENDPOINT_PRODUCTS_ADD);
    }

    // Busca produtos por um termo.
    // Exemplo: getSearch({ term: 'phone' }) chama GET /products/search?q=phone
    getSearch({ term, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: `${ENDPOINT_PRODUCTS_SEARCH}?q=${term}`,
            expectedStatus,
            saveResponseLog
        });
    }

    // Consulta a lista de categorias de produtos.
    // Exemplo: getCategories() chama GET /products/categories
    getCategories({ expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_PRODUCTS_CATEGORIES,
            expectedStatus,
            saveResponseLog
        });
    }

    // Consulta os produtos de uma categoria.
    // Exemplo: getByCategory({ category: 'smartphones' }) chama GET /products/category/smartphones
    getByCategory({ category, expectedStatus, saveResponseLog }) {
        return this.send({
            method: 'GET',
            endPoint: ENDPOINT_PRODUCTS_BY_CATEGORY.replace('{category}', category),
            expectedStatus,
            saveResponseLog
        });
    }
}

module.exports = {
    ProductService
};
