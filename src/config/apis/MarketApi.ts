import { AxiosResponse } from 'axios';

import { apis } from '../../constants';
import {
  AddToCartParam,
  ChangeCheckoutAddressParam,
  CheckoutParam,
  OrderProccessParam,
} from '../../redux/reducers/MarketReducer';
import HttpService from '../services/HttpService';

class MarketApi {
  static async getMarketMainData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.market.market);
    return resp;
  }

  static async getFavoritData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.market.favorit);
    return resp;
  }

  static async addToFavorit(data: { idProduk: number }): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.market.favorit, data);
    return resp;
  }

  static async getAllProduct(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.market.produk);
    return resp;
  }

  static async searchProduct(data: { keyword: string }): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.market.cariProduk, data);
    return resp;
  }

  static async getProductDetails(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.get(`${apis.endpoints.market.produk}/${id}`);
    return resp;
  }

  static async addToCart(data: AddToCartParam): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.market.tambahKeranjang, data);
    return resp;
  }

  static async getCartData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.market.getKeranjang);
    return resp;
  }

  static async deleteCartItem(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.delete(`${apis.endpoints.market.hapusKeranjang}/${id}`);
    return resp;
  }

  static async checkout(data: CheckoutParam): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.market.checkout, data);
    return resp;
  }

  static async orderProccess(data: OrderProccessParam): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.market.prosesPemesanan, data);
    return resp;
  }

  static async getPurchaseData(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.market.pembelian);
    return resp;
  }

  static async getPurchaseDetail(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.get(`${apis.endpoints.market.pembelian}/${id}`);
    return resp;
  }

  static async setPurchaseDone(id: number): Promise<AxiosResponse> {
    const resp = await HttpService.patch(`${apis.endpoints.market.pesananSelesai}/${id}`);
    return resp;
  }

  static async getCategoryList(): Promise<AxiosResponse> {
    const resp = await HttpService.get(apis.endpoints.market.kategori);
    return resp;
  }

  static async searchCategory(data: { kategoriId: number }): Promise<AxiosResponse> {
    const resp = await HttpService.post(apis.endpoints.market.cariKategori, data);
    return resp;
  }

  static async changeCheckoutAddress(data: ChangeCheckoutAddressParam): Promise<AxiosResponse> {
    const resp = await HttpService.patch(apis.endpoints.market.ubahAlamatPengiriman, data);
    return resp;
  }
}

export default MarketApi;
