require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

const apiRouter = require('./app_api/routes/index');

var app = express();
const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// CORS 설정 (OPTIONS 요청 처리)
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));
app.use(passport.initialize());

// 1. API 라우트 (가장 먼저 처리)
app.use('/api', apiRouter);

// 🔽🔽🔽 [수정된 부분] Angular 라우트 (SPA 설정) 🔽🔽🔽
// 정규표현식 대신 '*'를 사용하여 모든 경로 요청을 Angular의 index.html로 보냅니다.
// 이렇게 해야 메인 페이지('/') 접속 시에도 Angular 앱이 실행됩니다.
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});
// 🔼🔼🔼 [수정된 부분] 🔼🔼🔼

// 3. 인증 에러(UnauthorizedError) 전용 핸들러
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message" : err.name + ": " + err.message});
  } else {
    // 인증 에러가 아니면 다음 에러 핸들러로 넘김
    next(err);
  }
});

// 4. 404 에러 핸들러
// (위의 '*' 라우트 때문에 GET 요청은 여기까지 오지 않지만,
// API 경로나 다른 메서드 요청이 실패했을 때를 위해 남겨둠)
app.use(function(req, res, next) {
  next(createError(404));
});

// 5. 일반 에러 핸들러
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;