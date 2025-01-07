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
            minLength: 3,
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
            pattern: "^[0-9]{9}$",
        },
        email: {
            type: 'string',
            format: 'email',
            nullable: false,
            minLength: 4,
            maxLength: 20,
        },

    },
    required: ['login', 'password', 'email','phone'],
    additionalProperties: false,
};




const userLoginSchema = {...userSchema};
userLoginSchema['required'] = ['login','password'];
delete userLoginSchema['phone'];
delete userLoginSchema['email'];


const userUpdateSchema = {...userSchema};

const role = {
    enum: ["client", "employee"]
}

userUpdateSchema.properties['role'] = role;
userUpdateSchema['required'] = [];



const validateUpdateUser = ajv.compile(userUpdateSchema);
const validateLoginUser = ajv.compile(userLoginSchema);
const validateUser = ajv.compile(userSchema);
module.exports = {validateUser,validateUpdateUser,validateLoginUser}