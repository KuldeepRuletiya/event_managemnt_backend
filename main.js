var express = require('express');
let bodyParser = require('body-parser');
var app = express();
const cors = require('cors')
let path = require("path");
// var myConnection = require('express-myconnection')
let routes = require("../eventBackend/src/core/routes.js");

// const fileUpload = require('express-fileupload');


//require multer for the file uploads
var multer = require('multer');


//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
// var upload = multer({dest: DIR}).single('photo');
var upload = multer({ dest: 'uploads/' });

app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
  
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// let routes  =new Routes();



// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 
// }

// app.use(cors(corsOptions));


app.get('/', function (req, res) {
  res.send("Welcome To Event For Ever");
});

app.listen(3000, function () {
  console.log('Server running at port 3000: http://127.0.0.1:3000')
});

// app.use("*",function(req,res) {
//   res.status(404).send("404");
// })

app.use("/api/", routes.get());