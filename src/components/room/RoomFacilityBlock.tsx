import { Grid, Stack, Typography } from '@mui/material';
import Check from '@mui/icons-material/Check';

interface RoomFacilityBlockProp {
  facilities: string[];
}

export default function RoomFacilityBlock(props: RoomFacilityBlockProp) {
  const { facilities } = props;

  return (
    <Grid container spacing={1} columnSpacing={5} width="100%">
      {facilities.map((title) => (
        <Grid item sm={6} md={2.4} key={title}>
          <Stack direction="row">
            <Check color="primary" sx={{ fontSize: 24 }} />
            <Typography variant="title" ml={1}>
              {title}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
