import type { EditModalEntry } from '@/constants/enum';
import type { FormItemRule, FormValidationError } from 'naive-ui';

declare global {
  // Curd 模板引用
  interface CurdRefType<Q = any, T = any, L = any, E = T> {
    tableRef?: TableRefType<L>;
    queryFormData?: Q & PaginationType;
    formData?: Emptyable<T>;
    initQueryFormData?: Nullable<Q>;
    isEditMode?: boolean;
    handleAdd?: () => void;
    openEditModal?: (data?: L | L[], entry?: EditModalEntry) => void;
    handleSingleDelete?: <L extends { id: string }>(data?: L) => void;
    tableData: L[];
    sourceTableData: any;
    handleUpdateRow: (updater: (tableData: L[]) => void) => void;
    validate: (
      validateCallback?: (errors?: FormValidationError[]) => void,
      shouldRuleBeApplied?: (rule: FormItemRule) => boolean
    ) => Promise<void | undefined>;
    executeQueryList: () => Promise<void>;
    executeQuery: ExecuteFunctionType<any>;
    isLoadingQuery?: boolean;
    currentEditData?: E;
    handleSearch: () => void;
    handleReset: () => void;
    handleResetPage: () => void;
    handleDelete: (resolve?: AsyncEmitResolveType) => Promise<void>;
    openEditModalEntry?: EditModalEntry;
  }
}
