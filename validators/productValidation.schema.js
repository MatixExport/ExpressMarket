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

const productSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: false,
            minLength: 4,
            maxLength: 40,
        },
        description: {
            type: 'string',
            nullable: false,
            minLength: 8,
            maxLength: 500,
        },
        price: {
            type: 'number',
            nullable: false,
            minimum: 0,
        },
        weight: {
            type: 'number',
            nullable: false,
            minimum: 0.1,
            maximum: 5000,
        },
        CategoryId: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            maximum: 5
        },
    },
    required: ['name', 'description', 'price', 'weight', 'CategoryId'],
    additionalProperties: false,
};
const productUpdateSchema = {...productSchema};
productUpdateSchema.required = [];

const validateAddProduct = ajv.compile(productSchema);
const validateUpdateProduct = ajv.compile(productUpdateSchema);
module.exports = {validateAddProduct,validateUpdateProduct}