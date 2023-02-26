export declare global {
  // module列表
  interface ModuleProp {
    id: number;
    name: string;
  }

  type IdListType = (string | number)[];

  // 开启状态
  type OpenStateType = 0 | 1;

  interface PaginationAndSortType {
    size: number;
    page: number;
    sortName?: string;
    sort?: SortOrder;
  }
}
