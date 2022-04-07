import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { colors, icons, sizes } from '../../constants';
import { FilterVariasiProps } from './model';

const FilterVariasi = (props: FilterVariasiProps) => {
  const { item, style, title, onChangeItem } = props || {};

  const [selectedItem, setSelectedItem] = useState<string>('');

  useEffect(() => {
    onChangeItem(selectedItem);
  }, [selectedItem]);

  return (
    <View style={style}>
      <Text style={styles.textTitle}>{title}</Text>
      <View style={{ flexDirection: 'row', marginRight: sizes.padding }}>
        {item.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setSelectedItem(item)}
            style={[
              styles.container,
              {
                backgroundColor:
                  selectedItem === item ? colors.tonalPrimary : colors.white,
                borderWidth: selectedItem === item ? 0 : 1,
              },
            ]}>
            <Text style={styles.textStyle}>{item}</Text>
            {selectedItem === item && (
              <Image
                source={icons.cross_shape}
                style={{
                  width: sizes.padding,
                  height: sizes.padding,
                  marginLeft: 10,
                  marginRight: -4,
                }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FilterVariasi;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizes.padding,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.padding / 2,
    borderColor: colors.tonalPrimary,
    marginRight: sizes.padding / 2,
    flexDirection: 'row',
  },
  textStyle: {
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  textTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.bodyTextLightGrey,
    marginBottom: 10,
  },
});
