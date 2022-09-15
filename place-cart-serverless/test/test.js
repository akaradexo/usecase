const {assert,expect }= require('chai');
const lambdaTester = require("lambda-tester");

//test data
const {correctMockData ,wroungMockData, validateMockDataEmailfail,validateMockDataSuccess,validateMockDataPhonefail,dynamoMockDatafail}  = require('./testdata.js');
// Import lambda funcion
const lambda = require('../index.js');

// Individual functions
const validateCartData = require("../validation/validateCartData");
const addCart = require("../service/addCart");
const dynamoPut = require("../service/dynamoPut");




describe('Lambda Invocation',function(done){
    it ('Successfully placed cart', function(){
        
         lambdaTester(lambda.handler)
          .event(correctMockData) // Passing input data
          .expectResult((result) => {
            // Check if code exist
         
            expect(result.code).to.exist;
        
            // Check if code = 200
            expect(result.code).to.equal(200);
        
            done();
          })
          .catch(done); // Catch assertion errors
            });
    
    it ('Failed placed cart', function(){
    // Execute lambda function using lambda-tester package
     lambdaTester(lambda.handler)
      .event(wroungMockData) // Passing input data
      .expectResult((result) => {
         // Check if code exist
          
            expect(result.code).to.exist;
        
            // Check if code = 500
            expect(result.code).to.equal(500);
            done();
      })
      .catch(done); // Catch assertion errors
        });
});   

describe('AddCart Testing', () => {
    
    it('Function Response Check', ()=>{
        let params = addCart(correctMockData)
        assert.isNotNull(params)

        assert.isNotNull(params.Item)

        assert.isNotNull(params.TableName)
    })

});

describe('Validation function test',function(done){
    
    it ('Validation success', function(){
        function dum(){return 'callback'}
        
        const result = validateCartData(validateMockDataSuccess,dum) ;
   
       expect(result).to.be.true;
      });
      
    it ('Validation failed due to email', function(){
     
        function dum(){return 'callback'}
    
        const result=validateCartData(validateMockDataEmailfail,dum);
        
        expect(result).to.be.false;
      }) ; 
      
     it ('Validation failed due to phone', function(){
         
        function dum(){return 'callback'}
    
        const result=validateCartData(validateMockDataPhonefail,dum);
        
        expect(result).to.be.false;
        
      }) ; 
});

// describe('DynamoDB Put Item Test' , (done) => {
    
//     it('Put Item Fail Test', ()=>{
    
//         function dum(){return "sadh"}
//         let result = dynamoPut(dynamoMockDatafail,dum)
        
//         lambdaTester(result)
//         .expectResult((result) => {
            
//             // Check if code exist
//             expect(result.code).to.exist;
            
//             // Check if code = 200
//             expect(result.code).to.equal(500);
        
//             done();
//           })
//           .catch(done); // Catch assertion errors
      
//     })
// })