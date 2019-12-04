import urls from './urls';
import axios from 'axios';

export async function request(url: string, options?: any) {
  let {
    method = 'get',
    auth = false,
    headers = {},
    data = null,
  } = options || {};
  auth && (headers.Authorization = `Bearer ${'token'}`);

  return await axios({
    url: url,
    method: method,
    headers: headers,
    data
  });
}

export async function get(url: string, options?: any) {
  options = Object.assign({
    method: 'get',
  }, options);
  return await request(url, options);
}

export async function post(url: string, data: any, options?: any) {
  options = Object.assign({
    method: 'post',
    data: data
  }, options);
  return await request(url, { data });
}

export default {
  async getArticles() {
    // return await axios.get(urls.ARTICLES);
    return await get(urls.ARTICLES);
  }
}
