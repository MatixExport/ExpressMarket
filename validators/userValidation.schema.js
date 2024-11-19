const {Ajv} =  require('ajv');
const ajv = new Ajv({
    allErrors: true,
    verbose: true,
});
const addFormats = require("ajv-formats")
const ajvErrors = require('ajv-errors');

addFormats(ajv);
ajvErrors(ajv);

const userSchema = {
    type: 'object',
    properties: {
        login: {
            type: 'string',
            nullable: false,
            minLength: 4,
            maxLength: 20,
        },
        password: {
            type: 'string',
            nullable: false,
            minLength: 8,
            maxLength: 50,
        },
        phone: {
            type: 'string',
            nullable: false,
            minLength: 10,
            maxLength: 10,
        },
        email: {
            type: 'string',
            format: 'email',
            nullable: false,
            minLength: 4,
            maxLength: 20,
        },
        roleId: {
            type: 'uint8',
            nullable: true,
        }

    },
    required: ['login', 'password', 'phone', 'email'],
    additionalProperties: false,
};

const validateUser = ajv.compile(userSchema);
module.exports = {validateUser}