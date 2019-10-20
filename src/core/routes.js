'use strict'
let express = require('express');
let router = express.Router();
var app = express();

// exports.get = function () {
//     console.log("111111")
//     let customer_route = require("../src/customers/controller/customer_controller");
//     // let customer_route=new Customer_route();


//     return router.use("/customers/", customer_route);
// }



// let express = require('express');
// let router = express.Router();

exports.get = function () {
    console.log("111111")
    let customer_route = require("../customers/routes/customer_routes.js");


    
    return router.use("/customers/", customer_route);

};
