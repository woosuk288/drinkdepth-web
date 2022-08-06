/**
 * 정적 페이지에 대한 Sitemap 생성하기
 */

// sitemap-common.js

// 패키지 설치
const fs = require('fs');
// const globby = require('globby');
const prettier = require('prettier');

// 오늘 날짜 가져오기 & 도메인 설정
const getDate = new Date().toISOString();
const DRINKDEPTH_DOMAIN = 'https://drinkdepth.com';

//
const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const { globby } = await import('globby');

  // 포함할 페이지와 제외할 페이지 등록

  const pages = await globby([
    // include

    '../pages/index.tsx',
    '../pages/cafe/landing.tsx',
    '../pages/o2o/index.tsx',
    '../pages/o2o/place.tsx',
    // '../pages/**/*.tsx',
    // '../pages/*.tsx',

    // exclude
    '!../pages/_app.tsx',
    '!../pages/_document.tsx',
    '!../pages/_error.tsx',
    '!../pages/404.tsx',
    '!../pages/about.tsx',
    '!../pages/user.tsx',

    '!../pages/admin/*.tsx',
    '!../pages/api/*.tsx',

    '!../pages/community/*.tsx',
    '!../pages/chat/*.tsx',
    '!../pages/order/*.tsx',
    '!../pages/payment/*.tsx',
    // (...중간 생략)
    '!../pages/**/[*.tsx',
    // '!../pages/**/[t_id]/**/*.tsx',
  ]);

  // 파일 경로를 도메인 형태로 변경
  // ../pages/category/index.tsx -> https://drinkdepth.com/category
  // ../pages/community/threads -> https://drinkdepth.com/community/threads
  const pagesSitemap = `
    ${pages
      .map((page) => {
        const path = page
          .replace('../pages/', '')
          .replace('.tsx', '')
          .replace(/\/index/g, '');
        const routePath = path === 'index' ? '' : path;
        return `
          <url>
            <loc>${DRINKDEPTH_DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
      })
      .join('')}
  `;

  const generatedSitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${pagesSitemap}
  </urlset>
 `;

  // const formattedSitemap = [formatted(generatedSitemap)];
  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync(
    '../public/sitemap/sitemap-common.xml',
    formattedSitemap,
    'utf8'
  );
})();
