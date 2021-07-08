import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
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

import {ThemeContext} from '../../hooks/useTheme';
import styles from './HomeScreen.style';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {theme}: any = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const searchRef: React.MutableRefObject<undefined> = useRef();

  useEffect(() => {
    // @ts-ignore
    searchRef?.current.focus();
  });

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
