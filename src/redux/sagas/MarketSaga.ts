import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, MarketApi } from '../../config/apis';
import { navigate } from '../../config/navigation';
import { formatter } from '../../utils';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  addToCartFailed,
  AddToCartParam,
  addToCartSuccees,
  addToFavoriteFailed,
  addToFavoriteSuccess,
  CartData,
  CategoryData,
  ChangeCheckoutAddress,
  changeCheckoutAddressSuccess,
  CheckoutData,
  checkoutFailed,
  checkoutSuccess,
  deleteCartProductFailed,
  deleteCartProductSuccess,
  fetchAddToCart,
  fetchAddToFavorit,
  fetchCartData,
  fetchCategoryData,
  fetchCategoryProductData,
  fetchChangeCheckoutAddress,
  fetchCheckout,
  fetchDeleteCartProduct,
  fetchMarketAllProduct,
  fetchMarketFavoritData,
  fetchMarketMainData,
  fetchMarketProductDetails,
  fetchOrderProcess,
  fetchPurchaseData,
  fetchPurchaseDetails,
  fetchSearchMarketProduct,
  fetchSetPurchaseDone,
  getCartDataFailed,
  getCartDataSuccess,
  getCategoryFailed,
  getCategoryProductFailed,
  getCategoryProductSuccess,
  getCategorySuccess,
  getMarketAllProductFailed,
  getMarketAllProductSuccess,
  getMarketFavoritDataFailed,
  getMarketFavoritDataSuccess,
  getMarketMainDataFailed,
  getMarketMainDataSuccess,
  getProductDetailsFailed,
  getProductDetailsSuccess,
  getPurchaseDetailsFailed,
  getPurchaseDetailsSuccess,
  getPurchaseFailed,
  getPurchaseSuccess,
  MarketFavoritData,
  MarketMainData,
  MarketProductData,
  MarketProductDetails,
  orderProcessFailed,
  orderProcessSuccess,
  PurchaseData,
  PurchaseDetails,
  searchMarketProductFailed,
  searchMarketProductSuccess,
  selectCheckoutAlamat,
  setPurchaseDoneFailed,
  setPurchaseDoneSuccess,
} from '../reducers/MarketReducer';

function* getMarketMainData() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<MarketMainData>> = yield call(
      MarketApi.getMarketMainData,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getMarketMainDataSuccess(data?.data));
      } else {
        yield put(getMarketMainDataFailed('Error'));
      }
    } else {
      yield put(getMarketMainDataFailed('Error'));
    }
  } catch (error) {
    yield put(getMarketMainDataFailed(error));
  }
  yield put(hideLoading());
}

function* getMarketFavoritData() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<MarketFavoritData>> = yield call(
      MarketApi.getFavoritData,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getMarketFavoritDataSuccess(data?.data));
      } else {
        yield put(getMarketFavoritDataFailed('Error'));
      }
    } else {
      yield put(getMarketFavoritDataFailed('Error'));
    }
  } catch (error) {
    yield put(getMarketFavoritDataFailed(error));
  }
  yield put(hideLoading());
}

function* addToFavorite(action: ReturnType<typeof fetchAddToFavorit>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<{ idProduk: number }>> = yield call(
      MarketApi.addToFavorit,
      { idProduk: action.payload },
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(addToFavoriteSuccess(data.data.idProduk));
      } else {
        yield put(addToFavoriteFailed('Error'));
      }
    } else {
      yield put(addToFavoriteFailed('Error'));
    }
  } catch (error) {
    yield put(addToFavoriteFailed(error));
  }
  yield put(hideLoading());
}

function* getMarketAllProduct() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<MarketProductData>> = yield call(
      MarketApi.getAllProduct,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getMarketAllProductSuccess(data.data));
      } else {
        yield put(getMarketAllProductFailed('Error'));
      }
    } else {
      yield put(getMarketAllProductFailed('Error'));
    }
  } catch (error) {
    yield put(getMarketAllProductFailed(error));
  }
  yield put(hideLoading());
}

