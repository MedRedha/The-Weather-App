import * as React from 'react';
import {useContext, useEffect} from 'react';

import {SafeAreaView, Text} from 'react-native';
import {Spinner} from 'react-native-ios-kit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ThemeContext} from '../../hooks/useTheme';
import {getCurrentWeather} from '../../services/actions';
import styles from './WeatherInfo.style';

const mapStateToProps = (state) => ({
  hasCity: state.data.hasCity,
  weather: state.data.weather,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      isLoading: (action, value) => dispatch({type: action, value}),
      getCurrentWeather,
    },
    dispatch
  );

function WeatherInfo({route, navigation, weather, getCurrentWeather}) {
  const {theme}: any = useContext(ThemeContext);
  const {city} = route?.params;
  navigation.setOptions({title: city});

  const {isLoading, error} = weather;

  useEffect(() => {
    getCurrentWeather(city);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{...styles.safeArea, backgroundColor: theme.primary}}>
        <Spinner animating size='large' color={theme.gray} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{...styles.safeArea, backgroundColor: theme.primary}}>
        <Text style={{color: theme.text, fontSize: 26}}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{...styles.safeArea, backgroundColor: theme.primary}}>
      <Text style={{color: theme.text, fontSize: 26}}> SearchScreen </Text>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfo);
