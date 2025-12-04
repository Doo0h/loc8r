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

// 🔽🔽🔽 [수정] CORS 설정 (OPTIONS 요청 처리 추가) 🔽🔽🔽
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // [중요!] 브라우저가 "보내도 돼?"(OPTIONS)라고 물어보면 "ㅇㅇ(200 OK)"라고 답해주는 코드
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


// 🔼🔼🔼 [수정] CORS 설정 (OPTIONS 요청 처리 추가) 🔼🔼🔼
// 1. API 라우트 (가장 먼저 처리)
app.use('/api', apiRouter);

// 2. Angular 라우트 (API가 아닌 요청 처리)
app.get(/(\/about)|(\/location\/[a-z0-9]{24})/, function(req, res, next) {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

// 3. [위치 수정됨] 인증 에러(UnauthorizedError) 전용 핸들러
// (반드시 라우트들보다 뒤에 있어야 함)
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message" : err.name + ": " + err.message});
  }
});

// 4. [위치 수정됨] 404 에러 핸들러 (마지막에 위치)
// 위에서 처리되지 않은 요청은 404로 간주
app.use(function(req, res, next) {
  next(createError(404));
});

// 5. 일반 에러 핸들러
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;