const NAMESPACE = 'NACLI_';

const STORAGE = {
  authCode: `${NAMESPACE}ACCESS_TOKEN`,
  codeVerifier: `${NAMESPACE}CODE_VERIFIER`,
  codeChallenge: `${NAMESPACE}CODE_CHALLENGE`,
  accessTokenKey: `${NAMESPACE}ACCESS_TOKEN`,
  idTokenKey: `${NAMESPACE}ID_TOKEN`,
  refreshTokenKey: `${NAMESPACE}REFRESH_TOKEN`,
};

export { STORAGE as default };
