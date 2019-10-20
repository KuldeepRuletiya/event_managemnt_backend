"use strict";
let path = require("path");
let customer_Model = require("../model/customer_model");
let customer_model = new customer_Model();
const bcrypt = require('bcrypt');
var request = require('request');
var randomize = require('randomatic');

module.exports = class Customers {
    constructor() {}

    sign_up_customer(req, res, next) {
        let form_data = {};

        console.log("rrrrrrrrrrrrr", req.body);
        form_data.name = req.body.name;
        form_data.email_id = req.body.email;
        form_data.user_type = req.body.user_type.toLowerCase();
        form_data.password = req.body.password;
        form_data.confirm_password = req.body.confirm_password;
        form_data.gender = req.body.gender_type.toLowerCase();
        form_data.dob = req.body.dob;
        form_data.mobile_number = req.body.mobile_number;

        form_data.event_name = req.body.event_name;
        form_data.event_date = req.body.event_date;
        form_data.event_city = req.body.city;
        form_data.event_address = req.body.event_location;
        form_data.pay_out = req.body.paymetoption;
        form_data.event_time = req.body.event_time;
        form_data.city = req.body.city;
        form_data.paymentoption = req.body.paymetoption;
        form_data.contact_number = req.body.contact_number;
        form_data.cunique_id = randomize('0', 10);
        // form_data.profile_pic=req.files.image1;
        // console.log("ffff", profile_man_pic)

        customer_model.sign_up_customer(form_data, function(result) {
            res.json(result);
        });

    }

    customer_login(req, res, next) {
        let data = {};
        data.email = req.body.email;

        console.log("req body req.body.password ", req.body.password)

        if (req.body['recaptchaReactive'] === undefined || req.body['recaptchaReactive'] === '' || req.body['recaptchaReactive'] === null) {
            return res.json({ "responseCode": 1, "responseDesc": "Please select captcha" });
        } else {
            var secretKey = "6LfZT6UUAAAAAP9TTU1ha11LnUT1bmXzoQLDgn04";
            // var secretKey = "6LcvPaUUAAAAAHiG5ta6tUhQf7uLPpDj5nTmDhvY";
            var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['recaptchaReactive'] + "&remoteip=" + req.connection.remoteAddress;
            request(verificationUrl, function(error, response, body) {
                body = JSON.parse(body);
                console.log("bbbbbbbbbbbbbbbbb", body)
                if (body.success !== undefined && !body.success) {
                    return res.json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
                }
                //   res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
                else {
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        if (err) {
                            console.error("Password not hashed", err);
                        } else {
                            console.error("Password hash format", hash);
                            data.password = hash;

                            console.log("data.password", data.password)
                            customer_model.customer_login(data, function(result) {
                                // result.capcha_result = { "responseCode": 0, "responseDesc": "Sucess" };
                                res.json(result);
                            });
                        }
                    })


                    // console.log("data.password",data.password)
                    // customer_model.customer_login(data, function (result) {
                    //    // result.capcha_result = { "responseCode": 0, "responseDesc": "Sucess" };
                    //    res.json(result);
                    // });
                }

            });

        }







    }

    customer_logout(req, res, next) {

    }


    customer_profile_list(req, res, next) {
        let data = {};

        customer_model.customer_profile_list(data, function(result) {
            res.json(result);
        });

    }

    customer_profile_by_id(req, res, next) {
        let data = {};
        data.id = parseInt(req.query.id);
        // data.user_type = req.body.user_type;

        customer_model.customer_profile_by_id(data, function(result) {
            res.json(result);
        });

    }


    customer_profile_update_by_id(req, res, next) {
        let data = {};
        data.id = parseInt(req.body.id);
        form_data.first_name = req.body.first_name;
        form_data.last_name = req.body.last_name;
        form_data.middle_name = req.body.middle_name;
        form_data.email = req.body.email;
        form_data.event_name = req.body.event_name;
        form_data.event_location = req.body.event_location;
        form_data.event_time = req.body.event_time;
        form_data.city = req.body.city;
        form_data.paymetoption = req.body.paymetoption;
        form_data.event_date = req.body.event_date;

        customer_model.customer_profile_update_by_id(data, function(result) {
            res.json(result);
        });


    }

    event_details_by_id(req, res, next) {
        let data = {};
        data.id = parseInt(req.query.id);
        customer_model.event_details_by_id(data, function(result) {
            res.json(result);
        });

    }

}