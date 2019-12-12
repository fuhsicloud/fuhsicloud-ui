export interface Permission {
  name: string;
  id: string;
}

export interface BasicListItemDataType {
  id: string;
  name: string;
  level: number;
  state: '禁用' | '启用';
  updated_at: number;
  created_at: number;
  description: string;
  Permissions: Permission[];
}
