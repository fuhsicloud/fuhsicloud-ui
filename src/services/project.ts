import request from '@/utils/request';

export async function queryProjectList(params: { count: number }) {
  return request('/api/project/default', {
    params,
  });
}
