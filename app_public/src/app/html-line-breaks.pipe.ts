import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlLineBreaks'
})
export class HtmlLineBreaksPipe implements PipeTransform {

  // 🔽🔽🔽 [이미지 반영] transform 메서드 수정 🔽🔽🔽
  transform(text: string): string {
    // 입력 텍스트를 문자열로 받고, \n을 <br>로 바꾼 문자열을 반환합니다.
    return text.replace(/\n/g, '<br>');
  }
  // 🔼🔼🔼 [이미지 반영] transform 메서드 수정 🔽🔽🔽
}