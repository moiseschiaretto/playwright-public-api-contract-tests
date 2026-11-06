// Constantes de endpoints da API pública DummyJSON (https://dummyjson.com/docs)
const CONF_ACCEPT = 'application/json';

const ENDPOINT_AUTH_LOGIN            = '/auth/login';
const ENDPOINT_AUTH_ME               = '/auth/me';

const ENDPOINT_PRODUCTS              = '/products';
const ENDPOINT_PRODUCTS_ADD          = '/products/add';
const ENDPOINT_PRODUCTS_SEARCH       = '/products/search';
const ENDPOINT_PRODUCTS_CATEGORIES   = '/products/categories';
const ENDPOINT_PRODUCTS_BY_CATEGORY  = '/products/category/{category}';

const ENDPOINT_USERS                 = '/users';
const ENDPOINT_USERS_ADD             = '/users/add';
const ENDPOINT_USERS_SEARCH          = '/users/search';

const ENDPOINT_CARTS                 = '/carts';
const ENDPOINT_CARTS_ADD             = '/carts/add';
const ENDPOINT_CARTS_BY_USER         = '/carts/user/{userId}';

const ENDPOINT_TODOS                 = '/todos';
const ENDPOINT_TODOS_ADD             = '/todos/add';
const ENDPOINT_TODOS_RANDOM          = '/todos/random';

const ENDPOINT_POSTS                 = '/posts';
const ENDPOINT_POSTS_ADD             = '/posts/add';
const ENDPOINT_POSTS_BY_USER         = '/posts/user/{userId}';

const ENDPOINT_QUOTES                = '/quotes';
const ENDPOINT_QUOTES_RANDOM         = '/quotes/random';

const ENDPOINT_RECIPES               = '/recipes';
const ENDPOINT_RECIPES_SEARCH        = '/recipes/search';

const ENDPOINT_COMMENTS              = '/comments';
const ENDPOINT_COMMENTS_ADD          = '/comments/add';

module.exports = {
    CONF_ACCEPT,
    ENDPOINT_AUTH_LOGIN,
    ENDPOINT_AUTH_ME,
    ENDPOINT_PRODUCTS,
    ENDPOINT_PRODUCTS_ADD,
    ENDPOINT_PRODUCTS_SEARCH,
    ENDPOINT_PRODUCTS_CATEGORIES,
    ENDPOINT_PRODUCTS_BY_CATEGORY,
    ENDPOINT_USERS,
    ENDPOINT_USERS_ADD,
    ENDPOINT_USERS_SEARCH,
    ENDPOINT_CARTS,
    ENDPOINT_CARTS_ADD,
    ENDPOINT_CARTS_BY_USER,
    ENDPOINT_TODOS,
    ENDPOINT_TODOS_ADD,
    ENDPOINT_TODOS_RANDOM,
    ENDPOINT_POSTS,
    ENDPOINT_POSTS_ADD,
    ENDPOINT_POSTS_BY_USER,
    ENDPOINT_QUOTES,
    ENDPOINT_QUOTES_RANDOM,
    ENDPOINT_RECIPES,
    ENDPOINT_RECIPES_SEARCH,
    ENDPOINT_COMMENTS,
    ENDPOINT_COMMENTS_ADD
};
