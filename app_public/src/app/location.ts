// 🔽🔽🔽 [수정] export 키워드 추가 🔽🔽🔽
export class Review {
  author!: string;
  rating!: number;
  reviewText!: string;
}
// 🔼🔼🔼 [수정] export 키워드 추가 🔼🔼🔼

// 🔽🔽🔽 [수정] export 키워드 추가 (만약 있다면) 🔽🔽🔽
export class OpeningTimes {
  days!: string;
  opening!: string;
  closing!: string;
  closed!: boolean;
}
// 🔼🔼🔼 [수정] export 키워드 추가 🔼🔼🔼

export class Location {
  _id!: string;
  name!: string;
  distance!: number;
  address!: string;
  rating!: number;
  facilities!: string[];
  reviews!: Review[]; // 이제 Review를 사용할 수 있습니다.
  coords!: number[];
  openingTimes!: OpeningTimes[];
}