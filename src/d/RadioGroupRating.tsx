import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Typography } from '@mui/material';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

type Props = {
  name: string;
  value: number | null;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => void;
};

export default function RadioGroupRating({ name, value, onChange }: Props) {
  console.log('value : ', value);

  return (
    <>
      <StyledRating
        name={name}
        onChange={onChange}
        defaultValue={3}
        value={value}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
        sx={{ svg: { fontSize: '3rem' } }}
      />

      <Typography variant="h6">{getRatingText(value)}</Typography>
    </>
  );
}

const getRatingText = (rating: number | null) => {
  return rating === 1
    ? '별로'
    : rating === 2
    ? '다른 거 먹을듯'
    : rating === 3
    ? '괜찮음'
    : rating === 4
    ? '또 먹고 싶음'
    : rating === 5
    ? '대박'
    : '';
};
