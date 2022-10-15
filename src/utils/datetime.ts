import dayjs from 'dayjs';

export const getFormattedDate = (date?: number | string) => {
  let formatted: string;
  if (date) {
    formatted = dayjs(date).format('DD/MM/YYYY');
  } else {
    formatted = dayjs().format('DD/MM/YYYY');
  }

  return formatted;
};
