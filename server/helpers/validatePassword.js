import PasswordValidator from "password-validator";


var schema = new PasswordValidator()

schema
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().not().spaces()

console.log(schema.validate('validPassw123'));

export default function validatePassword(password){
    return {status:schema.validate(password),message:schema.validate(password,{details:true})}
}