import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {TouchableOpacity, View, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Icon, Button} from 'react-native-ios-kit';
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

function WeatherSearchBar({searchHistory, recentSearch, search, setSearch}) {
  const navigation = useNavigation();
  const searchRef: React.MutableRefObject<undefined> = useRef();
  const {theme}: any = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [newHistory, setNewHistory] = useState([]);
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

  const onCityPress = (item) => {
    navigation.navigate(SCREENS.WEATHER_INFO, {
      city: item,
    });
  };

  const onPress = (item) => {
    // recentSearch(SEARCH_HISTORY, []);
    recentSearch(SEARCH_HISTORY, [
      item?.structured_formatting?.main_text,
      ...searchHistory.slice(0, 3),
    ]);
    onCityPress(item?.structured_formatting?.main_text);
  };

  const onRemovePress = (index) => {
    setNewHistory(searchHistory);
    newHistory.splice(index, 1);
    recentSearch(SEARCH_HISTORY, newHistory);
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
        enablesReturnKeyAutomatically={false}
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
      {suggestions.length > 0 ||
        (focused && (
          <>
            <View
              style={{
                height: searchHistory.length > 0 && 0.25,
                width: '95%',
                backgroundColor: theme.divider,
              }}
            />
            <View
              style={{
                ...styles.suggestionsInnerContainer,
                paddingVertical: searchHistory.length > 0 && 8,
              }}>
              {searchHistory.map((items, index) => (
                <View style={styles.suggestions}>
                  <Icon
                    name='ios-time-outline'
                    size={18}
                    color={theme.divider}
                    style={{marginLeft: 43}}
                  />
                  <TouchableOpacity
                    style={{...styles.suggestionsContainer, width: '82%'}}
                    onPress={() => onCityPress(items)}>
                    <Text numberOfLines={1} style={styles.historyText}>
                      {items}
                    </Text>
                  </TouchableOpacity>
                  <Button
                    inline
                    rounded
                    style={styles.removeButton}
                    onPress={() => onRemovePress(index)}>
                    Remove
                  </Button>
                </View>
              ))}
            </View>
          </>
        ))}
      {suggestions.length > 0 && (
        <>
          <View
            style={{
              height: 0.25,
              width: '95%',
              backgroundColor: theme.divider,
            }}
          />
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
