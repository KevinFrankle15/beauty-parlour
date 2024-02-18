const hapijoi = require("@hapi/joi");
//Validation


//validation for registration
const registervalidation = (data) => {
    const Schema = hapijoi.object().keys({
        name: hapijoi.string()
        .min(6)
        .required(),
        email: hapijoi.string()
        .min(6)
        .required()
        .email(),
        password: hapijoi.string()
        .min(6)
        .required()
    });

    return Schema.validate(data)
};

//validation for edit profile
const editprofilevalidation = (data) => {
    const Schema = hapijoi.object().keys({
        name: hapijoi.string()
        .min(6)
        .required(),
        email: hapijoi.string()
        .min(6)
        .required()
        .email()
    });

    return Schema.validate(data)
};
//validation for edit profile name
const editprofilevalidationName = (data) => {
    const Schema = hapijoi.object().keys({
        name: hapijoi.string()
        .min(6)
        .required(),
    });

    return Schema.validate(data)
};
//validation for edit profile email
const editprofilevalidationEmail = (data) => {
    const Schema = hapijoi.object().keys({
        email: hapijoi.string()
        .min(6)
        .required()
        .email()
    });

    return Schema.validate(data)
};



//validation for login credentials
const loginvalidation = (data) => {
    const Schema = hapijoi.object().keys({
        email: hapijoi.string()
        .min(6)
        .required()
        .email(),
        password: hapijoi.string()
        .min(6)
        .required()
    });

    return Schema.validate(data)
};

//validation for changing password
const changepasswordvalidation = (data) => {
    const Schema = hapijoi.object().keys({
        currentPassword: hapijoi.string()
        .min(6)
        .required(),
        newPassword: hapijoi.string()
        .min(6)
        .required(),
        confirmPassword: hapijoi.string()
        .min(6)
        .required()
    });

    return Schema.validate(data)
};

//validation for forgot password
const forgotPasswordvalidation = (data) => {
    const Schema = hapijoi.object().keys({
        email: hapijoi.string()
        .min(6)
        .required()
        .email()
    });

    return Schema.validate(data)
};
//validation for recovering password
const recoverpasswordvalidation = (data) => {
    const Schema = hapijoi.object().keys({
        newPassword: hapijoi.string()
        .min(6)
        .required(),
        confirmPassword: hapijoi.string()
        .min(6)
        .required()
    });

    return Schema.validate(data)
};

//validation for class Details
const classDetailsvalidation = (data) => {
    const Schema = hapijoi.object().keys({
        Department: hapijoi.string()
        .required(),
        classYear: hapijoi.string()
        .required(),
        classSec: hapijoi.string()
        .required(),
        currentYear: hapijoi.string()
        .required(),
    });

    return Schema.validate(data)
};

module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = loginvalidation;
module.exports.editprofilevalidation = editprofilevalidation;
module.exports.editprofilevalidationName = editprofilevalidationName;
module.exports.editprofilevalidationEmail = editprofilevalidationEmail;
module.exports.changepasswordvalidation = changepasswordvalidation;
module.exports.forgotPasswordvalidation = forgotPasswordvalidation;
module.exports.recoverpasswordvalidation = recoverpasswordvalidation;
module.exports.classDetailsvalidation = classDetailsvalidation;