// sitemap-cafes.js

// 필요한 모듈 로드
// const axios = require('axios');
const fs = require('fs');
const prettier = require('prettier');

// 오늘 날짜 가져오기 & 도메인 설정
const getDate = new Date().toISOString();
const DRINKDEPTH_DOMAIN = 'https://drinkdepth.com';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });
(async () => {
  let response = [];

  // // axios를 이용해 cafe 리스트 가져오기
  // // <API_DOAMIN>, <API_NAME> 등은 실제 값이 아닙니다!
  // await axios({
  //   method: 'post',
  //   url: 'https://<API_DOMAIN>/<API_NAME>',
  //   headers: {
  //     'Content-Type': 'application/graphql',
  //     // 'Authorization': [------------]
  //   },
  //   data: `{
  //   <GraphQL_APINAME> (
  //     ...
  //   ){
  //     title
  // 		...
  //   }
  // }`,
  // })
  //   .then((res) => {
  //     response = res.data.data.GraphQL_APINAME;
  //   })
  //   .catch((e) => {
  //     console.log(e.response.data);
  //   });

  // 내 경우 일단 로컬 파일에서 데이터 가져옴
  const data = fs.readFileSync('../cafes.db');
  response = JSON.parse(data);

  const cafeList = [];

  // 적절히 파싱
  response.forEach((cafe) => cafeList.push({ id: cafe.id, name: cafe.name }));

  // 요것도 xml 구조에 맞게 파싱하여 재조립
  const cafeListSitemap = `
    ${cafeList
      .map((cafe) => {
        return `
          <url>
            <loc>${`${DRINKDEPTH_DOMAIN}/cafe/${cafe.id}`}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`;
      })
      .join('')}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
      <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${cafeListSitemap}
    </urlset>
  `;

  // const formattedSitemap = [formatted(generatedSitemap)];
  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync(
    '../public/sitemap/sitemap-cafes.xml',
    formattedSitemap,
    'utf8'
  );
})();
