import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Stack, Typography, Box, styled } from '@mui/material';
import { z } from 'zod';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { citys, zipcodes } from '@/assets/cityData';
import { getUser } from '@/assets/api';
import { postOrder } from '@/assets/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { OrderPostData } from '@/types';

const Form = styled('form', { shouldForwardProp: () => true })(({ theme }) => ({
  '& .MuiInputBase-root': {
    width: '100%',
  },
}));

export const bookerDataSchema = z.object({
  name: z.string().min(1, '名字不能為空'),
  email: z.string().email('請輸入有效的電子郵件地址'),
  phone: z.string().min(3, '電話號碼請填妥'),
  address: z.object({
    detail: z.string().min(5, '地址詳情不能為空'),
    county: z.string().min(1, '區域不能為空').max(3),
    city: z.string().min(1, '城市不能為空'),
  }),
});

const cities = citys;

interface MemberData {
  status: boolean;
  result: {
    address: {
      zipcode: number;
      detail: string;
    };
    _id: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    createdAt: string;
    updatedAt: string;
  };
}

let memberData: MemberData | any = {
  status: true,
  result: {
    address: {
      zipcode: 100,
      detail: '仁愛路四段',
    },
    _id: '65ae04dc14f396e059a9c73a',
    name: 'test',
    email: 'test@test.com',
    phone: '0912345678',
    birthday: '1111-01-01T00:00:00.000Z',
    createdAt: '2024-01-22T06:02:04.932Z',
    updatedAt: '2024-01-22T06:02:04.932Z',
  },
};

const bookerDataTemplate = {
  name: '',
  email: '',
  phone: '',
  address: {
    city: '',
    county: '',
    detail: '',
  },
};

type bookerData = z.infer<typeof bookerDataSchema>;

type locationInfo = {
  detail: string;
  zipcode: number;
  city: string;
  county: string;
};

interface BookerFormProps {
  roomBookInfo: {
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    peopleNum: string;
  };
}

const BookerForm = (roomBookInfo: BookerFormProps) => {
  const [counties, setCounties] = useState<locationInfo[] | []>([]);
  const router = useRouter();
  const token = Cookies.get('token');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<bookerData>({
    resolver: zodResolver(bookerDataSchema),
    defaultValues: bookerDataTemplate,
  });

  async function handleFinalData(finalData: bookerData) {
    let zipcode: number = 102;
    zipcodes.find((item) => {
      if (item.city === finalData.address.city) {
        item.zone.forEach((thing) => {
          if (thing.county === finalData.address.county) {
            zipcode = thing.zipcode;
          }
        });
      }
    });

    const roomInfo = roomBookInfo.roomBookInfo;
    const orderObject: OrderPostData = {
      roomId: roomInfo.roomId,
      checkInDate: roomInfo.checkInDate,
      checkOutDate: roomInfo.checkOutDate,
      peopleNum: Number(roomInfo.peopleNum),
      userInfo: {
        name: finalData.name,
        phone: finalData.phone,
        email: finalData.email,
        address: {
          zipcode: zipcode,
          detail: finalData.address.detail,
        },
      },
    };

    const responseOrderInfo = await postOrder(orderObject);
    if (responseOrderInfo.result !== null) {
      router.push(`/roomBooking/bookingSuccess?id=${responseOrderInfo.result._id as string}`);
    }
  }

  const onSubmit = (data: bookerData) => {
    if (token) {
      try {
        const finalData = { ...data };
        handleFinalData(finalData);
      } catch {
        throw new Error('Fail to submit the form!');
      }
    } else {
      alert('請先登入會員');
    }
  };

  const city = watch('address.city');
  useEffect(() => {
    if (city) {
      const findCity = zipcodes.find((item) => item.city === city);
      const resultCounties = findCity?.zone as locationInfo[];
      setCounties(resultCounties);
    }
  }, [city]);

  const useMemberData = async () => {
    if (token) {
      let userCity: string = '';
      let userCounty: string = '';
      memberData = await getUser();
      const zipcode: number = memberData.result.address.zipcode;
      if (zipcode) {
        const findCity = zipcodes.find((item) => {
          const zones = item.zone;
          zones.find((i) => {
            if (i.zipcode === zipcode) {
              userCity = i.city;
              userCounty = i.county;
              //console.log(userCity, userCounty);
              // 將會員的地址區域放到表單中
            }
          });
        });
      }
      reset(
        {
          name: memberData.result.name,
          email: memberData.result.email,
          phone: memberData.result.phone,
          address: {
            city: userCity,
            county: userCounty,
            detail: memberData.result.address.detail,
          },
        },
        { keepDefaultValues: true },
      );
    } else {
      alert('請先登入會員');
    }
  };

  return (
    <Box component="section">
      <Stack direction={'row'} justifyContent={'space-between'} sx={{ marginBottom: '40px' }}>
        <Typography variant={'h4'} component="h3">
          訂房人資訊
        </Typography>
        <Link onClick={useMemberData} component={'button'} underline={'always'} fontWeight={700}>
          {'套用會員資料'}
        </Link>
      </Stack>
      <Form id="my-form" onSubmit={handleSubmit(onSubmit)} sx={{ marginBottom: '24px' }}>
        <Stack direction={'column'} spacing={'1.5rem'}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                {...field}
                label="姓名"
                error={Boolean(errors.name)}
                helperText={errors.name ? errors.name.message : ''}
                placeholder="請輸入姓名"
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                {...field}
                label="手機號碼"
                error={Boolean(errors.phone)}
                helperText={errors.phone ? errors.phone.message : ''}
                placeholder="請輸入手機號碼"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                {...field}
                label="電子信箱"
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ''}
                placeholder="請輸入電子信箱"
              />
            )}
          />
          <Stack direction={'row'} alignItems={'flex-end'} spacing={'0.5rem'}>
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="地址"
                  options={cities.map((city) => ({ value: city, label: city }))}
                  error={Boolean(errors.address?.city)}
                  placeholder={field.value ? `${field.value}` : '您所在的城市'}
                />
              )}
            />
            <Controller
              name="address.county"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label=""
                  options={
                    city
                      ? counties.map((district: locationInfo) => ({
                          value: district.county,
                          label: district.county,
                        }))
                      : []
                  }
                  error={Boolean(errors.address?.county)}
                  disabled={!city}
                  placeholder={field.value ? `${field.value}` : '您所在的區域'}
                />
              )}
            />
          </Stack>
        </Stack>
        <Controller
          name="address.detail"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              {...field}
              label=""
              error={Boolean(errors.address?.detail)}
              helperText={errors.address ? '請填妥地址' : ''}
              placeholder="請輸入詳細地址"
            />
          )}
        />
      </Form>
    </Box>
  );
};

export default BookerForm;
