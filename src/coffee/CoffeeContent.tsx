import React from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import FlavorRating from './FlavorRating';

import CoffeeFeatureItem from './CoffeeFeatureItem';
import GridTextMfrInfo from './GridTextMfrInfo';

import CoffeeItem from './CoffeeItem';
import DescriptionItem from './DescriptionItem';
import { Coffee } from '../types';

type CoffeeContentProps = {
  coffee: Coffee;
};

function CoffeeContent({ coffee }: CoffeeContentProps) {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {/* CoffeeSectionA.tsx */}
      <Box
        sx={{
          pt: { xs: '1rem', sm: '4rem' },
          pb: '4rem',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          // alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            flex: 1,
            // boxShadow: 'none',
          }}
        >
          <Image
            src={coffee.main_image}
            alt={`${coffee.name}의 이미지`}
            layout="responsive"
            width={500}
            height={500}
          />
        </Box>
        <Box ml={{ sm: '2rem', flex: 1 }}>
          <Typography
            variant="h1"
            fontSize={30}
            fontWeight={600}
            textAlign={{ xs: 'center', sm: 'left' }}
            gutterBottom
          >
            {coffee.name}
          </Typography>
          <Typography
            variant="body1"
            textAlign={{ xs: 'center', sm: 'left' }}
            height={{ sm: '10vw' }}
            mb={{ xs: '1rem', md: '2rem' }}
          >
            {coffee.description}
          </Typography>

          <Box sx={{ boxShadow: '0 0 3px 1px rgb(0 0 0 / 12%)' }}>
            <List>
              <ListItem>
                <ListItemText
                  primary="배송료 3,000원"
                  secondary="같은 판매자 제품 50,000원 이상 구매 시 무료배송"
                />
              </ListItem>
            </List>
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: '1.5rem', textAlign: 'right' }}
            >
              샘플 주문하기
            </Button>
          </Box>

          <Box sx={{ py: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              fontSize={20}
              component="span"
              sx={{ alignSelf: 'flex-end' }}
            >
              1Kg
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              size="large"
              sx={{ fontWeight: 700, ml: 1 }}
            >
              ₩ 납품 최저가 확인하기
            </Button>
          </Box>
          <Box
            sx={{
              // p: 2,
              // position: 'fixed',
              // bottom: 0,
              // left: 0,
              // right: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                fontSize: 18,
                fontWeight: 700,
                height: 48,
                width: '100%',
                maxWidth: 400,
              }}
            >
              장바구니
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: 18,
                fontWeight: 700,
                height: 48,
                width: '100%',
                maxWidth: 400,
                ml: 2,
              }}
            >
              구매하기
            </Button>
          </Box>
        </Box>
      </Box>

      {/* CoffeeSectionB.tsx */}
      <Box sx={{ my: '4rem' }}>
        <Box display="flex" justifyContent="center">
          <Chip
            label="커피 특징"
            color="secondary"
            sx={{ fontWeight: 700, fontSize: 16 }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mt="0.75rem">
          {coffee.tags.map((t) => (
            <Typography
              key={t}
              fontSize={20}
              fontWeight={600}
              sx={{ px: '0.5rem' }}
            >
              #{t}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            p: '1rem 0.75rem 1.5rem',
            mt: '1rem',
            boxShadow: 1,
          }}
        >
          <FlavorRating label="바디감" value={coffee.taste_body} />
          <FlavorRating label="단맛" value={coffee.taste_sweet} />
          <FlavorRating label="쓴맛" value={coffee.taste_bitter} />
          <FlavorRating label="신맛" value={coffee.taste_sour} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            p: '1rem 1.5rem',
            mt: '1rem',
            boxShadow: 1,
          }}
        >
          <CoffeeFeatureItem label="유형" value={coffee.type} type="type" />
          <CoffeeFeatureItem
            label="로스팅 정도"
            value={coffee.roasting}
            type="roasting"
          />
          <CoffeeFeatureItem label="로스팅 날짜" value={coffee.roasting_date} />
          <CoffeeFeatureItem label="프로세스" value={coffee.process} />
        </Box>

        <Box textAlign="center" mt="0.5rem">
          <Button endIcon={<CoffeeMakerIcon />}>
            제조사가 추천하는 추출 레시피 보기
          </Button>
        </Box>
      </Box>

      {/* CoffeeSectionC.tsx */}
      <Box sx={{ my: '4rem' }}>
        <Box display="flex" justifyContent="center">
          <Chip
            label="제조사"
            color="secondary"
            sx={{ fontWeight: 700, fontSize: 16 }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mt="0.75rem">
          <Typography fontSize={20} fontWeight={600} sx={{ px: '0.5rem' }}>
            {coffee.brand}
          </Typography>
        </Box>
        <Box
          margin="1.5rem auto"
          maxWidth={(theme) => theme.breakpoints.values.sm}
        >
          <Typography align="center" mb="1.5rem">
            2002년에 시작한 나무사이로는 한 잔의 커피로 우리의 일상이
            풍요로워지기를 바랍니다. <br />
            지속적으로 산지를 방문하여 농부•생산업자와 소통하며 좋은 재료와
            논리적인 로스팅, 철저한 품질관리를 기반으로 커피가 가진 다양한
            매력을 소개합니다.
          </Typography>

          <GridTextMfrInfo
            label="기기"
            value={'프로밧 P60, 프로밧 P25, 트리니타스 T7'}
          />
          <GridTextMfrInfo label="개업" value={'2002년'} />
          <GridTextMfrInfo
            label="주소"
            value={'경기도 성남시 분당구 석운로 33, 나무사이로'}
          />
        </Box>
        <Box
          margin="1.5rem auto"
          maxWidth={(theme) => theme.breakpoints.values.md}
        >
          <MfrImagesWrapper>
            {mfrImages.map((img, key) => (
              <CardMedia image={img} key={key} />
            ))}
          </MfrImagesWrapper>
        </Box>
      </Box>

      {/* CoffeeSectionD.tsx */}
      <Box sx={{ py: '6rem' }}>
        <Box display="flex" justifyContent="flex-end" mt="0.75rem">
          <Typography fontSize={20} fontWeight={600}>
            이 제조사의 다른 음료
          </Typography>
        </Box>
        <ImageList
          sx={{
            p: '0.25rem',
            gap: '1rem !important',
            gridAutoFlow: 'column',
            gridTemplateColumns:
              'repeat(auto-fill,minmax(240px,1fr)) !important',
            gridAutoColumns: 'minmax(240px, 1fr)',
          }}
        >
          {mfrCoffeeImages.map((image) => (
            <ImageListItem>
              <CoffeeItem
                {...coffee}
                sxProps={{
                  '& .MuiCardActions-root': { justifyContent: 'flex-start' },
                }}
              />
              {/* <ImageListItemBar title={image.thumbnail.name} /> */}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Box sx={{ py: '6rem' }}>
        <Box display="flex" justifyContent="flex-end" my="0.75rem">
          <Typography fontSize={20} fontWeight={600}>
            상품 필수 표기 정보
          </Typography>
        </Box>
        <Box mb="3rem" boxShadow={1}>
          <DescriptionItem label="식품의 유형" value="커피" />
          <DescriptionItem
            label="제조원 및 소재지"
            value="나무사이로, 경기도 성남시 분당구 석운로 33"
          />
          <DescriptionItem label="유통기한" value="제조일로부터 1년" />
          <DescriptionItem label="제조일자" value="별도표기" />
          <DescriptionItem label="내용량" value="200g / 1kg" />
          <DescriptionItem
            label="보관 방법"
            value="직사광선을 피하고 서늘하고 건조한 곳"
          />
          <DescriptionItem label="원재료 및 함량" value="아라비카 원두 100%" />
          <DescriptionItem
            label="제품문의 관련 주소 및 전화번호"
            value="드링크뎁스 고객센터 000-0000-0000"
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" my="0.75rem">
          <Typography fontSize={20} fontWeight={600}>
            배송/교환/반품/환불 안내
          </Typography>
        </Box>
        <Box boxShadow={1}>
          <DescriptionItem
            label="배송 안내"
            value={`배송 기간은 결제일로부터 1일 ~ 5일 정도 소요될 수 있습니다.\n제주도를 포함한 도서산간 지역은 추가 배송일과 추가 배송비 입금 요청이 있을 수 있습니다.`}
          />
          <DescriptionItem
            label="교환/반품/환불"
            value={`교환 및 반품은 상품 수령일로부터 7일 이내에 드링크뎁스 고객센터(000-0000-0000)로 접수해 주세요.\n원두(드립백 포함)는 신선 제품입니다. \n고객의 변심에 의한 교환 및 반품은 불가합니다.\n분쇄 옵션 선택 실수로 인한 교환 및 반품은 불가합니다. 제품 하자가 있는 경우 전액이 환불됩니다. (반품 배송비 포함)`}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default CoffeeContent;

const MfrImagesWrapper = styled.div`
  position: relative;
  margin: 48px 0;
  display: grid;
  grid-auto-columns: 200px; /* 반드시! */
  grid-auto-flow: column; /* row 를 가지지않을거라면 반드시! */
  grid-template-rows: 200px;
  grid-gap: 20px;
  justify-content: center;

  .MuiCardMedia-root {
    border-radius: 0.5rem;
  }

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(168px, 300px));
    grid-auto-flow: unset;
    grid-template-rows: repeat(2, minmax(168px, 1fr));
    grid-gap: 8px;
  }
`;
const mfrImages = [
  'https://images.unsplash.com/photo-1585435247026-1d8560423d52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9hc3Rlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1556027654-a05ec60d5a4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvYXN0ZXJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://media.istockphoto.com/photos/coffee-beans-in-a-coffee-roastery-at-work-picture-id1371315210?b=1&k=20&m=1371315210&s=170667a&w=0&h=AH9uHU1GSf8Lf8DvRoQUVZJfQ23ASegXEdn76u6mtYA=',
  'https://media.istockphoto.com/photos/man-opening-roasters-hatch-and-coffee-beans-falling-out-of-roastery-picture-id1364184493?b=1&k=20&m=1364184493&s=170667a&w=0&h=1hdjJirxBezoeuHSCqeYUAKxjMT60_qF26Zx3jhMxeM=',
];

const mfrCoffeeImages = [
  'https://d2wosiipoa41qn.cloudfront.net/rkQndwEJ3sOgPo2I7NFZLoFzzAU=/300x300/s3.ap-northeast-2.amazonaws.com/koke-uploads/images/20210910/c102a13151bb4b94892886d385f28cd4.png',
  'https://d2wosiipoa41qn.cloudfront.net/ZKcRJusnmuAP5JF-_KyKt8wdEV4=/300x300/s3.ap-northeast-2.amazonaws.com/koke-uploads/images/20210910/3eac1483d27242cfae9c736dfb9e584c.png',
  'https://d2wosiipoa41qn.cloudfront.net/k9C5SvLn1Oa2wu6LZuHfF_nRobY=/300x300/s3.ap-northeast-2.amazonaws.com/koke-uploads/images/20210528/3c17de7367c840d1b93dbfc80edbf8df.png',
  'https://d2wosiipoa41qn.cloudfront.net/dKK4dzCi52kce6pvGufkQtwkGKE=/300x300/s3.ap-northeast-2.amazonaws.com/koke-uploads/images/20210528/36d92c6fab6d483993c660f33f87e1ff.png',
];
