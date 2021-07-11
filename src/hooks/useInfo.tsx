import * as React from 'react';

import {Text} from 'react-native';

import {fontSize} from '../shared/theme';

export const comparision = (info, history, theme) => {
  if (Math.round(info?.data[0]?.temp) < Math.round(history?.data[0]?.temp)) {
    return (
      <Text
        style={{
          color: theme.text,
          fontSize: fontSize.mediumLarge,
          fontWeight: 'bold',
        }}>
        cooler
      </Text>
    );
  }
  return (
    <Text
      style={{
        color: theme.text,
        fontSize: fontSize.mediumLarge,
        fontWeight: 'bold',
      }}>
      warmer
    </Text>
  );
};

export const clothing = (temp, theme) => {
  if (temp > 30) {
    return (
      <Text
        style={{
          color: theme.text,
          fontSize: fontSize.mediumLarge,
          fontWeight: 'bold',
        }}>
        shorts
      </Text>
    );
  } else if (temp <= 21 && temp > 13) {
    return (
      <Text
        style={{
          color: theme.text,
          fontSize: fontSize.mediumLarge,
          fontWeight: 'bold',
        }}>
        a sweater
      </Text>
    );
  } else if (temp <= 13 && temp > 0) {
    return (
      <Text
        style={{
          color: theme.text,
          fontSize: fontSize.mediumLarge,
          fontWeight: 'bold',
        }}>
        a jacket
      </Text>
    );
  } else if (temp < 0) {
    return (
      <Text
        style={{
          color: theme.text,
          fontSize: fontSize.mediumLarge,
          fontWeight: 'bold',
        }}>
        a heavy jacket
      </Text>
    );
  }
};
