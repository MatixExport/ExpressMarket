const {Ajv} =  require('ajv');
const ajv = new Ajv({
    allErrors: true,
    verbose: true,
});
const addFormats = require("ajv-formats")
const ajvErrors = require('ajv-errors');
const { OrderStatus } = require('../../models/OrderStatus');
const { format } = require('morgan');

addFormats(ajv);
ajvErrors(ajv);

const orderUnitSchema = {
    type: 'object',
    properties: {
        ProductId: {
            type: 'integer',
            nullable: false,
            minimum: 1,
        },
        quantity: {
            type: 'integer',
            nullable: false,
            minimum: 1,
        },
       
    },
    required: ['ProductId', 'quantity'],
    additionalProperties: false,
};

const orderSchema = {
    type: 'object',
    properties: {
        Products:{
            type:"array",
            items:orderUnitSchema
        }
       
    },
    required: ['Products'],
    additionalProperties: false,
};

const updateOrderSchema = {
    type:"object",
    properties:{
        OrderStatusId:{
            type:"integer",
            minimum:1,
            maximum:4
        },
        confirmDate:{
            type:"string",
            format:"date"
        }
    },
}


const validateAddOrder = ajv.compile(orderSchema);
const validateUpdateOrder = ajv.compile(updateOrderSchema);
module.exports = {validateAddOrder,validateUpdateOrder};