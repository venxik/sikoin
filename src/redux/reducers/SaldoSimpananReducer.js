const initialState = {
  simpanan: {
    pokok: 1500000,
    wajib: 10000000,
    sukarela: 1239000,
    total: 9999999,
  },
  saldo: {
    total: 1231222,
    simpananSukarela: 12312321,
  },
  error: null,
};

const SaldoSimpananReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default SaldoSimpananReducer;
