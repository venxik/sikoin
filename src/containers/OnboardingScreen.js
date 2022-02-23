import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../constants';
import { dimensions } from '../utils';

const dotSize = 4;
const image = {
  onboarding1: require('assets/images/onboarding_1.png'),
  onboarding2: require('assets/images/onboarding_2.png'),
  onboarding3: require('assets/images/onboarding_3.png'),
};

const onBoardings = [
  {
    title: 'Jelajahi Pengalaman Berkoperasi Baru',
    desc: 'Berkomunikasi dengan tim Kamu serta siapkan proses dan sasaran bisnis melalui aplikasi seluler dan web.',
    img: image.onboarding1,
    last: false,
  },
  {
    title: 'Semua Di Satu Tempat',
    desc: 'Nikmati fitur koperasi modern yang berlimpah dalam satu sistem terpadu. ',
    img: image.onboarding2,
    last: false,
  },
  {
    title: 'Akses Tiada Batas',
    desc: 'Data anggota, simpanan, pinjaman, keuangan, bisnis, transaksi, dan lainnya akan terekam dan terkait satu sama lain.',
    img: image.onboarding3,
    last: true,
  },
];

const OnboardingScreen = ({ navigation }) => {
  const scrollX = new Animated.Value(0);

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
    const dotPosition = Animated.divide(scrollX, dimensions.SCREEN_WIDTH);

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
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('assets/icons/arrow_right.png')}
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
