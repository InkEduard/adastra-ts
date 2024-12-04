const formatWithDelimiters = (
  number: number | string | null,
  precision = 2,
  thousands = ',',
  decimal = '.'
) => {
  if (isNaN(number) || number == null) {
    return 0;
  }

  number = (number / 100.0).toFixed(precision);

  const parts = number.split('.');
  const dollars = parts[0].replace(
    /(\d)(?=(\d\d\d)+(?!\d))/g,
    '$1' + thousands
  );
  const cents = parts[1] ? decimal + parts[1] : '';

  return dollars + cents;
};

export const formatPrice = (
  cents: number | string | null,
  formatString = '${{amount}}'
) => {
  let value;
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

  if (typeof cents == 'string') {
    cents = cents.replace('.', '');
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};
