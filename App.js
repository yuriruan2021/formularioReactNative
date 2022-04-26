import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required('Informe seu username!'),
  email: yup.string().email('Email inválido').required('Informe seu email'),
  password: yup
    .string()
    .min(6, 'A senha deve  ter pelo menos 6 digitos')
    .required('Digite sua senha'),
});
export default function App() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSignIn(data) {
    console.log(data);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem Vindo(a)</Text>
      <Controller
        control={control}
        name="username"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[
              styles.input,
              {
                borderWidth: errors.username && 1,
                borderColor: errors.username && '#FF375B',
              },
            ]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Seu username"
          />
        )}
      />
      {errors.username && (
        <Text style={styles.labelError}>{errors.username?.message}</Text>
      )}
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[
              styles.input,
              {
                borderWidth: errors.email && 1,
                borderColor: errors.email && '#FF375B',
              },
            ]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Seu email"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.labelError}>{errors.email?.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[
              styles.input,
              {
                borderWidth: errors.password && 1,
                borderColor: errors.password && '#FF375B',
              },
            ]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.labelError}>{errors.password?.message}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleSignIn)}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginBottom: 34,
    color: '#121212',
  },
  input: {
    backgroundColor: '#FFFF',
    color: '#000',
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: 40,
    margin: 5,
    padding: 10,
    borderRadius: 4,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 5,
    backgroundColor: '#45D800',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  labelError: {
    alignSelf: 'flex-start',
    color: '#ff375b',
    marginBottom: 8,
  },
});
