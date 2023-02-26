import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse, MarketApi } from '../../config/apis';
import { formatter } from '../../utils';
import { hideLoading, showLoading } from '../reducers/LoadingReducer';
import {
  addToCartFailed,
  AddToCartParam,
  addToCartSuccees,
  addToFavoriteFailed,
  addToFavoriteSuccess,
  CartData,
  deleteCartProductFailed,
  deleteCartProductSuccess,
  fetchAddToCart,
  fetchAddToFavorit,
  fetchCartData,
  fetchDeleteCartProduct,
  fetchMarketAllProduct,
  fetchMarketFavoritData,
  fetchMarketMainData,
  fetchMarketProductDetails,
  fetchSearchMarketProduct,
  getCartDataFailed,
  getCartDataSuccess,
  getMarketAllProductFailed,
  getMarketAllProductSuccess,
  getMarketFavoritDataFailed,
  getMarketFavoritDataSuccess,
  getMarketMainDataFailed,
  getMarketMainDataSuccess,
  getProductDetailsFailed,
  getProductDetailsSuccess,
  MarketFavoritData,
  MarketMainData,
  MarketProductData,
  MarketProductDetails,
  searchMarketProductFailed,
  searchMarketProductSuccess,
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
      if (data?.error == null) {
        yield put(getCartDataSuccess(data.data));
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
