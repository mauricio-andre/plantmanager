import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import colors from '../../styles/colors';
import wateringImg from '../assets/watering.png';
import { Feather } from '@expo/vector-icons';
import fonts from '../../styles/fonts';
import { useNavigation } from '@react-navigation/native';

type Nav = {
  navigate: (value: string) => void;
}

export default function Welcome() {
  const navigation = useNavigation<Nav>();

  function handleStart() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styled.container}>
      <View style={styled.wrapper}>
      <Text style={styled.title}>
        Gerencie {'\n'} suas plantas de {'\n'} forma fácil
      </Text>

      <Image
        source={wateringImg}
        style={styled.image}
        resizeMode="contain"
      />

      <Text style={styled.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <TouchableOpacity style={styled.button} activeOpacity={0.7} onPress={handleStart}>
        <Feather name="chevron-right" style={styled.buttonIcon} />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  }
});
