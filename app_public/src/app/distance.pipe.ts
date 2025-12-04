// app_public/src/app/distance.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(distance: number): string {

    // 🔽🔽🔽 [수정] 파라미터 n에 'any' 타입을 명시적으로 지정합니다. 🔽🔽🔽
    const isNumeric = function (n: any) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };
    // 🔼🔼🔼 [수정] 파라미터 n에 'any' 타입을 명시적으로 지정합니다. 🔼🔼🔼

    if (distance && isNumeric(distance)) {
      let thisDistance = '0';
      let unit = 'm';

      if (distance > 1000) {
        thisDistance = (distance / 1000).toFixed(1);
        unit = 'km';
      } else {
        thisDistance = Math.floor(distance).toString();
      }
      return thisDistance + unit;
    } else {
      return '?';
    }
  }
}