function* searchMarketProduct(action: ReturnType<typeof fetchSearchMarketProduct>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<MarketProductData>> = yield call(
      MarketApi.searchProduct,
      { keyword: action.payload },
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(searchMarketProductSuccess(data.data));
      } else {
        yield put(searchMarketProductFailed('Error'));
      }
    } else {
      yield put(searchMarketProductFailed('Error'));
    }
  } catch (error) {
    yield put(searchMarketProductFailed(error));
  }
  yield put(hideLoading());
}

function* getProductDetails(action: ReturnType<typeof fetchMarketProductDetails>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<MarketProductDetails>> = yield call(
      MarketApi.getProductDetails,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getProductDetailsSuccess(data.data));
      } else {
        yield put(getProductDetailsFailed('Error'));
      }
    } else {
      yield put(getProductDetailsFailed('Error'));
    }
  } catch (error) {
    yield put(getProductDetailsFailed(error));
  }
  yield put(hideLoading());
}

function* addToCart(action: ReturnType<typeof fetchAddToCart>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<AddToCartParam>> = yield call(
      MarketApi.addToCart,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(addToCartSuccees('success'));
      } else {
        yield put(addToCartFailed('Error'));
      }
    } else {
      yield put(addToCartFailed('Error'));
    }
  } catch (error) {
    yield put(addToCartFailed(error));
  }
  yield put(hideLoading());
}

function* getCartData() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<CartData>> = yield call(MarketApi.getCartData);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      const updated = data.data.keranjang.map((v) => {
        return { ...v, isSelected: false };
      });
      if (data?.error == null) {
        yield put(getCartDataSuccess({ keranjang: updated }));
      } else {
        yield put(getCartDataFailed('Error'));
      }
    } else {
      yield put(getCartDataFailed('Error'));
    }
  } catch (error) {
    yield put(getCartDataFailed(error));
  }
  yield put(hideLoading());
}

function* deleteCartProduct(action: ReturnType<typeof fetchDeleteCartProduct>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<{ message: string }>> = yield call(
      MarketApi.deleteCartItem,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(deleteCartProductSuccess());
        yield call(getCartData);
      } else {
        yield put(deleteCartProductFailed('Error'));
      }
    } else {
      yield put(deleteCartProductFailed('Error'));
    }
  } catch (error) {
    yield put(deleteCartProductFailed(error));
  }
  yield put(hideLoading());
}

function* checkout(action: ReturnType<typeof fetchCheckout>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<CheckoutData>> = yield call(
      MarketApi.checkout,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(checkoutSuccess(data.data));
        const alamatIndex = data.data.alamat.findIndex((item) => item.isUtama === true);
        yield put(selectCheckoutAlamat(data.data.alamat[alamatIndex]));
        navigate('MarketCheckoutScreen');
      } else {
        yield put(checkoutFailed('Error'));
      }
    } else {
      yield put(checkoutFailed('Error'));
    }
  } catch (error) {
    yield put(checkoutFailed(error));
  }
  yield put(hideLoading());
}

function* changeCheckoutAddress(action: ReturnType<typeof fetchChangeCheckoutAddress>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<ChangeCheckoutAddress>> = yield call(
      MarketApi.changeCheckoutAddress,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(changeCheckoutAddressSuccess(data.data));
        const index = data.data.alamatTujuan.findIndex((v) => v.isUtama);
        yield put(selectCheckoutAlamat(data.data.alamatTujuan[index]));
        navigate('MarketCheckoutScreen');
      } else {
        yield put(checkoutFailed('Error'));
      }
    } else {
      yield put(checkoutFailed('Error'));
    }
  } catch (error) {
    yield put(checkoutFailed(error));
  }
  yield put(hideLoading());
}
function* orderProcess(action: ReturnType<typeof fetchOrderProcess>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse = yield call(MarketApi.orderProcess, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(orderProcessSuccess());
        navigate('MarketCheckoutSuccessScreen');
      } else {
        yield put(orderProcessFailed('Error'));
      }
    } else {
      yield put(orderProcessFailed('Error'));
    }
  } catch (error) {
    yield put(orderProcessFailed(error));
  }
  yield put(hideLoading());
}

function* getPurchaseData() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<PurchaseData[]>> = yield call(
      MarketApi.getPurchaseData,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getPurchaseSuccess(data.data));
      } else {
        yield put(getPurchaseFailed('Error'));
      }
    } else {
      yield put(getPurchaseFailed('Error'));
    }
  } catch (error) {
    yield put(getPurchaseFailed(error));
  }
  yield put(hideLoading());
}

