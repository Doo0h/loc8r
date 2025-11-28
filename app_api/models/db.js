const mongoose = require('mongoose');
const readline = require('readline');
mongoose.set("strictQuery", false);

// [주석 처리] 로컬 DB
//const dbURI = 'mongodb://localhost/Loc8r';

// .env 파일에서 비밀번호를 가져옵니다.
const dbPassword = process.env.MONGODB_PASSWORD;

// 🔽🔽🔽 [수정] dbURI를 사용자 본인의 Atlas 주소로 변경 🔽🔽🔽
const dbURI = `mongodb+srv://2021810009endud:${dbPassword}@2021810009kimdooyoung.nsfo88v.mongodb.net/Loc8r`;
// 🔼🔼🔼 [수정] dbURI를 사용자 본인의 Atlas 주소로 변경 🔼🔼🔼


const connect = () => {
  setTimeout(() => mongoose.connect(dbURI), 1000);
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ' + err);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

if (process.platform === 'win32') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

connect();

// 🚩 모델 등록
require('./locations');
require('./users')