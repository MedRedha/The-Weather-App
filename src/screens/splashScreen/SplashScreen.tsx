import * as React from 'react';
import {useContext, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
// @ts-ignore
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

import {ThemeContext} from '../../hooks/useTheme';
import {SCREENS} from '../../shared/constants';
import styles from './SplashScreen.style';

export default function SplashScreen() {
  const {theme}: any = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      console.log('NAVIGATE');
      // @ts-ignore
      navigation.replace(SCREENS.HOME);
    }, 3000);
  }, []);

  return (
    <LinearGradient
      colors={theme.gradient}
      style={{
        ...styles.container,
      }}>
      <LottieView
        source={require('../../assets/animations/splash.json')}
        style={{
          width: 350,
          alignSelf: 'center',
        }}
        autoPlay
        speed={1.5}
        autoSize
        loop
      />
    </LinearGradient>
  );
}
