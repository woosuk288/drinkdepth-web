import React from 'react';
import Head from 'next/head';

const locales = {
  en: 'en_US',
  ko: 'ko_KR',
} as const;

type MetaProps = {
  data: {
    locale?: keyof typeof locales;
    title: string;
    description: string;
    image?: string;
    type?: string;
    width?: number;
    height?: number;
    canonical?: string;
  };
};

const Meta = ({ data }: MetaProps) => {
  const lang = data.locale ? locales[data.locale] : locales['ko'];
  const title = data.title;
  const description = data.description;
  const image = data.image !== undefined && `${data.image}`;
  const canonical = data.canonical
    ? `https://drinkdepth.com/${data.canonical}`
    : 'https://drinkdepth.com';
  const type = data.type === undefined ? 'website' : data.type;
  const width = data.image && (data.width || 1200);
  const height = data.image && (data.height || 630);

  return (
    <Head>
      {/* <html lang={lang} /> */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {image ? <link rel="image_src" href={image} /> : null}
      {image ? <meta itemProp="image" content={image} /> : null}

      <meta property="og:site_name" content="YOUR WEB SITE" />
      <meta property="og:title" content={title} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:locale" content={lang} />
      <meta property="og:type" content={type} />
      {image ? <meta property="og:image" content={image} /> : null}
      {width ? (
        <meta property="og:image:width" content={width.toString()} />
      ) : null}
      {height ? (
        <meta property="og:image:height" content={height.toString()} />
      ) : null}
      <meta property="fb:pages" content="YOUR WEB SITE" />

      {/* change type of twitter if there is no image? */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description ? (
        <meta name="twitter:description" content={description} />
      ) : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
      <meta name="twitter:site" content="@YOURWEBSITE" />
      {canonical ? (
        <link rel="alternate" href={data.canonical} hrefLang={lang} />
      ) : null}
    </Head>
  );
};

export default Meta;
