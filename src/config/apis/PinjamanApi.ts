import HttpService from '../services/HttpService';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apis } from '../../constants';
import {
  CreatePinjamanInfo,
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

  static async getDisetujuiDetail(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.get(
      `${apis.endpoints.pinjaman.detailDisetujui}/${id}`,
    );
    return resp;
  }

  static async fetchDataStep1(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.pinjaman.step1);
    return resp;
  }

  static async fetchDataStep2(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.pinjaman.step2);
    return resp;
  }

  static async fetchDataStep3(data: PinjamanStep2Data): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.pinjaman.step3, data);
    return resp;
  }

  static async fetchDataStep4(data: PinjamanStep3Data): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.pinjaman.step4, data);
    return resp;
  }

  static async fetchPatchCreate(formData: FormData): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: () => {
        return formData;
      },
      data: formData,
    };

    const resp = await HttpService.patch(
      apis.endpoints.pinjaman.create,
      {},
      config,
    );
    return resp;
  }

  static async fetchSummaryData(
    data: CreatePinjamanInfo,
  ): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.pinjaman.summary, data);
    return resp;
  }

  static async fetchPostCreate(
    data: CreatePinjamanInfo,
  ): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.pinjaman.create, data);
    return resp;
  }
}

export default PinjamanApi;
