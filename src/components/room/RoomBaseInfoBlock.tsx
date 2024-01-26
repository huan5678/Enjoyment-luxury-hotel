import { Grid } from '@mui/material';
import AspectRatio from '@mui/icons-material/AspectRatio';
import Bed from '@mui/icons-material/Bed';
import Person from '@mui/icons-material/Person';
import SquareCard from './SquareCard';

import { SquareCardProps } from '@/app/(room)/room-type/_aggregation';

export default function RoomBaseInfoBlock(props: { areaInfo: string; bedInfo: string; maxPeople: number }) {
  const graphicalData: SquareCardProps[] = [
    {
      title: props.areaInfo,
      children: <AspectRatio />,
    },
    {
      title: props.bedInfo,
      children: <Bed />,
    },
    {
      title: `${props.maxPeople}人`,
      children: <Person />,
    },
  ];

  return (
    <Grid container spacing={2}>
      {graphicalData.map((item) => (
        <Grid item key={item.title}>
          <SquareCard title={item.title}>{item.children}</SquareCard>
        </Grid>
      ))}
    </Grid>
  );
}