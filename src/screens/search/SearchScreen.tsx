import * as React from 'react';
import {useContext} from 'react';

import {Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {ThemeContext} from '../../hooks/useTheme';
import styles from './SearchScreen.style';

export default function SearchScreen() {
  const {theme}: any = useContext(ThemeContext);

  return (
    <>
      <LinearGradient
        colors={theme.gradient}
        style={{
          ...styles.container,
        }}>
        <Text style={{color: theme.text, fontSize: 26}}> SearchScreen </Text>
      </LinearGradient>
    </>
  );
}
