const {Ajv} =  require('ajv');
const ajv = new Ajv({
    allErrors: true,
    verbose: true,
});
const addFormats = require("ajv-formats")
const ajvErrors = require('ajv-errors');

addFormats(ajv);
ajvErrors(ajv);


const orderReviewSchema = {
    type: 'object',
    properties: {
        rating: {
            type: 'integer',
            nullable: false,
            minimum: 1,
            maximum: 5
        },
        review:{
            type:'string',
            nullable: true
        }
       
    },
    required: ['rating'],
    additionalProperties: false,
};



const validateOrderReview = ajv.compile(orderReviewSchema);
module.exports = {validateOrderReview}