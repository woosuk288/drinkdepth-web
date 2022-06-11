import {
  Avatar,
  Box,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import KaKaoMap from '../../src/o2o/KakaoMap';

const O2OPage: NextPage = () => {
  const router = useRouter();

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Box>
        <KaKaoMap latitude={33.450701} longitude={126.570667} />
      </Box>

      <Box sx={{ display: 'flex', overflow: 'auto' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-caffein-label">Age</InputLabel>
          <Select
            labelId="select-caffein-label"
            id="demo-simple-select-disabled"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {/* <FormHelperText>Disabled</FormHelperText> */}
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-caffein-label">Age</InputLabel>
          <Select
            labelId="select-caffein-label"
            id="demo-simple-select-disabled"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {/* <FormHelperText>Disabled</FormHelperText> */}
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-caffein-label">Age</InputLabel>
          <Select
            labelId="select-caffein-label"
            id="demo-simple-select-disabled"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {/* <FormHelperText>Disabled</FormHelperText> */}
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-caffein-label">Age</InputLabel>
          <Select
            labelId="select-caffein-label"
            id="demo-simple-select-disabled"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {/* <FormHelperText>Disabled</FormHelperText> */}
        </FormControl>
      </Box>

      <Typography
        variant="subtitle2"
        sx={{
          display: 'flex',
          marginLeft: '1.25rem',
          '& > *': { marginRight: '1rem' },
        }}
      >
        <div>장소 2</div>
        <div>음료 4</div>
        <div>적합도 60%</div>
      </Typography>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          '& .MuiAvatar-root': { border: '0.1px solid' },
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://d2wosiipoa41qn.cloudfront.net/GZsNrVkBJBD7ACgU0-a1Y7q9Ils=/200x200/s3.ap-northeast-2.amazonaws.com/koke-uploads/images/20210616/1e311a03bda54536b1f68741ea9b3e17.png"
              sx={{ width: 48, height: 48 }}
            />
          </ListItemAvatar>
          <ListItemText
            primary="원더월 커피 로스터스"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Travis Howard"
              src="https://d2wosiipoa41qn.cloudfront.net/rIBxE3yv0pPk-yPgNRtRkYAJDzM=/200x200/s3.ap-northeast-2.amazonaws.com/koke-uploads/images/20210407/42eba708c1944b21ad579422bb4eeab0.png"
              sx={{ width: 48, height: 48 }}
            />
          </ListItemAvatar>
          <ListItemText
            primary="언더프레셔"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Cindy Baker"
              src="https://d2wosiipoa41qn.cloudfront.net/xMquZT5Oe8H21G95qROoIjf-tKM=/200x200/s3.ap-northeast-2.amazonaws.com/koke-uploads/images/20210528/db4d3d8aa1014e739ff651f24994d35f.png"
              sx={{ width: 48, height: 48 }}
            />
          </ListItemAvatar>
          <ListItemText
            primary="나무사이로"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default O2OPage;
