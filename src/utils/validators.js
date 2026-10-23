const {
    expect
} = require('@playwright/test');
const Joi = require('joi');
const toJsonSchema = require('to-json-schema');

// FUNÇÃO PRINCIPAL — teste de contrato baseado em schema (tipos, não valores exatos)
// Ideal para APIs públicas, cujos dados mudam mas cuja ESTRUTURA se mantém estável.
async function validateResponseWithJsonSchema(responseData, expectedJson, options = {}) {
    const config = buildValidationConfig(options);
    const joiSchema = generateJoiSchema(expectedJson, config);

    const {
        error
    } = joiSchema.validate(responseData, {
        allowUnknown: config.allowUnknown,
        abortEarly: false
    });

    if (error) {
        const msg = `Erro de validação de contrato: ${error.details.map(d => d.message).join(', ')}`;
        console.error('❌ Falha na validação de contrato:', error.details);
        throw new Error(msg);
    }

    console.log('✅ Contrato validado com sucesso (schema/tipos conferem)');
    return responseData;
}

function buildValidationConfig(options) {
    const {
        validationMode = 'allow-extra',
        strictMode = null
    } = options;
    const modes = {
        'allow-extra': { allowUnknown: true, strictMode: false },
        'exact-schema': { allowUnknown: false, strictMode: true }
    };
    return { ...(modes[validationMode] || modes['allow-extra']), strictMode: strictMode ?? modes[validationMode]?.strictMode };
}

function generateJoiSchema(expectedJson, config) {
    const jsonSchema = toJsonSchema(expectedJson, {
        required: false,
        postProcessFnc: (type, schema, value, defaultFunc) => {
            if (type === 'string') {
                if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) schema.format = 'date-time';
                if (typeof value === 'string' && value.startsWith('http')) schema.format = 'uri';
            }
            return defaultFunc(type, schema, value);
        }
    });
    return convertToJoi(jsonSchema, config);
}

function convertToJoi(schema, config) {
    if (!schema || typeof schema !== 'object') return Joi.any();

    const converters = {
        string: () => {
            let str = Joi.string();
            if (schema.format === 'date-time') str = str.isoDate();
            if (schema.format === 'uri') str = str.uri();
            return str.allow('');
        },
        // Tratamos "integer" e "number" da mesma forma: em APIs públicas o mesmo
        // campo (ex: total, discountedTotal) pode vir como valor inteiro numa
        // amostra e decimal na próxima. O contrato aqui é "é numérico", não
        // "tem casas decimais específicas".
        number: () => Joi.number(),
        integer: () => Joi.number(),
        boolean: () => Joi.boolean(),
        array: () => schema.items ? Joi.array().items(convertToJoi(schema.items, config)) : Joi.array(),
        object: () => {
            if (!schema.properties) return Joi.object();
            const keys = {};
            for (const [key, value] of Object.entries(schema.properties)) {
                keys[key] = convertToJoi(value, config);
            }
            return config.strictMode ? Joi.object(keys).unknown(false) : Joi.object(keys).unknown(true);
        }
    };
    return converters[schema.type] ? converters[schema.type]() : Joi.any();
}

// Validação exata (para campos estáveis, ex: mensagens de erro conhecidas, status)
async function validateResponse(responseData, expectedStructure) {
    expect(responseData).toEqual(expect.objectContaining({ ...expectedStructure }));
}

module.exports = { validateResponseWithJsonSchema, validateResponse };
