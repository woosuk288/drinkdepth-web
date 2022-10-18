import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

const tempImages = [
  'https://source.unsplash.com/random/480x480/?cafe',
  'https://source.unsplash.com/random/480x480/?coffee',
  'https://source.unsplash.com/random/480x480/?cake',
];

type BannerCarouselProps = {
  imageURLs?: string[];
};

function BannerCarousel({ imageURLs = tempImages }: BannerCarouselProps) {
  return (
    <Carousel indicators={imageURLs.length > 1}>
      {imageURLs.map((image, i) => (
        <div
          key={i}
          style={{ content: '""', display: 'block', paddingBottom: '100%' }}
        >
          <img
            src={image}
            alt={'사진' + (i + 1)}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}
export default BannerCarousel;
