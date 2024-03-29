/* eslint-disable @typescript-eslint/no-explicit-any */
import RNFS from 'react-native-fs';
import ImageResizer, { Response } from 'react-native-image-resizer';

type FormatNumberToCurrenyOptions = {
  significantDigits: number;
  thousandsSeparator: string;
  decimalSeparator: string;
};

const defaultOptions: FormatNumberToCurrenyOptions = {
  significantDigits: 0,
  thousandsSeparator: '.',
  decimalSeparator: ',',
};

const formatNumberToCurreny = (
  value: number | undefined,
  options?: FormatNumberToCurrenyOptions,
) => {
  // eslint-disable-next-line no-param-reassign
  if (typeof value !== 'number') value = 0.0;
  // eslint-disable-next-line no-param-reassign
  options = { ...defaultOptions, ...options };
  const temp: string = value.toFixed(options.significantDigits);

  const [currency] = temp.split('.');
  return `${currency.replace(/\B(?=(\d{3})+(?!\d))/g, options.thousandsSeparator)}`;
};

const formatStringToCurrencyNumber = (nStr: string) => {
  // eslint-disable-next-line no-param-reassign
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? '.' + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const addMissingBracketJSON = <T>(data: T): T => {
  let temp;
  let tempObj;

  if (typeof data === 'string') {
    temp = data.concat('}');
    tempObj = JSON.parse(temp);
    return tempObj;
  }
  return data;
};

const resizeImage = async (data: any): Promise<Response> => {
  try {
    const response = await ImageResizer.createResizedImage(
      data.uri,
      800,
      800,
      'JPEG',
      80,
      0,
      undefined,
      false,
      { onlyScaleDown: true },
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};

const convertToBase64 = async (data: any): Promise<string> => {
  try {
    const response = await RNFS.readFile(data, 'base64');
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};

// const objectMap = (obj:object, fn) =>
//   Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

const NUMBER_REGEX = /^\d+$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  formatStringToCurrencyNumber,
  validateEmail,
  formatNumberToCurreny,
  EMAIL_REGEX,
  NUMBER_REGEX,
  addMissingBracketJSON,
  resizeImage,
  convertToBase64,
};
