/**

 * add cart details

 *

 * @param {string} cartId delivery id to search for

 * @returns {params} cart details

 */
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid'); 
 
const dynamodb = new AWS.DynamoDB({
  region: "us-east-1"
});

const ssm = new AWS.SSM({
    region: 'us-east-1'
});

async function getDatabaseName() {
  try{
    
    const DatabsetNameParams = {
    Name: 'cartDataDbName',
    WithDecryption: false
    };
    
    const promise = await ssm.getParameter(DatabsetNameParams).promise();
    return promise.Parameter.Value;
  
  }catch(err){
    console.log(err.message);
  }

}


module.exports = async function addCart(event,callback){
    
    const dbName = await getDatabaseName();
    const timestamp = Date.now().toString();
    try{
    // event.items.forEach(ele => items.push(ele))
    const body = JSON.parse(event.body);
     let items = body.items;
     if(items.length === 0){
         callback(null,{
           statusCode:500,
           body:JSON.stringify("There are no items in your cart")
         });
       }
    const marshalled = AWS.DynamoDB.Converter.marshall({ items });
    const params = {
        Item: {
          cartId: {
            S: uuidv4().toString()
          },
          timeStamp:{
              S: timestamp
          },
          address:{
            S: body.address
          },
          userId:{
            S: body.userId
          },
          phoneNumber: {
            N: body.phoneNumber
          },
          emailId: {
             S: body.emailId
          },
          promoCode: {
            S: body.promoCode
          },
          items: marshalled.items,
        },
        TableName: dbName,
        ConditionExpression:`attribute_not_exists(#cartId)`,
        ExpressionAttributeNames:{
        "#cartId":"cartId"
        }
        
      };
      return params;
    }catch(err){
      callback(null,{
        statusCode: 500,
        body: JSON.stringify(err.message)
      })
    }
};

