import React, { FC } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { ParentStackParamList } from '../../config/navigation/model';
import { colors, icons, images, SCREEN_WIDTH, strings } from '../../constants';
import { AsyncStore } from '../../utils';

const dotSize = 6;

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
    title: strings.onboarding_title_3,
    desc: strings.onboarding_desc_3,
    img: images.onboarding_3,
    last: true,
  },
];

type Props = NativeStackScreenProps<ParentStackParamList, 'OnboardingScreen'>;

const OnboardingScreen: FC<Props> = ({ navigation }) => {
  const scrollX = useSharedValue(0);

  const navigateToLoginScreen = () => {
    AsyncStore.storeData('@onboardingComplete', 'true');
    navigation.replace('LoginScreen');
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {
          const inputRange = [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ];
          const animatedStyles = useAnimatedStyle(() => {
            return {
              width: interpolate(
                scrollX.value,
                inputRange,
                [dotSize, dotSize + 40, dotSize],
                Extrapolate.CLAMP,
              ),
              backgroundColor: interpolateColor(scrollX.value, inputRange, [
                colors.tonalPrimary,
                colors.primary,
                colors.tonalPrimary,
              ]),
            };
          });
          return <Animated.View style={[styles.dot, animatedStyles]} key={`dot-${index}`} />;
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
        onScroll={scrollHandler}
      >
        {onBoardings.map((item, index) => {
          return (
            <View key={index} style={styles.mainContainer}>
              <View style={styles.mainInnerContainer}>
                <Image source={item.img} resizeMode="cover" style={styles.logo} />
              </View>
              <View style={{ paddingHorizontal: '10%' }}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descText}>{item.desc}</Text>
              </View>
              {item.last ? (
                <View style={styles.lastButtonContainer}>
                  <TouchableOpacity onPress={navigateToLoginScreen} style={styles.lastButton}>
                    <Image source={icons.arrow_right} style={{ width: '50%', height: '50%' }} />
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
