type RouteSchema = {
  pathId: string;
  path: string;
  title: string;
  description: string;
  pageTitle?: string;
  pageSubtitle?: string;
};

const myName = '享樂酒店';
const secondaryTitle = '高雄豪華住宿之選';
const bindDescription = (titleArray: string[]): string => {
  let str = '';
  titleArray.forEach((item) => {
    str += `${item}, `;
  });
  str += `${myName}, `;
  str += `${secondaryTitle}`;

  return str;
};

export const routeBase: RouteSchema = {
  pathId: '',
  path: '',
  title: '',
  description: '',
};

export const PATH_ID_HOME = 'home';
export const PATH_ID_LOGIN = 'login';
export const PATH_ID_SIGNUP = 'signup';
export const PATH_ID_GETCODE = 'getcode';
export const PATH_ID_FORGOT = 'forgot';

export const routeConfig: RouteSchema[] = [
  {
    pathId: PATH_ID_HOME,
    path: '/',
    title: `${myName}`,
    description: bindDescription([]),
    pageTitle: '立即開始旅程',
    pageSubtitle: '享樂酒店，誠摯歡迎',
  },
  {
    pathId: PATH_ID_LOGIN,
    path: '/user/login',
    title: `登入 - ${myName}`,
    description: bindDescription(['登入']),
    pageTitle: '立即開始旅程',
    pageSubtitle: '享樂酒店，誠摯歡迎',
  },
  {
    pathId: PATH_ID_SIGNUP,
    path: '/user/signup',
    title: `立即註冊 - ${myName}`,
    description: bindDescription(['立即註冊']),
    pageTitle: '立即註冊',
    pageSubtitle: '享樂酒店，誠摯歡迎',
  },
  {
    pathId: PATH_ID_GETCODE,
    path: '/user/getcode',
    title: `忘記密碼 - ${myName}`,
    description: bindDescription(['忘記密碼']),
    pageTitle: '忘記密碼',
    pageSubtitle: '享樂酒店，誠摯歡迎',
  },
  {
    pathId: PATH_ID_FORGOT,
    path: '/user/forgot',
    title: `設置新密碼 - ${myName}`,
    description: bindDescription(['設置新密碼']),
    pageTitle: '設置新密碼',
    pageSubtitle: '享樂酒店，誠摯歡迎',
  },
];

// pathId or path
export const getRouteConfig = (pathId: string): RouteSchema => {
  const data = routeConfig.find((item) => item.pathId === pathId || item.path === pathId);
  return data ? data : routeBase;
};
