const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const commonConfig = require('./config/common.config');
const {ApiAuthValidator} = require('./middleware/authValidator/index');
const indexRouter = require('./routes/index');
const fileUpload= require('express-fileupload');

global.appRoot = path.resolve(__dirname);

const app = express();
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : 'public'
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse requests of content-type: application/json
app.use(bodyParser.json({limit: '50mb'}));

app.use(express.static(path.join(__dirname, 'public')));

// index route
app.get('/', (req, res) => {
	res.json({message: 'Welcome to Realido APIs.'});
});

app.use('/api/',  indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.status(404).json({status: false, message: '404! Not Found'});
});

// error handler
app.use(function(err, req, res, next) {
	res.status(400).json({status: false, message: '400! Bad Request', errors: err.errors});
});

app.listen(process.env.PORT || '2121', () => {
	console.log(`Server is running on port: ${process.env.PORT || '2121'}`);
});
