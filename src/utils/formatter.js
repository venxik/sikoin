const formatStringToCurrencyNumber = number => {
  let formattedNumber;
  formattedNumber = new Intl.NumberFormat('en-ID', {
    minimumFractionDigits: 0,
  }).format(number);
  return formattedNumber;
};

const emailRegex = string => {};

export default { formatStringToCurrencyNumber, emailRegex };
