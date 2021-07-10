import * as React from 'react';
import {useContext} from 'react';

import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';

import WeatherSearchBar from '../../components/SearchBar';
import {ThemeContext} from '../../hooks/useTheme';
import styles from './HomeScreen.style';

const mapStateToProps = (state) => ({
  hasCity: state.data.hasCity,
});

function HomeScreen() {
  const {theme}: any = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{...styles.safeArea, backgroundColor: theme.primary}}>
        <View style={styles.mainView}>
          <View style={{flex: 1, padding: 10, alignItems: 'center'}}>
            <View style={styles.titleContainer}>
              <Text style={{...styles.titleTextStyle, color: theme.text}}>
                Relative Weather
              </Text>
            </View>
            <WeatherSearchBar />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default connect(mapStateToProps)(HomeScreen);
