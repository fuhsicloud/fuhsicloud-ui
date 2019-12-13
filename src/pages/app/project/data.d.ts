export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface CardListItemDataType {
  id: string;
  owner: string;
  name: string;
  avatar: string;
  display_name: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  desc: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}
