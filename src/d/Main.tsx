import Box, { BoxProps } from '@mui/material/Box';

function Main(props: BoxProps) {
  const { sx: sxProps, children, ...rest } = props;

  return (
    <Box
      {...rest}
      sx={{
        maxWidth: 'sm',
        marginX: 'auto',
        paddingY: { xs: '44px' /* , md: '64px' */ },
        ...sxProps,
      }}
    >
      {children}
    </Box>
  );
}
export default Main;
