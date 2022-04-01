import moment from 'moment';

type formatNumberToCurrenyOptions = {
  significantDigits: number;
  thousandsSeparator: string;
  decimalSeparator: string;
};

const defaultOptions: formatNumberToCurrenyOptions = {
  significantDigits: 0,
  thousandsSeparator: '.',
  decimalSeparator: ',',
};

const formatNumberToCurreny = (
  value: number | undefined,
  options?: formatNumberToCurrenyOptions,
) => {
  if (typeof value !== 'number') value = 0.0;
  options = { ...defaultOptions, ...options };
  const temp: string = value.toFixed(options.significantDigits);

  const [currency] = temp.split('.');
  return `${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator,
  )}`;
};

const formatStringToCurrencyNumber = (nStr: string) => {
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

const trimDate = (data: string) => {
  return moment(data).toISOString().substring(0, 10);
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
  trimDate,
  EMAIL_REGEX,
  NUMBER_REGEX,
};
