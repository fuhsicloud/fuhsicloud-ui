export interface TableListItem {
  id: number;
  phone: string;
  email: string;
  username: string;
  state: number;
  updated_at: Date;
  created_at: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  state: string;
  email: string;
  pageSize: number;
  currentPage: number;
}
