import * as React from 'react';
import {useContext, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
// @ts-ignore
import moment from 'moment';
import {SafeAreaView, Text, View} from 'react-native';
import {Spinner} from 'react-native-ios-kit';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {clothing, comparision} from '../../hooks/useInfo';
import {ThemeContext} from '../../hooks/useTheme';
import {getCurrentWeather} from '../../services/actions';
import {fontSize} from '../../shared/theme';
import styles from './WeatherInfo.style';

const mapStateToProps = (state) => ({
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

function WeatherInfo({route, weather, getCurrentWeather}) {
  const navigation = useNavigation();
  const {theme}: any = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const {city} = route?.params;
  navigation.setOptions({title: city});
  const {error, history, info} = weather;

  useEffect(() => {
    getCurrentWeather(city);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{...styles.safeArea, backgroundColor: theme.primary}}>
        <Spinner
          animating
          size='large'
          theme={{
            primaryColor: theme.lightGray,
          }}
        />
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
      <View style={styles.dateAndTime}>
        <Text
          style={{
            color: theme.text,
            fontSize: fontSize.large,
          }}>
          {moment().format('dddd, MMMM Do YYYY')}
        </Text>
        <Text
          style={{
            color: theme.text,
            fontSize: fontSize.huge,
          }}>
          {moment().format('LT')}
        </Text>
      </View>
      <View style={styles.centerInfo}>
        <Text
          style={{
            color: theme.text,
            fontSize: fontSize.titan,
            fontFamily: 'ProductSans-Thin',
          }}>
          {Math.round(info?.data[0]?.temp) + '\u00B0C'}
        </Text>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: theme.text, fontSize: 26}}>
            Today is {comparision(info, history, theme)} than yesterday
          </Text>
          <Text style={{color: theme.text, fontSize: 26}}>
            Wear {clothing(info?.data[0]?.temp, theme)}
          </Text>
        </View>
      </View>
      <View style={styles.dividerContainer}>
        <Text style={{color: theme.text, fontSize: 26}}>
          {info?.data[0]?.weather?.description}
        </Text>
        <View
          style={{
            height: 0.3,
            width: '85%',
            backgroundColor: theme.lightGray,
          }}
        />
        <Text style={{color: theme.text, fontSize: 26}}>
          Wind speed:{' '}
          {Math.round(Number(info?.data[0]?.wind_spd) * 3.6) + ' km/h'}
        </Text>
      </View>
      <View style={styles.sunTime}>
        <View style={styles.sunInfo}>
          <Text style={{color: theme.text, fontSize: 26}}>
            {info?.data[0]?.sunrise}
          </Text>
          <Feather name='sunrise' color={theme.yellow} size={50} />
        </View>
        <View style={styles.sunInfo}>
          <Text style={{color: theme.text, fontSize: 26}}>
            {info?.data[0]?.sunset}
          </Text>
          <Feather name='sunset' color={theme.yellow} size={50} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfo);
