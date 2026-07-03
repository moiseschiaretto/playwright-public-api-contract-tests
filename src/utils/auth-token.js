// Autentica na API pública DummyJSON e guarda o accessToken em cache local
// (.token-cache.json, fora do versionamento) para os testes reutilizarem.
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function refreshToken() {
    const baseUrl = process.env.API_BASE_URL || 'https://dummyjson.com';
    const username = process.env.AUTH_USERNAME || 'emilys';
    const password = process.env.AUTH_PASSWORD || 'emilyspass';

    console.log(`🔑 Autenticando na DummyJSON como "${username}"...`);

    const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 60 })
    });

    if (!response.ok) {
        throw new Error(`Falha ao autenticar: HTTP ${response.status}`);
    }

    const data = await response.json();
    const cachePath = path.join(process.cwd(), '.token-cache.json');
    fs.writeFileSync(cachePath, JSON.stringify({ accessToken: data.accessToken, obtainedAt: new Date().toISOString() }, null, 2));

    console.log('✅ Token obtido e salvo em .token-cache.json');
    return data.accessToken;
}

if (require.main === module) {
    refreshToken().catch((err) => {
        console.error('❌ Erro ao obter token:', err.message);
        process.exit(1);
    });
}

module.exports = { refreshToken };
