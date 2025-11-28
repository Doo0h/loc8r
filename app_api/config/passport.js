const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email' // 이메일을 username으로 사용
  },
  async (username, password, done) => {
    try {
      // 1. 제공된 이메일(username)로 사용자 찾기
      const user = await User.findOne({ email: username });

      // 2. 사용자가 없는 경우
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }

      // 3. 비밀번호가 틀린 경우 (validPassword 메서드 사용)
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }

      // 4. 성공: 사용자 객체 반환
      return done(null, user);

    } catch (err) {
      // 5. 에러 발생 시
      return done(err);
    }
  }
));