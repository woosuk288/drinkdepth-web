import Selector from 'src/o2o/place/Selector';
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
            { label: '원두커피', value: 'filtered_coffee' },
            { label: '커피음료', value: 'coffee_drink' },
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
