import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import Button from '../components/Button';

type Nav = {
  navigate: (value: string, data: any) => void;
};

export default function UserIdentification() {
  const navigation = useNavigation<Nav>();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilles] = useState(false);
  const [name, setName] = useState<string>();

  async function handleSubmit() {
    if (!name) {
      return Alert.alert('Me diz como chamar você 😢');
    }

    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle:
          'Agora vamos começar a cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Vamos lá!',
        icon: 'smile',
        nextScreen: 'MyPlants',
      });
    } catch (error) {
      return Alert.alert('Não foi possível salvar o seu nome 😢');
    }
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setName(value);
    setIsFilles(!!value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>😀</Text>
                <Text style={styles.title}>
                  Como podemos {'\n'} chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && {
                    borderBottomColor: colors.green,
                  },
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
                onSubmitEditing={handleSubmit}
              />

              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
