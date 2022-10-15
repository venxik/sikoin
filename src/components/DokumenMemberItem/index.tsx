// import React from 'react';
// import { Image, StyleSheet, Text, View } from 'react-native';

// import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

// import { colors, icons, sizes, strings } from '../../constants';
// import { DokumenMemberItemProps } from './model';

// const DokumenMemberItem = (props: DokumenMemberItemProps) => {
//   const { item, onPressDelete } = props || {};
//   const { namaMember, profilePic } = item || {};

//   const renderPopupMenu = () => {
//     return (
//       <Menu>
//         <MenuTrigger>
//           <Image
//             style={{
//               width: sizes.padding * 1.5,
//               height: sizes.padding * 1.5,
//             }}
//             source={icons.icon_three_dot}
//           />
//         </MenuTrigger>
//         <MenuOptions optionsContainerStyle={styles.optionsContainer}>
//           <MenuOption onSelect={onPressDelete}>
//             <View style={{ flexDirection: 'row' }}>
//               <Image source={icons.icon_hapus_akses} style={styles.popupMenuIcon} />
//               <Text style={styles.textPopupMenu}>{strings.hapus_akses}</Text>
//             </View>
//           </MenuOption>
//         </MenuOptions>
//       </Menu>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.profilePic} source={{ uri: profilePic }} />
//       <View style={{ flex: 1, marginLeft: sizes.padding }}>
//         <Text style={styles.textTitle} numberOfLines={1}>
//           {namaMember}
//         </Text>
//       </View>
//       <View style={{ marginRight: '-2%' }}>{renderPopupMenu()}</View>
//     </View>
//   );
// };

// export default DokumenMemberItem;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     padding: sizes.padding,
//     borderBottomColor: colors.strokeGrey,
//     borderBottomWidth: 1,
//   },
//   subContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   textTitle: {
//     fontFamily: 'Poppins-Medium',
//     fontSize: 16,
//     color: colors.bodyText,
//   },
//   profilePic: {
//     width: sizes.icon_size * 2,
//     height: sizes.icon_size * 2,
//     borderRadius: sizes.icon_size * 2,
//   },
//   optionsContainer: {
//     padding: sizes.padding / 2,
//     borderRadius: sizes.padding / 1.5,
//     width: '45%',
//   },
//   popupMenuIcon: {
//     width: sizes.icon_size,
//     height: sizes.icon_size,
//   },
//   textPopupMenu: {
//     marginLeft: 10,
//     width: '70%',
//     color: colors.red,
//     fontFamily: 'Poppins-Medium',
//   },
// });
export {};
