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
    <div>
      <Carousel indicators={imageURLs.length > 1}>
        {imageURLs.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={'사진' + (i + 1)}
            style={{ width: '100%' }}
          />
        ))}
      </Carousel>
    </div>
  );
}
export default BannerCarousel;
