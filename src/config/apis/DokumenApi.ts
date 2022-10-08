import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';

/**
 * Handles API call related to diagnostic
 * @class
 */
class DokumenApi {
  static async getAllDokumen(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.dokumen.getDokumen);
    return resp;
  }
}

export default DokumenApi;
