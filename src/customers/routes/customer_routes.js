let express = require('express');
let router = express.Router();
let path = require("path");
let expressValidator = require('express-validator');
router.use(expressValidator());

let customer_Controller = require("../controller/customer_controller");
let customer_controller = new customer_Controller();

const multer = require("multer");
var upload = multer({ dest: 'uploads/' });

/*******************customer starts here ************************* */

router.get("/customer_profile_list/", customer_controller.customer_profile_list);
router.post("/sign_up_customer/",upload.single('profile_pic'), customer_controller.sign_up_customer);
router.post("/customer_login/", customer_controller.customer_login);
router.post("/customer_logout/", customer_controller.customer_logout);
router.get("/customer_profile_by_id", customer_controller.customer_profile_by_id);
router.get("/event_details_by_id", customer_controller.event_details_by_id);
router.post("/customer_profile_update_by_id/", customer_controller.customer_profile_update_by_id);

/******************** ****************** customers ends here *******/

module.exports = router;
