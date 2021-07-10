import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {TouchableOpacity, View, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Icon} from 'react-native-ios-kit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ThemeContext} from '../../hooks/useTheme';
import {
  GOOGLE_PLACES_API,
  GOOGLE_PLACES_API_KEY,
} from '../../services/api/api.constant';
import {SCREENS, SEARCH_HISTORY} from '../../services/constants';
import {fontSize} from '../../shared/theme';
import styles from './SearchBar.style';

const mapStateToProps = (state) => ({
  searchHistory: state.data.searchHistory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      recentSearch,
    },
    dispatch
  );

const recentSearch = (action, value) => (dispatch) => {
  dispatch({type: action, value});
};

function WeatherSearchBar({searchHistory, recentSearch}) {
  const navigation = useNavigation();
  const searchRef: React.MutableRefObject<undefined> = useRef();
  const {theme}: any = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = React.useState(false);

  useEffect(() => {
    // @ts-ignore
    searchRef?.current.focus();
  }, []);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const getSuggestions = async (text) => {
    setSearch(text);
    if (text.length === 0) {
      return setSuggestions([]);
    }
    try {
      setLoading(true);
      const res = await axios.get(
        GOOGLE_PLACES_API + `${text}&key=${GOOGLE_PLACES_API_KEY}`
      );
      setSuggestions(res.data.predictions);
    } catch (error) {
      return error;
    }
    setTimeout(() => setLoading(false), 500);
  };
  const onPress = (item) => {
    // recentSearch(SEARCH_HISTORY, []);
    recentSearch(SEARCH_HISTORY, [
      item?.structured_formatting?.main_text,
      ...searchHistory.slice(0, 3),
    ]);
    navigation.navigate(SCREENS.WEATHER_INFO, {
      city: item?.structured_formatting?.main_text,
    });
  };

  return (
    <View
      style={{
        ...styles.main,
        backgroundColor: theme.darkGray,
      }}>
      <SearchBar
        round
        autofocus={false}
        autoCorrect={false}
        onFocus={onFocus}
        onBlur={onBlur}
        onClear={() => setSearch('')}
        onChangeText={(text) => getSuggestions(text)}
        value={search}
        ref={searchRef}
        showLoading={loading}
        returnKeyType='search'
        searchIcon={{size: 24}}
        placeholder='Enter your city'
        inputStyle={{
          color: theme.text,
          fontSize: fontSize.medium,
        }}
        placeholderTextColor={theme.grey}
        containerStyle={styles.searchBar}
      />
      {searchHistory.length > 0 && focused && (
        <>
          <View
            style={{height: 0.25, width: '95%', backgroundColor: theme.divider}}
          />
          <View style={styles.searchHistoryInnerContainer}>
            {searchHistory.map((items) => (
              <View
                style={{
                  ...styles.searchHistory,
                  paddingBottom: suggestions.length === 0 && 8,
                }}>
                <Icon
                  name='ios-time-outline'
                  size={18}
                  color={theme.blue}
                  style={{marginLeft: 43}}
                />
                <TouchableOpacity
                  style={styles.searchHistoryContainer}
                  onPress={() => console.log('PRESSED')}>
                  <Text numberOfLines={1} style={styles.historyText}>
                    {items}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      )}
      {suggestions.length > 0 && (
        <>
          <View style={styles.suggestionsInnerContainer}>
            {suggestions.map((item) => (
              <View style={styles.suggestions}>
                <Icon
                  name='ios-search'
                  size={18}
                  color={theme.divider}
                  style={{marginLeft: 43}}
                />
                <TouchableOpacity
                  style={styles.suggestionsContainer}
                  onPress={() => onPress(item)}>
                  <Text numberOfLines={1} style={styles.suggestionText}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherSearchBar);
