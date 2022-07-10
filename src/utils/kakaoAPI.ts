/**
 * 주소로 장소 표시하기
 * @param addressName 한글 주소 입력
 * @returns 위도, 경도, 주소 이름 담긴 객체
 */

type getAddressXYType = {
  y: string | null;
  x: string | null;
  address_name: string;
};

export const getAddressXY = (
  addressName: string
): Promise<getAddressXYType> => {
  return new Promise((resolve, reject) => {
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new window.kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(
      addressName,
      // '제주특별자치도 제주시 첨단로 242',
      function (result: any, status: string) {
        console.log('result : ', result);
        console.log('status : ', status);
        console.log(
          'window.kakao.maps.services.Status.OK : ',
          window.kakao.maps.services.Status.OK
        );

        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({
            y: result[0].y,
            x: result[0].x,
            address_name: result[0].address_name,
          });
        } else if (
          window.kakao.maps.services.Status.OK === 'OK' &&
          status === 'ZERO_RESULT'
        ) {
          resolve({
            y: null,
            x: null,
            address_name: addressName,
          });
        } else {
          reject('주소 좌표를 가져오는 중 오류!');
        }
      }
    );
  });
};
