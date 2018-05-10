
import axios from 'axios';
import {
  Message
} from 'element-ui';
import {
  baseUrl
} from './config';
import {
  load
} from './utils';

export default {
  /** 
   * get请求
  */
  get: async (url = '', status) => {
    if (!status) {
      load.openLoading();
    }
    url = baseUrl + url + '?' + new Date().getTime();
    let requestConfig = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'webtoken': sessionStorage.getItem('webtoken') ? sessionStorage.getItem('webtoken') : ''
      },
      mode: "cors",
      cache: "force-cache"
    }
    try {
      const response = await axios.get(url, requestConfig);
      const responseJson = response.data;
      if (!responseJson.success && !status) {
        Message.error(responseJson.msg);
      }
      load.closeLoading();
      return responseJson;
    } catch (error) {
      console.log(error)
      load.closeLoading();
      Message.error('请求异常');
      return {
        success: false,
        msg: '请求异常'
      }
    }
  },
  /** 
   * post请求
  */
  post: async (url = '', data = {}, status) => {
    if (!status) {
      load.openLoading();
    }
    url = baseUrl + url;
    try {
      let requestConfig = {
        credentials: 'include',
        method: 'POST',
        xhrFields: {
          withCredentials: true
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'webtoken': sessionStorage.getItem('webtoken') ? sessionStorage.getItem('webtoken') : '',
          'withCredentials': true
        },
        mode: "cors",
        cache: "force-cache"
      }
      const response = await axios.post(url, data, requestConfig);
      load.closeLoading();
      const responseJson = response.data;
      if (!responseJson.success && !status) {
        Message.error(responseJson.msg);
      }
      
      return responseJson;
    } catch (error) {
      console.log(error)
      load.closeLoading();
      Message.error('请求异常');
      return {
        success: false,
        msg: '请求异常'
      }
    }
  },
  /** 
   * 上传请求
  */
  fileUpload: async (url = '', data = {}) => {
    load.openLoading();
    url = baseUrl + url;
    try {
      let requestConfig = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'webtoken': sessionStorage.getItem('USERTOKEN') ? sessionStorage.getItem('USERTOKEN') : ''
        }
      }
      let fs = new FormData();
      fs.append('file', data);
      const response = await axios.post(url, fs, requestConfig);
      load.closeLoading();
      // if (response.status === 401) {
      //   router.push('/login');
      //   return;
      // }
      const responseJson = response.data;
      if (!responseJson.success) {
        Message.error(responseJson.msg);
      }
      return responseJson;
    } catch (error) {
      console.log(error)
      Message.error('请求异常');
      load.closeLoading();
      return {
        success: false,
        msg: '请求异常'
      }
    }
  }
};

