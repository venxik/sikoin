import HttpService from '../services/HttpService';
import { AxiosResponse } from 'axios';
import { apis } from '../../constants';
import {
  IdJenisPinjaman,
  PinjamanStep2Data,
  PinjamanStep3Data,
} from '../../redux/reducers/PinjamanReducer';

class PinjamanApi {
  static async getInitialData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.pinjaman.getPinjaman);
    return resp;
  }

  static async getDisetujuiData(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.get(
      `${apis.endpoints.pinjaman.disetujui}/${id}`,
    );
    return resp;
  }

  static async getDitolakData(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.get(
      `${apis.endpoints.pinjaman.ditolak}/${id}`,
    );

    return resp;
  }

  static async fetchDataStep1(data: IdJenisPinjaman): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.pinjaman.step1, data);
    return resp;
  }

  static async fetchDataStep2(data: IdJenisPinjaman): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.pinjaman.step2, data);
    return resp;
  }

  static async fetchDataStep3(data: PinjamanStep2Data): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.pinjaman.step3, data);
    return resp;
  }
  static async fetchDataStep4(data: PinjamanStep3Data): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.pinjaman.step3, data);
    return resp;
  }
}

export default PinjamanApi;
