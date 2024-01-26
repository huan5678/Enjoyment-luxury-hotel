import { Box, IconButton, Typography } from '@mui/material';

interface SquareCardProps {
  title: string | number;
  children: React.ReactNode;
  isBorder?: boolean;
}

function SquareCard(props: SquareCardProps) {
  const { title, children, isBorder } = props;

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
          border: isBorder ? '1px solid #F1EAE4' : '',
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
