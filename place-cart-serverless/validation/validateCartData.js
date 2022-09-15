/**
 * validations parameters

 * @param {Boolean}emailVal if its correct it will throw true otherwise false

 * @param {Boolean} phoneVal  if its correct it will throw true otherwise false

 */
const AWS = require("aws-sdk");
const isPhone = require("phone-regex");
const { isEmail } = require('validator');

module.exports = function validateCartData(cartData,callback){
  
  let emailVal = isEmail(cartData.Item.emailId.S);
  let phoneVal = isPhone({ exact: true }).test(cartData.Item.phoneNumber.N);
  
  if (emailVal && phoneVal){
    return true;
  }
  else if(emailVal == false){
     callback(null, {
      statusCode : 500,  
       body: JSON.stringify("Invalid Email")
    });
    return false;
  }
  else if(phoneVal == false){
    callback(null, {
        statusCode : 500,  
       body: JSON.stringify("Invalid Phone")
      });
    
    return false;
  }
}