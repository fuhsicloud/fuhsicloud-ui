import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  return localStorage.getItem('antd-pro-authority') || 'admin';
}

export function setAuthority(authority: string ): void {
  return localStorage.setItem('antd-pro-authority', authority);
}
