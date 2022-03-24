import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ParentStackParamList } from '../../config/types/NavigationTypes';
import { colors, icons, images, SCREEN_WIDTH, strings } from '../../constants';
import AsyncStore from '../../utils/AsyncStore';

const dotSize = 4;

const onBoardings = [
  {
    title: strings.onboarding_title_1,
    desc: strings.onboarding_desc_1,
    img: images.onboarding_1,
    last: false,
  },
  {
    title: strings.onboarding_title_2,
    desc: strings.onboarding_desc_2,
    img: images.onboarding_2,
    last: false,
  },
  {
    title: strings.onboarding_title_2,
    desc: strings.onboarding_desc_3,
    img: images.onboarding_3,
    last: true,
  },
];

type Props = NativeStackScreenProps<
  ParentStackParamList,
  'OnboardingStackNavigator'
>;

const OnboardingScreen: FC<Props> = ({ navigation }: Props) => {
  const scrollX = new Animated.Value(0);

  const navigateToLoginScreen = () => {
    AsyncStore.storeData('@onboardingComplete', 'true');
    navigation.navigate('LoginStackNavigator');
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SCREEN_WIDTH);
    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {
          const dotChange = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [dotSize, dotSize + 40, dotSize],
            extrapolate: 'clamp',
          });

          const colorChange = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              colors.tonalPrimary,
              colors.primary,
              colors.tonalPrimary,
            ],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                { width: dotChange, backgroundColor: colorChange },
              ]}
              key={`dot-${index}`}
            />
          );
        })}
      </View>
    );
  };

  const renderScrollView = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        scrollEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}>
        {onBoardings.map((item, index) => {
          return (
            <View key={index} style={styles.mainContainer}>
              <View style={styles.mainInnerContainer}>
                <Image
                  source={item.img}
                  resizeMode="cover"
                  style={styles.logo}
                />
              </View>
              <View style={{ paddingHorizontal: '10%' }}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descText}>{item.desc}</Text>
              </View>
              {item.last ? (
                <View style={styles.lastButtonContainer}>
                  <TouchableOpacity
                    onPress={navigateToLoginScreen}
                    style={styles.lastButton}>
                    <Image
                      source={icons.arrow_right}
                      style={{ width: '50%', height: '50%' }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: '100%' }}>{renderScrollView()}</View>
      <View style={styles.dotMainContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};
export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 24,
    color: colors.primaryDark,
    fontFamily: 'Poppins-Bold',
  },
  descText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 15,
    color: colors.black,
    fontFamily: 'Inter-Regular',
  },
  dotMainContainer: { position: 'absolute', bottom: '10%', width: '100%' },
  dotContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    borderRadius: dotSize,
    height: dotSize,
    marginHorizontal: dotSize,
  },
  mainContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
  },
  lastButtonContainer: { position: 'absolute', bottom: '7%', right: '20%' },
  lastButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
