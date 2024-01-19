import { Box, Stack, Typography } from '@mui/material';

interface HeadlineProps {
  title: string;
}

export default function Headline(props: HeadlineProps) {
  const { title } = props;
  return (
    <Box display="flex" alignItems="center">
      <Stack
        sx={{
          width: '4px',
          height: '24px',
          mr: '12px',
          bgcolor: 'primary.main',
          borderRadius: '10px',
        }}
      />
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
}
