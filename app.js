const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('./db/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const moviesRouter = require('./routes/movies');
const expressHbs = require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const validator = require('express-validator');
// view engine setup

require('./config/passport');

app.engine('.hbs',expressHbs({defaultLayout: 'layout',extname : '.hbs',
}));

app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(methodOverride( (req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret : 'UsersSecretKeySessions',
  resave: false,
  aveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie : {maxAge : 240 *60 * 1000}
}));

app.use(fileUpload());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next) =>{
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/movies', moviesRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});


module.exports = app;