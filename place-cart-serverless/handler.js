'use strict';
const placeCart = require('./service/s3')

module.exports.index = function (event, context, callback){

  placeCart(event,callback)
};




