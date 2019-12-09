import request from '@/utils/request';
import { TableListParams } from '../pages/system/namespace/data';

export async function queryRule(params: TableListParams) {
  return request('/api/rule', {
    params,
  });
}

export async function queryNamespace(params: TableListParams) {
  return request('/api/namespace', {
    params,
  });
}

export async function removeRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
