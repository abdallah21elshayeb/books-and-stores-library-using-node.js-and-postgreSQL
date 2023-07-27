let passwordValidator = require('password-validator');
// Create a schema
let schema = new passwordValidator();
let bcrypt = require('bcryptjs');

exports.isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

exports.isValidePassword = (password) => {
  return !(password.length < 8 || password === '');
};
exports.comparePassword = (password , hashedPassword) => {
return bcrypt.compareSync(password, hashedPassword);
}
exports.isValidPassword = (password) => {
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(15) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters 
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

  return schema.validate(password);
};
