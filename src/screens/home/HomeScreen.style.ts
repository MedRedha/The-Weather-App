import {ScreenWidth} from '@freakycoder/react-native-helpers';
import {ViewStyle, TextStyle, StyleSheet} from 'react-native';

import {colors, fontSize} from '../../shared/theme';

interface Style {
  safeArea: ViewStyle;
  mainView: ViewStyle;
  goButton: ViewStyle;
  buttonTitle: TextStyle;
  titleContainer: ViewStyle;
  titleTextStyle: TextStyle;
}

export default StyleSheet.create<Style>({
  safeArea: {
    flex: 1,
    width: ScreenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    flex: 1,
    width: ScreenWidth,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  goButton: {
    height: 50,
    marginBottom: 50,
    width: ScreenWidth * 0.95,
    alignSelf: 'center',
    backgroundColor: colors.dark.blue,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    marginTop: 60,
    marginBottom: 8,
    marginLeft: 15,
  },
  buttonTitle: {
    fontSize: fontSize.large,
    fontFamily: 'ProductSans-Bold',
    color: colors.dark.text,
    fontWeight: '400',
  },
  titleTextStyle: {
    fontSize: fontSize.veryLarge,
    fontFamily: 'ProductSans-Bold',
  },
});
