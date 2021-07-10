import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {TouchableOpacity, View, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from '../../hooks/useTheme';
import {
  GOOGLE_PLACES_API,
  GOOGLE_PLACES_API_KEY,
} from '../../services/api/api.constant';
import {SCREENS} from '../../services/constants';
import {fontSize} from '../../shared/theme';
import styles from './SearchBar.style';

export default function WeatherSearchBar() {
  const navigation = useNavigation();
  const searchRef: React.MutableRefObject<undefined> = useRef();
  const {theme}: any = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // @ts-ignore
    searchRef?.current.focus();
  });

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

  return (
    <View
      style={{
        ...styles.main,
        backgroundColor: theme.darkGray,
      }}>
      <SearchBar
        round
        autofocus
        autoCorrect={false}
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
      {suggestions.length > 0 && (
        <>
          <View
            style={{height: 0.25, width: '95%', backgroundColor: theme.divider}}
          />
          <View
            style={{width: '100%', alignItems: 'center', paddingVertical: 8}}>
            {suggestions.map((item) => (
              <View style={styles.suggestions}>
                <MaterialCommunityIcons
                  name='history'
                  size={18}
                  color={theme.divider}
                  style={{marginLeft: 43}}
                />
                <TouchableOpacity
                  style={styles.suggestionsContainer}
                  onPress={() =>
                    navigation.navigate(SCREENS.WEATHER_INFO, {
                      city: item.structured_formatting.main_text,
                    })
                  }>
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
