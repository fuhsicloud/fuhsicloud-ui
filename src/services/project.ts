import request from '@/utils/request';

export async function queryProjectList(params: { count: number }) {
  return request('/api/project/default', {
    params,
  });
}

export async function fakeSubmitProjectForm(params: any) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
