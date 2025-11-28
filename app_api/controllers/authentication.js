const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// 회원가입 (Register) 컨트롤러 - async/await 적용
const register = async (req, res) => {
  // 1. 필수 입력값 검증
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ "message": "All fields required" });
  }

  try {
    // 2. 사용자 인스턴스 생성 및 정보 설정
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password); // 비밀번호 암호화

    // 3. 데이터베이스에 저장 (비동기)
    await user.save();

    // 4. 성공 시 JWT 토큰 생성 및 응답
    const token = user.generateJwt();
    res
      .status(200)
      .json({ token });

  } catch (err) {
    // 5. 에러 처리
    res
      .status(404)
      .json(err);
  }
};

// 로그인 (Login) 컨트롤러
const login = (req, res) => {
  // 1. 필수 입력값 검증
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ "message": "All fields required" });
  }

  // 2. Passport를 사용한 인증 ('local' 전략)
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // Passport 인증 중 에러 발생
      return res
        .status(404)
        .json(err);
    }

    if (user) {
      // 인증 성공: JWT 토큰 생성 및 응답
      const token = user.generateJwt();
      res
        .status(200)
        .json({ token });
    } else {
      // 인증 실패 (사용자 없음 또는 비밀번호 틀림)
      res
        .status(401)
        .json(info);
    }
  })(req, res); // authenticate는 미들웨어를 반환하므로 (req, res)를 호출해줘야 함
};

module.exports = {
  register,
  login
};