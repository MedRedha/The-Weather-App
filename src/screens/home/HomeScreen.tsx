import * as React from 'react';
import {useContext, useState} from 'react';

import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Button} from 'react-native-ios-kit';
import {connect} from 'react-redux';

import WeatherSearchBar from '../../components/SearchBar';
import {ThemeContext} from '../../hooks/useTheme';
import styles from './HomeScreen.style';

const mapStateToProps = (state) => ({
  hasCity: state.data.hasCity,
});

function HomeScreen() {
  const {theme}: any = useContext(ThemeContext);
  const [search, setSearch] = useState('');

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView
        style={{...styles.safeArea, backgroundColor: theme.primary}}>
        <View style={styles.mainView}>
          <View style={{flex: 1, padding: 10, alignItems: 'center'}}>
            <View style={styles.titleContainer}>
              <Text style={{...styles.titleTextStyle, color: theme.text}}>
                Relative Weather
              </Text>
            </View>
            <WeatherSearchBar search={search} setSearch={setSearch} />
          </View>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
            <Animatable.View
              animation={search === '' ? 'fadeOut' : 'fadeIn'}
              easing='ease'
              useNativeDriver
              iterationCount={1}>
              <Button
                rounded
                style={{...styles.goButton}}
                innerStyle={styles.buttonTitle}>
                Go
              </Button>
            </Animatable.View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default connect(mapStateToProps)(HomeScreen);