function* getPurchaseDetails(action: ReturnType<typeof fetchPurchaseDetails>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<PurchaseDetails>> = yield call(
      MarketApi.getPurchaseDetail,
      action.payload,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getPurchaseDetailsSuccess(data.data));
      } else {
        yield put(getPurchaseDetailsFailed('Error'));
      }
    } else {
      yield put(getPurchaseDetailsFailed('Error'));
    }
  } catch (error) {
    yield put(getPurchaseDetailsFailed(error));
  }
  yield put(hideLoading());
}

function* setPurchaseDone(action: ReturnType<typeof fetchSetPurchaseDone>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse = yield call(MarketApi.setPurchaseDone, action.payload);
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(setPurchaseDoneSuccess());
        yield call(getPurchaseData);
      } else {
        yield put(setPurchaseDoneFailed('Error'));
      }
    } else {
      yield put(setPurchaseDoneFailed('Error'));
    }
  } catch (error) {
    yield put(setPurchaseDoneFailed(error));
  }
  yield put(hideLoading());
}

function* getCategoryData() {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<{ kategori: CategoryData[] }>> = yield call(
      MarketApi.getCategoryList,
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getCategorySuccess(data.data.kategori));
      } else {
        yield put(getCategoryFailed('Error'));
      }
    } else {
      yield put(getCategoryFailed('Error'));
    }
  } catch (error) {
    yield put(getCategoryFailed(error));
  }
  yield put(hideLoading());
}

function* getCategoryProductData(action: ReturnType<typeof fetchCategoryProductData>) {
  yield put(showLoading());

  try {
    const response: AxiosResponse<ApiResponse<MarketProductData>> = yield call(
      MarketApi.searchCategory,
      { kategoriId: action.payload },
    );
    if (response?.status === 200) {
      const data = formatter.addMissingBracketJSON(response.data);
      if (data?.error == null) {
        yield put(getCategoryProductSuccess(data.data));
      } else {
        yield put(getCategoryProductFailed('Error'));
      }
    } else {
      yield put(getCategoryProductFailed('Error'));
    }
  } catch (error) {
    yield put(getCategoryProductFailed(error));
  }
  yield put(hideLoading());
}

export function* watchGetMarketMainData() {
  yield takeLatest(fetchMarketMainData, getMarketMainData);
}
export function* watchGetMarketFavoritData() {
  yield takeLatest(fetchMarketFavoritData, getMarketFavoritData);
}
export function* watchAddToFavorite() {
  yield takeLatest(fetchAddToFavorit, addToFavorite);
}
export function* watchGetMarketAllProduct() {
  yield takeLatest(fetchMarketAllProduct, getMarketAllProduct);
}
export function* watchSearchMarketProduct() {
  yield takeLatest(fetchSearchMarketProduct, searchMarketProduct);
}
export function* watchGetProductDetails() {
  yield takeLatest(fetchMarketProductDetails, getProductDetails);
}
export function* watchAddToCart() {
  yield takeLatest(fetchAddToCart, addToCart);
}
export function* watchGetCartData() {
  yield takeLatest(fetchCartData, getCartData);
}
export function* watchDeleteCartProduct() {
  yield takeLatest(fetchDeleteCartProduct, deleteCartProduct);
}
export function* watchCheckout() {
  yield takeLatest(fetchCheckout, checkout);
}
export function* watchChangeCheckoutAddress() {
  yield takeLatest(fetchChangeCheckoutAddress, changeCheckoutAddress);
}
export function* watchOrderProcess() {
  yield takeLatest(fetchOrderProcess, orderProcess);
}
export function* watchGetPurchaseData() {
  yield takeLatest(fetchPurchaseData, getPurchaseData);
}
export function* watchGetPurchaseDetails() {
  yield takeLatest(fetchPurchaseDetails, getPurchaseDetails);
}
export function* watchSetPurchaseDone() {
  yield takeLatest(fetchSetPurchaseDone, setPurchaseDone);
}
export function* watchGetCategory() {
  yield takeLatest(fetchCategoryData, getCategoryData);
}
export function* watchGetCategoryProduct() {
  yield takeLatest(fetchCategoryProductData, getCategoryProductData);
}
