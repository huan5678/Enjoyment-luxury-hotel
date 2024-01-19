import { Box, IconButton, Typography } from '@mui/material';

interface SquareCardProps {
  title: string;
  children: React.ReactNode;
}

function SquareCard(props: SquareCardProps) {
  const { title, children } = props;

  return (
    <>
      <Box
        width={97}
        height={97}
        sx={{
          p: '20.5px 16px',
          borderRadius: '8px',
          border: '1px solid ',
          borderColor: 'primary.light',
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
