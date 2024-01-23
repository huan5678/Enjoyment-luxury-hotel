import { Box, IconButton, Typography } from '@mui/material';
import { SquareCardProps } from '@/app/(room)/room-type/_aggregation';

function SquareCard(props: SquareCardProps) {
  const { title, children } = props;

  return (
    <>
      <Box
        width={97}
        height={97}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{
          p: '20.5px 16px',
          backgroundColor: '#fff',
          borderRadius: '8px',
        }}>
        <IconButton color="primary" size="large" sx={{ p: 0, cursor: 'auto', '&:hover': 'none' }}>
          {children}
        </IconButton>
        <Typography variant="title" mt={1}>
          {title}
        </Typography>
      </Box>
    </>
  );
}

export default SquareCard;
