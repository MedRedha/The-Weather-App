import {ScreenWidth} from '@freakycoder/react-native-helpers';
import {ViewStyle, StyleSheet} from 'react-native';

interface Style {
  safeArea: ViewStyle;
}

export default StyleSheet.create<Style>({
  safeArea: {
    flex: 1,
    width: ScreenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
