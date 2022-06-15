import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SectionHeaderType } from '../constants/types';

const SectionHeader: React.FC<SectionHeaderType> = ({title}) => {
  return (
    <View>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    padding: 10,
  },
});

export default SectionHeader;
