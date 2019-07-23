import axios from 'axios';
import ws  from './ws';
import intrusion from './intrusion';
import result from './result';

// axios.defaults.baseURL = '/api';

export default {
  async http(requestMode: any, url: string, params?: any, options?: any) {
    try {
      const res = await axios(Object.assign({
        url,
        method: requestMode,
        data: params
      }, options));
      if(res.status === 200) {
        return res.data;
      } else {
        console.log(`状态码为${res.status}`, res);
      }
    } catch (error) {
      console.log(`${url}-${requestMode}请求异常`, error);
    }
  },
  intrusion,
  result,
  ws,
}