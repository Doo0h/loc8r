require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const cors = require('cors'); // cors 위치 이동

require('./app_api/models/db');
require('./app_api/config/passport');

const apiRouter = require('./app_api/routes/index');

var app = express();

// 🔽🔽🔽 [수정 포인트 1] CORS 설정을 가장 먼저 실행 🔽🔽🔽
// 복잡한 수동 설정 대신 이 라이브러리 하나면 충분합니다.
const corsOptions = {
  origin: '*', // 모든 주소 허용 (개발용)
  credentials: true, // 인증 정보(쿠키 등) 포함 허용
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// 🔼🔼🔼 [수정 끝] 🔼🔼🔼


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


// 1. API 라우트
app.use('/api', apiRouter);

// 2. Angular 라우트 (새로고침 시 404 방지용)
app.get(/(\/about)|(\/location\/[a-z0-9]{24})/, function(req, res, next) {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

// 3. 인증 에러 핸들러
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message" : err.name + ": " + err.message});
  } else {
      next(err); // 다른 에러는 다음 핸들러로 넘김
  }
});

// 4. 404 에러 핸들러
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