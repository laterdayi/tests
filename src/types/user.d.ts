export interface UserInfoType {
  user: UseUserInfoUserTyper;
  token: string;
  refreshToken: RefreshToken;
  eqpid: string;
  projectName: string;
  projectType: string;
}

export interface RefreshToken {
  tokenExpired: number;
  refreshToken: string;
}

export interface UseUserInfoUserTyper {
  id: number;
  userID: string;
  userName: string;
  department: string;
  email: string;
  mobilePhone: string;
  avatar: string;
  logo: string;
  miniLogo: string;
}

export interface MenuListType {
  routeName: null | string;
  routeAddress: null | string;
  hasChildren: boolean;
  visible: number;
  icon: null | string;
  id: string;
  isLeaf: boolean;
  order: number;
  path: string;
  pid: string;
  type: number;
  category: number;
  is_superadmin: number;
  componentPath: string;
  label: string;
  link: number;
  powers: string[];
  powersList?: string[];
  powersPosition?: string[];
  children?: MenuListType[];
  isClosePower?: OpenStateType;
}
