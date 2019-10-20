let messages = require("../config/message.js");
let status_codes = {

    "user_add_success": 1001,
    "user_add_failed": 1002,
    "user_already_exist": 1003,
    "login_success": 1004,
    "login_falied": 1005,
    "invaild_user": 1006,
    "profile_list_found": 1007,
    "profile_list_not_found": 1008,
    "update_profile_success": 1009,
    "update_profile_failed": 1010,
    "profile_found": 1111,
    "profile_not_found": 1212,
    "confirm_password_not_match": 1313,
    "user_profil_by_id_founds":1414,
    "profile_not_found_by_id":1515,
    


};
module.exports = status_codes;
module.exports.check_error_code = function (type, code) {
    switch (type) {
        case "DATABASE":
            switch (code) {
                case 1054:
                    return {
                        status_code: status_codes.database_table_column_not_exist,
                        message: messages.database_table_column_not_exist
                    };
                    break;
                case 1146:
                    return {
                        status_code: status_codes.database_table_not_exist,
                        message: messages.database_table_not_exist
                    };
                    break;
                case 1052:
                    return {
                        status_code: status_codes.database_column_ambiguous,
                        message: messages.database_column_ambiguous
                    };
                    break;
                case 1064:
                    return {
                        status_code: status_codes.database_query_parse_error,
                        message: messages.database_query_parse_error
                    };
                    break;
                case 1136:
                    return {
                        status_code: status_codes.database_query_column_count_error,
                        message: messages.database_query_column_count_error
                    };
                    break;
                case 1062:
                    return {
                        status_code: status_codes.database_value_exist,
                        message: messages.database_value_exist
                    }
            }
            break;
        case "CUSTOM":
            return {
                status_code: status_codes[code],
                message: messages[code]
            };
            break;
        default:
            break;
    }
};