import * as React from 'react';
import {useContext, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
// @ts-ignore
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import {ThemeContext} from '../../hooks/useTheme';
import {SCREENS} from '../../services/constants';
import styles from './SplashScreen.style';

const mapStateToProps = (state) => ({
  weather: state.data.weather,
  lastFetch: state.data.lastFetch,
});

function SplashScreen({weather, lastFetch}) {
  const {theme}: any = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      if (lastFetch) {
        const now: any = new Date();
        const diffTime = Math.abs(lastFetch - now);
        const diffMin = Math.ceil(diffTime / (1000 * 60));

        if (diffMin < 60) {
          // @ts-ignore
          navigation.replace(SCREENS.WEATHER_INFO);
        } else {
          // @ts-ignore
          navigation.replace(SCREENS.WEATHER_INFO, {
            city: weather?.info?.data[0]?.city_name,
          });
        }
      } else {
        // @ts-ignore
        navigation.replace(SCREENS.HOME);
      }
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

export default connect(mapStateToProps)(SplashScreen);
