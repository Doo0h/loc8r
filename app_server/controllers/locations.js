const request = require('request');

// ✅ 개발/운영 환경에 따른 API 서버 주소 설정
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  // 🔽🔽🔽 [수정] 2번에서 복사한 'loc8r-api'의 주소를 여기에 붙여넣기 🔽🔽🔽
  apiOptions.server = 'https://loc8r-api-r4bb.onrender.com';
}

// ⭐ 거리를 m 또는 km 단위의 문자열로 변환하는 함수
const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = 'm';
  if (distance > 1000) {
    thisDistance = parseFloat(distance / 1000).toFixed(1);
    unit = 'km';
  } else {
    thisDistance = Math.floor(distance);
  }
  return thisDistance + unit;
};

// ✅ 홈페이지 렌더링 함수
const renderHomepage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else if (!responseBody.length) {
    message = "No places found nearby";
  }
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r-2021810009 Kim Dooyoung',
      strapLine: 'Find places to work with wifi near you!'
    },
    sidebar:
      "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    locations: responseBody,
    message
  });
};

// ✅ API로부터 위치 목록을 가져오는 컨트롤러
const homelist = (req, res) => {
  const path = '/api/locations';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: true,
    qs: {
      lng: 127.256666,
      lat: 37.010858,
      maxDistance: 200000
    }
  };

  request(requestOptions, (err, response, body) => {
    let data = [];
    if (response.statusCode === 200 && body && body.length) {
      data = body.map((item) => {
        item.distance = formatDistance(item.distance);
        return item;
      });
    }
    renderHomepage(req, res, data);
  });
};

// ⭐ 상세 페이지 렌더링 함수
const renderDetailPage = (req, res, location) => {
  res.render('location-info', {
    title: location.name,
    pageHeader: {
      title: location.name
    },
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
    },
    location
  });
};

// API에서 위치 상세 정보를 가져오는 공통 함수
const getLocationInfo = (req, res, callback) => {
  const path = `/api/locations/${req.params.locationid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: true
  };
  request(requestOptions, (err, {statusCode}, body) => {
    let data = body;
    if (statusCode === 200) {
      data.coords = {
        lng: body.coords[0],
        lat: body.coords[1]
      };
      callback(req, res, data);
    } else {
      showError(req, res, statusCode);
    }
  });
};

// locationInfo 컨트롤러
const locationInfo = (req, res) => {
  getLocationInfo(req, res, (req, res, responseData) => {
    renderDetailPage(req, res, responseData);
  });
};

// 에러 페이지
const showError = (req, res, status) => {
  let title = '';
  let content = '';
  if (status === 404) {
    title = '404, page note found';
    content = 'Oh dear. Looks like you can\'t find this page. Sorry.';
  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, hase gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title,
    content
  });
};

// 🔽🔽🔽 [이미지 7.26 반영] renderReviewForm 함수 수정 🔽🔽🔽
const renderReviewForm = function (req, res, locationData) {
  res.render('location-review-form', {
    title: `Review ${locationData.name} on Loc8r`,
    pageHeader: { title: `Review ${locationData.name}` },
    // pug에서 폼 action URL을 만들 수 있도록 locationid를 전달
    locationid: locationData._id,
    // [추가] 쿼리스트링의 err 값을 뷰로 전달
    error: req.query.err
  });
};
// 🔼🔼🔼 [이미지 7.26 반영] renderReviewForm 함수 수정 🔼🔼🔼

// ✅ 리뷰 작성 페이지 컨트롤러
const addReview = (req, res) => {
  getLocationInfo(req, res, (req, res, responseData) => {
    renderReviewForm(req, res, responseData);
  });
};

// 🔽🔽🔽 [이미지 7.27 반영] doAddReview 함수 수정 🔽🔽🔽
const doAddReview = (req, res) => {
  const locationid = req.params.locationid;
  const path = `/api/locations/${locationid}/reviews`;
  const postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };

  // [추가] API로 보내기 전 app_server 레벨에서 먼저 유효성 검사
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect(`/location/${locationid}/review/new?err=val`);
  } else {
    // 유효성 검사를 통과한 경우에만 API 요청 전송
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'POST',
      json: postdata
    };
    request(
      requestOptions,
      (err, {statusCode}, {name}) => {
        if (statusCode === 201) {
          res.redirect(`/location/${locationid}`);
        } else if (statusCode === 400 && name && name === 'ValidationError') {
          // API 레벨의 유효성 검사 실패 시 (예: Mongoose required)
          res.redirect(`/location/${locationid}/review/new?err=val`);
        } else {
          showError(req, res, statusCode);
        }
      }
    );
  }
};
// 🔼🔼🔼 [이미지 7.27 반영] doAddReview 함수 수정 🔼🔼🔼

// ✅ 모듈 내보내기
module.exports = {
  homelist,
  locationInfo,
  addReview,
  doAddReview
};