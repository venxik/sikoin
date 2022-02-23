/* eslint no-nested-ternary: "off" */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { IMG_ERROR } from 'assets/images';

const ImageWithFallback = (props) => {
  const { uri, style } = props || {};
  const [source] = useState({ uri: uri || null });
  const [loadingSource] = useState(IMG_ERROR);
  const [errorSource] = useState(IMG_ERROR);
  const [isDefault, setIsDefault] = useState(true);
  const [isError, setIsError] = useState(false);
  const image = isDefault ? loadingSource : isError ? errorSource : source;

  const onError = () => {
    setIsError(true);
  };

  const onLoadEnd = () => {
    setIsDefault(false);
  };

  return <Image {...props} source={image} style={style} onLoadEnd={onLoadEnd} onError={onError} />;
};

ImageWithFallback.propTypes = {
  uri: PropTypes.string,
  style: PropTypes.any,
};

ImageWithFallback.defaultProps = {
  uri: null,
  style: {},
};

export default ImageWithFallback;
