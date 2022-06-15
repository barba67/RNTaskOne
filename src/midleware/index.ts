import axios from 'axios';
import {API_URL, TOKEN} from '../constants/constants';
const getClient = (client: string) => {
  switch (client) {
    case 'main':
      return API_URL;

    default:
      return API_URL;
  }
};

export const callApi = ({
  data = {},
  url = '',
  method = 'GET',
  client = 'user',
  timeout = 300000,
  auth = true,
  name = '',
  headerType = 'application/json',
}) => {
  let paramsData = data;

  let baseURL = `${getClient(client)}/${url}`;
  axios.defaults.timeout = timeout;
  axios.defaults.headers.common['Content-Type'] = headerType;
  if (auth) {
    axios.defaults.headers.common.Authorization = TOKEN;
  }

  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  if (process.env.NODE_ENV === 'development') {
    console.log(`${name}_API_REQUEST`, {
      paramsData,
      baseURL,
      method,
      client,
      timeout,
    });
  }

  return new Promise((resolve, reject) => {
    axios
      .request({
        baseURL,
        method,
        [dataOrParams]: paramsData,
      })
      .then(({data}) => {
        let responseData = data;
        if (process.env.NODE_ENV === 'development') {
          console.log(`${name}_API_SUCCESS`, {
            data: responseData,
            paramsData,
            baseURL,
            method,
            client,
            timeout,
          });
        }
        resolve(responseData);
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`${name}_API_FAIL`, {
            paramsData,
            error,
            baseURL,
            method,
            client,
            timeout,
          });
        }
        reject(error);
      })
      .finally(() => {});
  });
};
