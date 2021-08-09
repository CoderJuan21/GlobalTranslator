import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card(props) {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 6,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});