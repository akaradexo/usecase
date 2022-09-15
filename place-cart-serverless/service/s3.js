/**
 * ssm parameters

 * @param {string}promoCode from s3 then validation then place cart

 * @param {string} cartId cart id 

 * @returns {params} cart details

 */

const AWS = require("aws-sdk");
const putItemToDatabase = require("./dynamoPut");
const addCart = require("./addCart");
const validator = require("../validation/validateCartData");

 
const s3 = new AWS.S3({
    region: 'us-east-1'
});

const ssm = new AWS.SSM({
    region: 'us-east-1'
});

async function getBucketName() {
  try{
    const bucketNameParams = {
    Name: 'cartDataBucketName',
    WithDecryption: false
   };
  
    const promise = await ssm.getParameter(bucketNameParams).promise();
    return promise.Parameter.Value;
  }catch(err){
    console.log(err.message);
  }

}

async function getFileName() {
  try{
    
    const fileNameParams = {
    Name: 'discountDataFileName',
    WithDecryption: false
    };
  
    const promise = await ssm.getParameter(fileNameParams).promise();
    return promise.Parameter.Value;
  
  }catch(err){
    console.log(err.message);
  }

}

module.exports = async function placeCart(event,callback){
  
    const bucketName = await getBucketName();
    const fileName = await getFileName();
    const cartData = await addCart(event,callback);
    const validateCart = await validator(cartData,callback);
    
      
    //s3 coupon check
    s3.getObject({
    Bucket: bucketName,
    Key: fileName
    }, 
    
    (err, data) => {
    
    if (err) {
    console.log(err);
    }
    try{
       const body = JSON.parse(event.body);
    const dataBody = Buffer.from(data.Body).toString('utf8');
    const content_str = JSON.stringify(dataBody);
    
    if (content_str.includes(body.promoCode) && body.promoCode.length === 6) {
      
        if(validateCart == true){
          
          putItemToDatabase(cartData,callback);
        
          
        }else{
          callback(null,{statusCode:500,body : JSON.stringify("Cart Data Validation Failed")});
        }
        
    }else{
        
        callback(null,{statusCode:500,body : JSON.stringify("Wrong Promo Code or Promo Code doesn't exist : promo code should be like PCxxxx")});
    }
    }catch(err){
       callback(null,{
        statusCode:500,
        body: JSON.stringify('Lambda Proxy Integration Exception: Please Test your function in API Gateway ')
      });
    }
    
  
    });
};