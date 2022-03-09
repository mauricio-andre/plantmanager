import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styled.container} {...rest}>
      <Text style={styled.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styled = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 10,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.heading,
  },
});
