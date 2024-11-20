//reduce to single Ajv require across whole module
const {Ajv} = require('ajv');
const ajv = new Ajv({
    allErrors: true,
    verbose: true,
});
const addFormats = require("ajv-formats")
const ajvErrors = require('ajv-errors');

addFormats(ajv);
ajvErrors(ajv);

const tokenSchema = {
    type: 'object',
    properties: {
        refreshToken: {
            type: 'string',
            nullable: false,
            minLength: 4,
            maxLength: 80,
        },
    },
    required: ['refreshToken'],
    additionalProperties: false,
};

const validateRefeshToken = ajv.compile(tokenSchema);
module.exports = {validateRefeshToken}