const {
    expect
} = require('@playwright/test');

async function makeRequest(config) {
    const {
        request,
        method,
        baseURL,
        endPoint,
        token,
        expectedStatus,
        body = null,
        headers = {},
        validateStatus = true,
        showResponseLog = false,
        saveResponseLog = null,
    } = config;

    try {
        const defaultHeaders = { 'Accept': 'application/json' };
        if (token) {
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }
        if (body) {
            defaultHeaders['Content-Type'] = 'application/json';
        }

        const finalHeaders = { ...defaultHeaders, ...headers };
        const requestConfig = { headers: finalHeaders };
        if (body) {
            requestConfig.data = body;
        }

        let response;
        if (method.toUpperCase() === 'PATCH') {
            response = await request.fetch(`${baseURL}${endPoint}`, { method: 'PATCH', ...requestConfig });
        } else {
            response = await request[method.toLowerCase()](`${baseURL}${endPoint}`, requestConfig);
        }

        if (validateStatus) {
            expect(response.status()).toBe(expectedStatus);
        }

        const responseData = await response.json();

        if (showResponseLog) {
            console.log('\n=== RESPONSE LOG ===');
            console.log(`${method} ${baseURL}${endPoint}`);
            console.log(`Status: ${response.status()}`);
            console.log(JSON.stringify(responseData, null, 2));
            console.log('==================\n');
        }

        if (saveResponseLog) {
            const {
                saveResponseToFile
            } = require('#utils/files');
            await saveResponseToFile(responseData, saveResponseLog);
        }

        return { response, responseData };

    } catch (error) {
        console.error(`Erro ao realizar a requisição ${method}:`, error);
        throw error;
    }
}

module.exports = { makeRequest };
