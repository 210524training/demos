import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC<unknown> = () => {
  const user = useAppSelector<UserState>(selectUser);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const handleLogin = async () => {
    await dispatch(loginAsync({ username, password }));
    nav.navigate('Home');
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>
            Hello, {user.username}!
          </Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Button
            title="Logout"
            color="red"
            onPress={() => dispatch(logout())}
          ></Button>
        </>
      ) : (
        <>
          <Text style={styles.title}>Login</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <View style={{ width: '100%', padding: 25, }}>
            <TextInput
              style={{ fontSize: 18, margin: 10 }}
              placeholder="Username"
              onChangeText={text => setUsername(text)}
              defaultValue={username}
            />
            <TextInput
              style={{ fontSize: 18, margin: 10 }}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              defaultValue={password}
            />

            <Button
              onPress={handleLogin}
              title="Sign in"
              color="red"
            />
            <Text
              style={{
                color: 'blue',
                padding: 10,
                textAlign: 'right'
              }}
              onPress={() => {
                nav.navigate('RegisterScreen');
              }}
            >
              Don't have an account?
            </Text>
          </View>
        </>
      )
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default LoginScreen;