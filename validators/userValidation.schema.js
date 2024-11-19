import Ajv from 'ajv';
const ajv = new Ajv({
    allErrors: true,
    verbose: true,
});
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

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

export const validateUser = ajv.compile(userSchema);