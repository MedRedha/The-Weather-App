import {ScreenWidth} from '@freakycoder/react-native-helpers';
import {ViewStyle, StyleSheet, TextStyle} from 'react-native';
import {colors, fontSize} from '../../shared/theme';

interface Style {
  main: ViewStyle;
  searchBar: ViewStyle;
  suggestions: ViewStyle;
  suggestionsContainer: ViewStyle;
  suggestionText: TextStyle;
}

export default StyleSheet.create<Style>({
  main: {
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: ScreenWidth * 0.9,
  },
  searchBar: {
    padding: 0,
    alignSelf: 'center',
    width: ScreenWidth * 0.9,
    borderTopColor: 'transparent',
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  suggestions: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  suggestionsContainer: {
    width: '100%',
    paddingLeft: 15,
    paddingVertical: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  suggestionText: {
    width: '80%',
    overflow: 'hidden',
    color: colors.dark.text,
    fontSize: fontSize.medium,
  },
});