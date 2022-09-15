/**

 * put cart details to dynamo db

 */
const AWS = require("aws-sdk");
 
const dynamodb = new AWS.DynamoDB({
  region: "us-east-1"
});

module.exports = function putItemToDatabase(cartData,callback){
    dynamodb.putItem(cartData, (err, data) => {
        if (err) {
          
           //existing cart check
           if (err.code === "ConditionalCheckFailedException"){
              console.log("cart already exists");
            callback(null,{
                  body: JSON.stringify('Cart Already exists!'),
            });
            
            //error
            }else{
              console.log(err);
              callback(err, {
              statusCode:500,
              body:JSON.stringify( "Failed to put data into DynamoDB")
              });
            }
            //success
        } else {
          callback(null, {
              statusCode : 200,  
             body:JSON.stringify( "successful placed cart of cartID : "+  cartData.Item.cartId.S)
          });
        }
      });
}