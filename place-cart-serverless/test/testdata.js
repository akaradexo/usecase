const correctMockData = {
//   some mock data
    "address": "plot no 190",
    "userId": "123",
    "phoneNumber": "9123456789",
    "emailId": "ashu@gmail.com",
    "promoCode": "PC1111",
    "items": [
        {
        "itemId": "123",
        "quantity": "45",
        "descriptionItem": "hello this is the items"
        },
        {
        "itemId": "123",
        "quantity": "45",
        "descriptionItem": "hello this is the items"
        }
    ] 
};
const wroungMockData = {
//   some mock data
    "address": "plot no 190",
    "userId": "123",
    "phoneNumber": "9123456789",
    "emailId": "ashugmail.com",
    "promoCode": "PC1111",
    "items": [
        {
        "itemId": "123",
        "quantity": "45",
        "descriptionItem": "hello this is the items"
        },
        {
        "itemId": "123",
        "quantity": "45",
        "descriptionItem": "hello this is the items"
        }
    ] 
};

const validateMockDataSuccess = {
    Item:
       {
          address: {
            S: "plot no 190"
          },
          userId: {
            S: "123"
          },
          "phoneNumber": {
            N: "9123456789"
          },
          "emailId": {
            S: "ashu@gmail.com"
          },
          "promoCode": {
            S: "PC1111"
          },
          "items": {
            L: [
              {
                M: {
                  itemId: {
                    S: "123"
                  },
                  quantity: {
                    S: "45"
                  },
                  descriptionItem: {
                    S: "hello this is the item no 1"
                  }
                }
              }
            ]
          }
        }
//   some mock data
    
};
const validateMockDataEmailfail = {
    Item:
       {
          address: {
            S: "plot no 190"
          },
          userId: {
            S: "123"
          },
          "phoneNumber": {
            N: "7276782113"
          },
          "emailId": {
            S: "ashugmail.com"
          },
          "promoCode": {
            S: "PC1111"
          },
          "items": {
            L: [
              {
                M: {
                  itemId: {
                    S: "123"
                  },
                  quantity: {
                    S: "45"
                  },
                  descriptionItem: {
                    S: "hello this is the item no 1"
                  }
                }
              }
            ]
          }
        }
//   some mock data
};

const validateMockDataPhonefail = {
    Item:
       {
          address: {
            S: "plot no 190"
          },
          userId: {
            S: "123"
          },
          "phoneNumber": {
            N: "72767821"
          },
          "emailId": {
            S: "ashu@gmail.com"
          },
          "promoCode": {
            S: "PC1111"
          },
          "items": {
            L: [
              {
                M: {
                  itemId: {
                    S: "123"
                  },
                  quantity: {
                    S: "45"
                  },
                  descriptionItem: {
                    S: "hello this is the item no 1"
                  }
                }
              }
            ]
          }
        }
//   some mock data
};


const dynamoMockDatafail = {
    Item:
       {
          address: {
            S: "plot no 190"
          },
          userId: {
            S: "123"
          },
          "phoneNumber": {
            N: "72767821"
          },
          "emailId": {
            S: "ashu@gmail.com"
          },
          "promoCode": {
            S: "PC1111"
          },
          "items": {
            L: [
              {
                M: {
                  itemId: {
                    S: "123"
                  },
                  quantity: {
                    S: "45"
                  },
                  descriptionItem: {
                    S: "hello this is the item no 1"
                  }
                }
              }
            ]
          }
        }  
//   some mock data
};


const mockData = {correctMockData ,wroungMockData, validateMockDataEmailfail,validateMockDataSuccess,validateMockDataPhonefail , dynamoMockDatafail}  ;

module.exports = mockData ;