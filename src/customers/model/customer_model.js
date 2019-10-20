"use strict";
let db = require('../../dbconnect/db_connection')

let messages = require("../../config/message");
let status_codes = require("../../config/response_status_code");
let send_mail = require("../../service/mail_service")
const path = require('path');
// let Response_adapter = require(path.join(global.appRoot, "src/core/response_adapter")); 
let Response_adapter = require("../../core/response_adapter.js");
const bcrypt = require('bcrypt');
let response = new Response_adapter();


module.exports = class Customer_model {
    constructor() { }

    sign_up_customer(form_data, callback) {
        console.log("sign up page form_data==", form_data)


        let ret_res = {};
        if (form_data.password !== form_data.confirm_password) {
            return callback(response.response_error(false, status_codes.confirm_password_not_match, messages.confirm_password_not_match));

        } else {
            delete form_data.confirm_password;

            bcrypt.hash(form_data.password, 10, function (err, phash) {
                console.log("99999999999999999")
                if (err) {
                    console.error("Password hashed error", err);
                    //   callback(err);

                } else {

                    form_data.password = phash;
                    console.log("222222222222222", form_data.password);

                    let existquery = "select * from customers where email_id ='" + form_data.email_id + "'";

                    db.query(existquery, function (err, results, fields) {
                        if (err) {
                            console.log("sign up page error==", err)
                            console.error(err);
                        } else {
                            // console.log("results=============", results)
                            if (results.length > 0) {
                                return callback(response.response_error(false, status_codes.user_already_exist, messages.user_already_exist, err));

                            } else {
                                let sqlquery;
                                if (form_data.user_type == 'manager') {
                                    sqlquery = "insert into  customers(name,email_id,password,user_type,gender,dob,event_name,event_address,event_time,event_date,event_city,pay_out,mobile_number,contact_number,cunique_id) values ('" + form_data.name + "','" + form_data.email_id + "','" + form_data.password + "','" + form_data.user_type + "','" + form_data.gender + "','" + form_data.dob + "','" + form_data.event_name + "','" + form_data.event_address + "','" + form_data.event_time + "','" + form_data.event_date + "','" + form_data.event_city + "','" + form_data.pay_out + "','" + form_data.mobile_number + "','" + form_data.contact_number + "','" + form_data.cunique_id + "')";

                                } else {
                                    sqlquery = "insert into  customers(name,email_id,password,user_type,gender,dob,mobile_number,cunique_id) values ('" + form_data.name + "','" + form_data.email_id + "','" + form_data.password + "','" + form_data.user_type + "','" + form_data.gender + "','" + form_data.dob + "','" + form_data.mobile_number + "','" + form_data.cunique_id + "')";

                                }

                                db.query(sqlquery, function (err, results, fields) {
                                    if (err) {
                                        return callback(response.response_error(false, status_codes.user_add_failed, messages.user_add_failed, err));

                                    } else {
                                        console.log("insert len ll", results)

                                        // ret_res.from_to=form_data
                                        // send_mail.sending_mail(form_data.email_id,async(mail_response)=>{
                                        return callback(response.response_success(true, status_codes.user_add_success, messages.user_add_success, results));

                                        // })
                                    }
                                });
                            }
                        }
                    });


                }

            })




        }

    }

    // customer_login(form_data, callback) {
    //     // let checklogin = "select id,email_id,user_type from customers where email_id=  '" + form_data.email + "' and password= + '" + form_data.password + "'";
    //     let checklogin = "select id,email_id,user_type,password from customers where email_id=  '" + form_data.email + "'";

    //     db.query(checklogin, function (err, results, fields) {
    //         if (err) {
    //             return callback(response.response_error(false, status_codes.user_add_failed, messages.user_add_failed, err));

    //         }
    //         if (results.length > 0) {
    //             bcrypt.compare(form_data.password, results[0].password, function (err, res) {
    //                 if (err) {
    //                     return callback(response.response_error(false, status_codes.login_falied, messages.login_falied, err));

    //                 } else {
    //                     return callback(response.response_success(true, status_codes.login_success, messages.login_success, results));

    //                 }
    //             })

    //         } else {
    //             return callback(response.response_error(false, status_codes.invalide_user_name, messages.invalide_user_name, err));

    //         }
    //     })
    // }


    customer_login(form_data, callback) {
        // let checklogin = "select id,email_id,user_type from customers where email_id=  '" + form_data.email + "' and password= + '" + form_data.password + "'";
        let checklogin = "select id,email_id,user_type,password from customers where email_id=  '" + form_data.email + "'";
            console.log("bbb passswdd", form_data)

        db.query(checklogin, function (err, results, fields) {
            if (err) {
                return callback(response.response_error(false, status_codes.user_add_failed, messages.user_add_failed, err));

            }
            console.log("result dta", results);
            if (results.length > 0) {
                bcrypt.compare(form_data.password, results[0].password, function (err, res) {
                    if (err) {
                        return callback(response.response_error(false, status_codes.login_falied, messages.login_falied, err));

                    } else {
                        return callback(response.response_success(true, status_codes.login_success, messages.login_success, results));

                    }
                })

            } else {
                return callback(response.response_error(false, status_codes.invalide_user_name, messages.invalide_user_name, err));

            }
        })
    }


    customer_logout(form_data, callback) {


    }


    customer_profile_list(form_data, callback) {

        let sqlquery = "select * from customers where user_type='manager'";

        db.query(sqlquery, function (err, results, filelds) {
            if (err) {
                console.log("err", err)
                return callback(response.response_error(false, status_codes.profile_list_not_found, messages.profile_list_not_found, err));
            }
            if (results.length > 0) {
                console.log("results")
                return callback(response.response_success(true, status_codes.profile_list_found, messages.profile_list_found, results));

            } else {
                return callback(response.response_error(false, status_codes.profile_list_not_found, messages.profile_list_not_found));
            }
        })
    }

    customer_profile_update_by_id(form_data, callback) {
        let sqlquery = "update customers set first_name='" + form_data.first_name + "' ,last_name='" + form_data.last_name + "',middle_name='" + form_data.middle_name + "',email='" + form_data.email + "',event_location='" + form_data.event_location + "',  where user_type='" + form_data.user_type + "',event_time='" + form_data.event_time + "',    and id='" + form_data.id + "'";
        // let sqlquery = "select * from customers where customers.id=" + form_data.id + "";

        db.query(sqlquery, function (err, results, filelds) {
            if (err) {
                callback("DataBase Error", err);
            }
            if (results.length > 0) {
                callback(results);
            } else {
                callback("Profile Data Not Found By Id!!");
            }
        })
    }

    customer_profile_by_id(form_data, callback) {

        console.log("form_data==", form_data)
        let sqlquery_id = "select * from customers where customers.id=" + form_data.id + "";

        db.query(sqlquery_id, function (err, results, filelds) {
            if (err) {
                callback("DataBase Error", err);
            }
            if (results.length > 0) {
                return callback(response.response_success(true, status_codes.user_profil_by_id_founds, messages.user_profil_by_id_founds, results));
            } else {
                return callback(response.response_error(false, status_codes.profile_not_found_by_id, messages.profile_not_found_by_id));
            }
        })
    }


    event_details_by_id(form_data, callback) {

        let sqlquery_id = "select * from customers where customers.id=" + form_data.id + "";

        db.query(sqlquery_id, function (err, results, filelds) {
            if (err) {
                callback("DataBase Error", err);
            }
            if (results.length > 0) {
                return callback(response.response_success(true, status_codes.user_profil_by_id_founds, messages.user_profile_by_id_founds, results));
            } else {
                return callback(response.response_error(false, status_codes.profile_not_found_by_id, messages.profile_not_found_by_id));
            }
        })
    }

}