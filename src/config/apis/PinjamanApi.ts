import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';

class PinjamanApi {
  static async getInitialData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.pinjaman.getPinjaman);
    return resp;
  }
}

export default PinjamanApi;
