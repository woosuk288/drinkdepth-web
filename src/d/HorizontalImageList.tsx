import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import theme from 'src/theme';
import { Box, Button } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';

type SingleLineImageListProps = {
  images: ImageType[];
  handleRemove: (index: number) => void;
  onFileChangeCapture: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleThumbnailClick: (index: number) => void;
};

export default function SingleLineImageList({
  images,
  handleRemove,
  onFileChangeCapture,
}: // handleThumbnailClick,
SingleLineImageListProps) {
  return (
    <Box sx={sx.root}>
      <Box component="ul" sx={sx.imageList}>
        {images.map((item, i) => (
          <Box component="li" key={'사진 ' + i + 1} sx={sx.imageItem}>
            <Box
              // onClick={() => handleThumbnailClick(i)}
              sx={sx.image}
              style={{
                backgroundImage: `url('${item.url}')`,
              }}
            ></Box>
            <IconButton
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              size="small"
              onClick={() => handleRemove(i)}
            >
              <CancelOutlinedIcon />
            </IconButton>
          </Box>
        ))}

        {/* 카메라 및 갤러리 */}
        {images.length <= 10 && (
          <>
            <Button
              // variant="outlined"
              color="inherit"
              component="label"
              sx={sx.imageItem}
              style={{ border: '1px dotted' }}
            >
              <AddIcon />
              <input
                hidden
                accept="image/png, image/jpeg"
                multiple
                type="file"
                onChangeCapture={onFileChangeCapture}
              />
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

const sx = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: '100%',
    margin: '-2px',
    display: 'flex',
    paddingY: '2px',
    // padding: '0',
    // flexWrap: "wrap",
    listStyle: 'none',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',

    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },

  imageItem: {
    width: '30%',
    position: 'relative',
    flexShrink: 0,
    marginRight: '2px',

    '&::after': {
      content: '""',
      display: 'block',
      paddingBottom: '100%',
    },
  },

  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
};
