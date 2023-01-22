import Box, { BoxProps } from '@mui/material/Box';

function Main(props: BoxProps) {
  const { sx: sxProps, children, ...rest } = props;

  return (
    <Box
      {...rest}
      sx={{
        maxWidth: 'sm',
        marginX: 'auto',
        paddingY: '44px',
        ...sxProps,
      }}
    >
      {children}
    </Box>
  );
}
export default Main;
