import { LayoutType } from '@/constants/enum';

export interface RouteType {
  name: string;
  path: string;
  component: string;
  redirect?: string;
  meta: Partial<RouteMeta>;
  children?: RouteType[];
}

export interface RouteMeta {
  icon: string;
  link: number;
  title: string;
  noCache: boolean;
  hidden: boolean;
  remark?: string;
  layoutType?: LayoutType;
  powers: string[];
}
