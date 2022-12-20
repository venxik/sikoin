import { AxiosResponse } from 'axios';

import { apis } from '../../constants';
import HttpService from '../services/HttpService';

class KoperasiApi {
  static async getKoperasiData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.koperasi);
    return resp;
  }
}

export default KoperasiApi;
