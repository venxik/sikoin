import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  // eslint-disable-next-line no-unused-vars
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, icons, images, strings } from '../../constants';
import { dimensions } from '../../utils';

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

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const scrollX = new Animated.Value(0);

  const navigateToLoginScreen = () => {
    navigation.navigate('LoginStackNavigator');
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, dimensions.SCREEN_WIDTH);
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
        // snapToAlignment='center'
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
            <View
              key={index}
              style={{
                width: dimensions.SCREEN_WIDTH,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={item.img}
                  resizeMode="cover"
                  style={{
                    width: dimensions.SCREEN_WIDTH * 0.8,
                    height: dimensions.SCREEN_WIDTH * 0.8,
                  }}
                />
              </View>
              <View style={{ paddingHorizontal: '10%' }}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descText}>{item.desc}</Text>
              </View>
              {item.last ? (
                <View
                  style={{ position: 'absolute', bottom: '7%', right: '20%' }}>
                  <TouchableOpacity
                    onPress={navigateToLoginScreen}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
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
      <View style={{ position: 'absolute', bottom: '10%', width: '100%' }}>
        {renderDots()}
      </View>
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
    fontWeight: 'bold',
  },
  descText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
    color: colors.black,
  },
  dotContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    borderRadius: dotSize,
    height: dotSize,
    marginHorizontal: dotSize,
  },
});
