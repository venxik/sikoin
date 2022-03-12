// const formatStringToCurrencyNumber = number => {
//   if (number) {
//     let formattedNumber;
//     formattedNumber = new Intl.NumberFormat('en-ID', {
//       minimumFractionDigits: 0,
//     }).format(number);
//     return formattedNumber;
//   }
// };

const defaultOptions = {
  significantDigits: 0,
  thousandsSeparator: '.',
  decimalSeparator: ',',
};

const formatNumberToCurreny = (value, options) => {
  if (typeof value !== 'number') value = 0.0;
  options = { ...defaultOptions, ...options };
  value = value.toFixed(options.significantDigits);

  const [currency] = value.split('.');
  return `${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator,
  )}`;
};

const formatStringToCurrencyNumber = nStr => {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
};

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

Number.prototype.format = function (n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export default {
  formatStringToCurrencyNumber,
  validateEmail,
  formatNumberToCurreny,
};
