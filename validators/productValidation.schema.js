import Ajv from 'ajv';
const ajv = new Ajv({
    allErrors: true,
    verbose: true,
});
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

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
            type: 'float32',
            nullable: false,
            minimum: 0,
        },
        weight: {
            type: 'float32',
            nullable: false,
            minimum: 0.1,
            maximum: 5000,
        },
        categoryId: {
            type: 'uint8',
            nullable: false,
            minimum: 0,
        },
    },
    required: ['name', 'description', 'price', 'weight', 'categoryId'],
    additionalProperties: false,
};

export const validateProduct = ajv.compile(productSchema);