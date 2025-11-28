const mongoose = require('mongoose');

// 🔽🔽🔽 [이미지 반영] reviewSchema 수정 🔽🔽🔽
const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0, // 이미지의 'A'는 오타로 판단, 0으로 유지
    max: 5
  },
  reviewText: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    'default': Date.now
  }
});
// 🔼🔼🔼 [이미지 반영] reviewSchema 수정 🔼🔼🔼

const openingTimeSchema = new mongoose.Schema({
  days: {type: String, required: true},
  opening: String,
  closing: String,
  closed: {type: Boolean, required: true}
});

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  rating: {
    type: Number,
    'default': 0,
    min: 0,
    max: 5
  },
  facilities: [String],
  // DB에는 이 GeoJSON 구조가 그대로 유지됩니다. (중요!)
  coords: {
    type: { type: String },
    coordinates: [Number]
  },
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema] // <- 수정된 reviewSchema가 여기에 적용됩니다.
}, { 
  toJSON: {
    transform: function (doc, ret) {
      // JSON으로 변환될 때 'coords' 필드를 조작합니다.
      // ret.coords.coordinates 배열을 ret.coords에 덮어씁니다.
      ret.coords = ret.coords.coordinates;
      return ret;
    }
  }
});

mongoose.model('Location', locationSchema);