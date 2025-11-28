const express = require('express');
const router = express.Router();
// [이미지 11.15 반영] express-jwt 모듈 가져오기 및 설정
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'], // default algorithm
  userProperty: 'req.auth' // [이미지 11.15 반영] req.auth로 설정
});

const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlAuth = require('../controllers/authentication');

// locations
router
  .route('/locations')
  .get(ctrlLocations.locationsListByDistance)
  .post(ctrlLocations.locationsCreate);

router
  .route('/locations/:locationid')
  .get(ctrlLocations.locationsReadOne)
  .put(ctrlLocations.locationsUpdateOne)
  .delete(ctrlLocations.locationsDeleteOne);

// reviews
router
  .route('/locations/:locationid/reviews')
  // [이미지 11.16 반영] 리뷰 생성 시 인증(auth) 미들웨어 추가
  .post(auth, ctrlReviews.reviewsCreate);

router
  .route('/locations/:locationid/reviews/:reviewid')
  .get(ctrlReviews.reviewsReadOne)
  // [이미지 11.16 반영] 리뷰 수정/삭제 시 인증(auth) 미들웨어 추가
  .put(auth, ctrlReviews.reviewsUpdateOne)
  .delete(auth, ctrlReviews.reviewsDeleteOne);

// 인증 (Authentication) 라우트
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;