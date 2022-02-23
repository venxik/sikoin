import { StyleSheet, Dimensions, Platform } from 'react-native';
import colors from './colors';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.02,
    ...ifIphoneX({
      marginBottom: 20,
    }),
  },
  bottomSheetContainer: {
    height: Platform.OS === 'ios' ? height * 0.35 : 310,
    paddingTop: 20,
  },
  bottomTextBtn: {
    alignSelf: 'center',
    paddingVertical: 10,
    color: colors.primaryOrangeRed,
  },
  defaultText: {
    fontSize: 16,
    paddingHorizontal: 25,
    color: colors.mainText,
  },
  headerText: {
    paddingHorizontal: 25,
    marginVertical: 5,
    color: colors.mainText,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderText: {
    paddingHorizontal: 25,
    marginVertical: 10,
    color: colors.mainText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textBox: {
    height: Platform.OS === 'ios' ? height * 0.05 : 40,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: colors.inActiveBtn,
    borderWidth: 1,
    marginVertical: 10,
  },
  buttonText: {
    textTransform: 'uppercase',
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  button: {
    borderRadius: 18,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: colors.secondaryText,
    backgroundColor: colors.primaryOrangeRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkBox: {
    marginVertical: 10,
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 2,
    borderColor: colors.primaryOrangeRed,
    marginVertical: 20,
  },
  courseBtn: {
    width: '90%',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 5,
    borderColor: colors.primaryOrangeRed,
    backgroundColor: colors.lightOrangeRed,
  },
  courseTitle: {
    paddingHorizontal: 20,
    marginVertical: 10,
    color: colors.secondaryText,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: colors.blue,
    fontSize: 12,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 10,
  },
  listAvatar: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 50 / 2,
    borderWidth: 2,
    borderColor: colors.primaryOrangeRed,
  },
});
