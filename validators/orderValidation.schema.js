const {Ajv} =  require('ajv');
const ajv = new Ajv({
    allErrors: true,
    verbose: true,
});
const addFormats = require("ajv-formats")
const ajvErrors = require('ajv-errors');

addFormats(ajv);
ajvErrors(ajv);

const orderUnitSchema = {
    type: 'object',
    properties: {
        orderId: {
            type: 'uint32',
            nullable: false,
            minimum: 0,
        },
        productId: {
            type: 'uint32',
            nullable: false,
            minimum: 0,
        },
        quantity: {
            type: 'uint16',
            nullable: false,
            minimum: 0,
        },
       
    },
    required: ['orderId', 'productId', 'quanitiy'],
    additionalProperties: false,
};

const orderSchema = {
    type: 'object',
    properties: {
        products:{
            type:"array",
            items:orderUnitSchema
        }
       
    },
    required: ['products'],
    additionalProperties: false,
};


const validateOrder = ajv.compile(orderSchema);
module.exports = {validateOrder}