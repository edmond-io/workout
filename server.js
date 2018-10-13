const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const tasks = require('./routes/tasks');

const PORT = process.env.PORT || 8282;

const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

// Set static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(PORT, function(){
	console.log('Server started on '+PORT+ '!');
});

// CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// routes
app.use('/api', tasks);
app.use('/', index);

app.use('/images', express.static(path.join(__dirname, 'client/assets/images')));
app.use('/*', express.static(path.join(__dirname, 'client')));


// 404 catch
app.all('*', function(req, res){
	console.log("[TRACE] Server 404 request: "+req.originalUrl);
	res.status(200).render('/');
});

/*
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});
*/
