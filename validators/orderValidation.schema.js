const {Ajv} =  require('ajv');
const ajv = new Ajv({
    allErrors: true,
    verbose: true,
});
const addFormats = require("ajv-formats")
const ajvErrors = require('ajv-errors');

addFormats(ajv);
ajvErrors(ajv);


const request = {
    Products:[
        {
            ProductId:1,
            quantity:5
        },
        {
            ProductId:2,
            quantity:5
        },
    ]

}





const orderUnitSchema = {
    type: 'object',
    properties: {
        ProductId: {
            type: 'integer',
            nullable: false,
            minimum: 0,
        },
        quantity: {
            type: 'integer',
            nullable: false,
            minimum: 0,
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


const validateOrder = ajv.compile(orderSchema);
module.exports = {validateOrder}