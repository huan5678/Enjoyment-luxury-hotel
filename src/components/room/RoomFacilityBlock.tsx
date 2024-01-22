import { Grid, Stack, Typography } from '@mui/material';
import Check from '@mui/icons-material/Check';

interface RoomFacilityBlockProp {
  facilities: {
    title: string;
    isProvide: boolean;
  }[];
}

export default function RoomFacilityBlock(props: RoomFacilityBlockProp) {
  const { facilities } = props;

  return (
    <Grid container spacing={1} columnSpacing={5} width="100%">
      {facilities.map(
        (item) =>
          item.isProvide && (
            <Grid item sm={6} lg={2.4} key={item.title}>
              <Stack direction="row">
                <Check color="primary" sx={{ fontSize: 24 }} />
                <Typography variant="title" ml={1}>
                  {item.title}
                </Typography>
              </Stack>
            </Grid>
          ),
      )}
    </Grid>
  );
}
