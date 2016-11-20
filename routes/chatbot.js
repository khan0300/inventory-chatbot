/*
This is the backend for the chatbot. It communicates with API.AI to provide the
speech responses to the user's messages. Everyone must modify this file by
adding their API.AI API key where it says "<add your api key here!>"

If you are going to use MongoDB you will likely need to modify this file to
save and get data.

UPDATE: ADD A SESSION ID
*/

var express = require('express');
var router = express.Router();
var apiai = require('apiai');
var app = apiai("59f3c81695f3494db7c0ddd341095db2");
var Product = require('../models/product');


//send message to chatbot
router.post('/send', function(req, res) {
  var data = req.body;
  var options = {
    sessionId: "Enter a 36 character ID"
  }

  var request = app.textRequest(data.message, options);

  request.on('response', function(response){

    var productName = response.result.parameters.product;

    switch(response.result.metadata.intentName) {

      case "ask about product availability":
        Product.findOne({name: new RegExp('^'+productName+'$', "i")}, (err, product)=>{
          if (err || !product) res.send("Couldn't find a product called \""+productName+"\".");
          else res.send("We have " + product.stock + " of the " + product.name + " in stock.");
        });
        break;

      case "ask for description":
        Product.findOne({name: new RegExp('^'+productName+'$', "i")}, (err, product)=>{
          if (err || !product) res.send("Couldn't find a product called \""+productName+"\".");
          else res.send(product.description);
        });
        break;

      case "ask about product cost":
        Product.findOne({name: new RegExp('^'+productName+'$', "i")}, (err, product)=>{
          if (err || !product) res.send("Couldn't find a product called \""+productName+"\".");
          else res.send("The " + product.name + " costs $" + product.price + ".");
        });
        break;

      case "ask to buy":
        Product.findOne({name: new RegExp('^'+productName+'$', "i")}, (err, product)=>{
          if (err || !product) {
            res.send("Couldn't find a product called \""+productName+"\".");
          }
          else {
            if (product.stock==0) {
              res.send("Unfortunately we are sold out!");
            }
            else {
              product.stock -= 1;
              product.save();
              res.send("Thanks for purchasing the " + product.name + "!");
            }
          }
        });
        break;

      default:
        res.send(response.result.fulfillment.speech);
    }

  });

  request.on('error', function(error){
    console.log(error);
  });

  request.end();



});



module.exports = router;
