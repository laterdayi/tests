declare global {
  // -------------------------------------------------------------------------------------------- > 类型扩展

  // 类型可为null
  type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  };

  // 类型可为null | undefined
  type Emptyable<T> = {
    [P in keyof T]: T[P] | null | undefined;
  };

  type ExtendIdType<T> = {
    [P in keyof T]: T[P];
  } & { id: string };

  // 递归
  declare type DeepMaybeRefSelf<T> = T extends Ref<infer V>
    ? MaybeRefSelf<V>
    : T extends Fn
    ? T
    : T extends string
    ? MaybeRefSelf<string>
    : T extends boolean
    ? MaybeRefSelf<boolean>
    : T extends any[] | object
    ? {
        [K in keyof T]: DeepMaybeRefSelf<T[K]>;
      }
    : MaybeRefSelf<T>;

  // -------------------------------------------------------------------------------------------- > Vue

  // 异步 emit Resolve
  type AsyncEmitResolveType = (value: unknown) => void;

  type App = import('vue').App;
  type Ref<T> = import('vue').Ref<T>;
  type ComputedRef<T> = import('vue').ComputedRef<T>;
  type PropType<T> = import('vue').PropType<T>;
  type VNode = import('vue').VNode;
  type ToRefs<T> = import('vue').ToRefs<T>;
  type VNodeChild = import('vue').VNodeChild;
  type CSSProperties = import('vue').CSSProperties;

  // -------------------------------------------------------------------------------------------- > Vue Router

  type Router = import('vue-router').Router;
  type RouteRecordRaw = import('vue-router').RouteRecordRaw;
  type RouteLocationRaw = import('vue-router').RouteLocationRaw;
  type RouteLocationNormalized = import('vue-router').RouteLocationNormalized;
  type RouteLocationNormalizedLoaded = import('vue-router').RouteLocationNormalizedLoaded;

  // -------------------------------------------------------------------------------------------- > Vue Use

  type MaybeRef<T> = import('@vueuse/core').MaybeRef<T>;
  type MaybeComputedRef<T> = import('@vueuse/core').MaybeComputedRef<T>;
  type DeepMaybeRef<T> = import('@vueuse/core').DeepMaybeRef<T>;

  // -------------------------------------------------------------------------------------------- > Naive UI

  type DataTableColumns<T> = import('naive-ui').DataTableColumns<T>;
  type SortOrder = import('naive-ui/es/data-table/src/interface').SortOrder;
  type SelectOption = import('naive-ui').SelectOption;
  type TreeOptionBase = import('naive-ui/es/tree/src/interface').TreeOptionBase;
  type TreeOption<T = any> = TreeOptionBase & {
    [P in keyof T]?: T[P];
  };
}

declare module 'naive-ui' {
  type TreeOption<T> = TreeOptionBase & {
    [P in keyof T]?: T[P];
  };
}

export {};
