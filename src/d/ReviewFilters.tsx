import Selector from 'src/o2o/place/Selector';
import { FILTERED_COFFEE, OTHER_DRINK } from 'src/utils/constants';
import RadioGroupRating from './RadioGroupRating';

function ReviewFilters() {
  return (
    <>
      <div
        css={{
          display: 'flex',
          margin: '0.5rem',
          marginTop: 0,
          '& > .MuiFormControl-root': { flex: 1 },
          '& .MuiFormHelperText-root': { fontSize: 14, position: 'relative' },
          '& .MuiSvgIcon-root': {
            position: 'absolute',
            paddingBottom: '0.5rem',
          },
        }}
      >
        {/* 종류, 원산지 */}
        <Selector
          helperText="종류"
          tooltip="커피 전문점 이용 기준 성인 기준 1일 1잔~ 2잔 사이 추천드립니다. 카페인은 과다 섭취시 카페인 중독,불면증 등 여러 질환을 유발할 수 있습니다."
          name="type"
          value={[]}
          options={[
            { label: '원두커피', value: FILTERED_COFFEE },
            { label: '그 외 음료', value: OTHER_DRINK },
          ]}
          // handleChange={handleChange}
          handleChange={() => {}}
          // disabled={disabled}
        />

        <Selector
          helperText="원산지"
          tooltip="커피 전문점 이용 기준 성인 기준 1일 1잔~ 2잔 사이 추천드립니다. 카페인은 과다 섭취시 카페인 중독,불면증 등 여러 질환을 유발할 수 있습니다."
          name="country"
          value={[]}
          options={[
            { label: '에티오피아', value: 'Ethiopia' },
            { label: '케냐', value: 'Kenya' },
            { label: '브라질', value: 'Brazil' },
            { label: '콜롬비아', value: 'Colombia' },
            { label: '과테말라', value: 'Guatemala' },
            { label: '베트남', value: 'Vietnam' },
            { label: '인도네시아', value: 'Indonesia' },
            { label: '인도', value: 'India' },
          ]}
          // handleChange={handleChange}
          handleChange={() => {}}
          // disabled={disabled}
        />

        <Selector
          helperText="가공방식"
          tooltip="워시드 등..."
          name="process"
          value={[]}
          options={[
            { label: '워시드', value: '워시드' },
            { label: '내추럴', value: '내추럴' },
            { label: '허니', value: '허니' },
            { label: '무산소 발효', value: '무산소 발효' },
            { label: '웻홀링', value: '웻홀링' },
            { label: '펄프트 내추럴', value: '펄프트 내추럴' },
          ]}
          // handleChange={handleChange}
          handleChange={() => {}}
          // disabled={disabled}
        />
      </div>

      {/* 만족도 */}
      <div css={{ marginTop: '2rem', textAlign: 'center' }}>
        <RadioGroupRating
          name="rating"
          value={0}
          // onChange={handleRatingChange}
          onChange={() => {}}
        />
      </div>

      {/* <div css={{ display: 'flex', margin: '0.5rem', '& > *': { flex: 1 } }}>
        <Selector
          helperText="만족도"
          tooltip="커피 전문점 이용 기준 성인 기준 1일 1잔~ 2잔 사이 추천드립니다. 카페인은 과다 섭취시 카페인 중독,불면증 등 여러 질환을 유발할 수 있습니다."
          name="rating"
          value={[]}
          options={[
            { label: '대박', value: '5' },
            { label: '만족', value: '4' },
            { label: '괜찮음', value: '3' },
            { label: '별로', value: '2' },
            { label: '불만', value: '1' },
          ]}
          // handleChange={handleChange}
          handleChange={() => {}}
          // disabled={disabled}
        />
        <div></div>
      </div> */}
    </>
  );
}
export default ReviewFilters;
