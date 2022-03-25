import { VoucherDetail } from '../../redux/reducers/VoucherReducer';

export interface CardVoucherLargeProps {
  data: VoucherDetail;
  onPressVoucher: ({ data, voucher }: SelectedVoucherProps) => void;
}

export type SelectedVoucherProps = {
  data?: VoucherDetail;
  voucher?: number;
};
