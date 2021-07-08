import * as React from 'react';
import {useContext} from 'react';

import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {ThemeContext} from '../../hooks/useTheme';
import {SCREENS} from '../../shared/constants';
import styles from './HomeScreen.style';
import { SearchBar } from 'react-native-elements';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {theme}: any = useContext(ThemeContext);

  return (
    <LinearGradient
      colors={theme.gradient}
      style={{
        ...styles.container,
      }}>

<SearchBar/>
    </LinearGradient>
  );
}
