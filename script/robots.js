/**
 * robots.txt 생성하기
 */

// robots.js
const fs = require('fs');

const generatedSitemap = `
User-agent: *
Disallow: /admin/
Disallow: /user/
Disallow: /order/
`;

fs.writeFileSync('../public/robots.txt', generatedSitemap, 'utf8');
