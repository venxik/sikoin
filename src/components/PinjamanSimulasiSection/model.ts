export type PinjamanSimulasiSectionProps = {
  onPress: () => void;
  item: {
    totalAngsuranPokok: number;
    totalAngsuranBunga: number;
    totalAngsuran: number;
  };
  simulasi?: boolean;
};
