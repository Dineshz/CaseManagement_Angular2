var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var Schema = mongoose.Schema;

// Config
var _ip = "0.0.0.0";
var _port = 3005;

//Court Schema
var courtSchema = new Schema({
  title: String,
  shorttext: { type: String, required: true, unique: true },
  ptitle: String,
  dtitle: String,
});
var Court = mongoose.model('Court', courtSchema);
// module.exports = Court; 
var caseSchema = new Schema({
  court : String,
  type : String,
  id : String,
  dairy_no : String,
  year : Number,
  petitioner : String,
  defendant : String,
  client : String,
  petadvocate : String,
  defadvocate : String,
  subject : String,
  status : String,
  judge : String,
  lastupdated : Date,
  hearings : [
      {
        date : String,
        comment : String
      }
  ],
  judgement : String,
  pdf : String
});
var Case = mongoose.model('Case', caseSchema);
var dbUrl = 'mongodb://127.0.0.1:27017/cms';
//Mongoose - MongoDB Database
connect = function(){
    mongoose.connect( dbUrl, function(err){
      if(err){
        console.log(err.message);
        setTimeout(connect,5000);
      }else{
        console.log("Database Connection Successful!")
      }
    });   
}
connect();
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/public"));
// module.exports = Court; 
app.use(function(req,res,next){
  req.Court = Court;
  req.Case = Case;
  // res.sendFile(__dirname+'/public/index.html');
  next();
});
app.use('/', index);

app.get(function(req,res){
  res.sendFile(__dirname+'/public/index.html');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(_port,_ip);