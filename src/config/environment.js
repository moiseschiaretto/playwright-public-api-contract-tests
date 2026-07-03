// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const fs = require('fs');
const path = require('path');

// O token é atualizado por "npm run refresh-token" (src/utils/auth-token.js)
// e fica em cache local (.token-cache.json, fora do versionamento) para não precisar
// reescrever o .env a cada execução.
function loadCachedToken() {
    const cachePath = path.join(process.cwd(), '.token-cache.json');
    if (fs.existsSync(cachePath)) {
        try {
            return JSON.parse(fs.readFileSync(cachePath, 'utf-8')).accessToken;
        } catch (e) {
            return null;
        }
    }
    return null;
}

const config = {
    api: {
        base_url: process.env.API_BASE_URL || 'https://dummyjson.com',
        username: process.env.AUTH_USERNAME || 'emilys',
        password: process.env.AUTH_PASSWORD || 'emilyspass',
        token: loadCachedToken() || process.env.ACCESS_TOKEN || '',
        token_invalid: 'token-invalido-de-propósito-para-teste-negativo'
    }
};

module.exports = config;
