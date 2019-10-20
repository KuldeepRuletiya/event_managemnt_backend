const path = require('path');
// let messages = require(path.join(global.appRoot, "config/messages.js"));
let messages = require("../config/message");
// let messages = require("../../../");
let status_codes = require("../config/response_status_code");

module.exports = class Response_adapter {
    response_success(status, status_code, message, values) {
        let return_val = {
            status: status,
            status_code: status_code,
            message: message,
        };
        if (values !== null && values !== undefined && values !== "") {
            return_val['values'] = values;
        }
        global['data'] = return_val;
        return return_val;
    }

    response_error(status, status_code, message, errors) {
        let return_val = {
            status: status,
            status_code: status_code,
            message: message,
        };
        if (errors !== null && errors !== undefined && errors !== "") {
            return_val['errors'] = errors;
        }
        global['data'] = return_val;
        return return_val;
    }

    success(status_keys, values) {
        let return_val = {
            status: true,
            status_code: status_codes[status_keys],
            message: messages[status_keys],
        };
        if (values !== null && values !== undefined && values !== "") {
            return_val['values'] = values;
        }
        global['data'] = return_val;
        return return_val;
    }
    error(status_keys, errors) {
        console.log("status_keys", status_keys)
        let return_val = {
            status: false,
            status_code: status_codes[status_keys],
            message: messages[status_keys],
        };
        if (errors !== null && errors !== undefined && errors !== "") {
            return_val['errors'] = errors;
        }
        global['data'] = return_val;
        console.log("return_val errr==>", return_val)
        return return_val;
    }
};