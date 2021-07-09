import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';

import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SearchBar} from 'react-native-elements';
import {Button} from 'react-native-ios-kit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ThemeContext} from '../../hooks/useTheme';
import {getCurrentWeather} from '../../services/actions';
import styles from './HomeScreen.style';

const mapStateToProps = (state) => ({
  hasCity: state.location.hasCity,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCity: (action, value) => dispatch({type: action, value}),
      getCurrentWeather,
    },
    dispatch
  );

function HomeScreen({getCurrentWeather}) {
  const {theme}: any = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const searchRef: React.MutableRefObject<undefined> = useRef();

  useEffect(() => {
    // @ts-ignore
    searchRef?.current.focus();
  });

  const getWeather = async () => {
    const result = await getCurrentWeather();
    console.log('----', result);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{...styles.safeArea, backgroundColor: theme.primary}}>
        <View style={styles.mainView}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={{...styles.titleTextStyle, color: theme.text}}>
                Relative Weather
              </Text>
            </View>
            <SearchBar
              round
              autofocus
              value={search}
              ref={searchRef}
              searchIcon={{size: 24}}
              placeholder='Enter your city'
              inputStyle={{color: theme.text}}
              placeholderTextColor={theme.grey}
              containerStyle={styles.searchBar}
              onClear={() => setSearch('')}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
            <Animatable.View
              animation={!!search && 'fadeIn'}
              easing='ease'
              useNativeDriver
              iterationCount={1}>
              <Button
                rounded
                style={{...styles.goButton, display: !search && 'none'}}
                innerStyle={styles.buttonTitle}
                onPress={getWeather}>
                Go
              </Button>
            </Animatable.View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
