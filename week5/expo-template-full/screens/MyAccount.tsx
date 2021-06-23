import * as React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice';
import { Alert } from 'react-native';
import grubdashClient from '../remote/grubdash-backend/grubdash.client';
import { useNavigation } from '@react-navigation/native';
import { getAllUsers } from '../remote/grubdash-backend/grubdash.api';

export default function MyAccountScreen() {
  const user = useAppSelector<UserState>(selectUser);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [action, setAction] = useState<boolean>(true)
  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const handleLogin = async () => {
    await dispatch(loginAsync({ username, password }));
    nav.navigate('Home');
  }

  const handleRegister = async () => {
    const users = await getAllUsers();
    let exists = false;

    users.forEach(u => {
      if (u.username === username) {
        exists = true;
      }
    });

    if (!exists) {
      const { data: registered } = await grubdashClient.post<boolean>('/api/v1/users', {
        username, password, address, phoneNumber
      });

      if (registered) {
        handleLogin();
      } 
    } else {
      Alert.alert('Username is already taken.');
      return;
    }
    Alert.alert('Failed to register.');
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
            color="#00000000"
            onPress={() => {
              dispatch(logout());

            }}
          ></Button>
        </>
      ) : (
        <>
          <Text style={styles.title}>
            {action ? 'Login' : 'Register'}
          </Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <View style={{ width: '100%', padding: 25, }}>
            {
              action
                ? (
                  <>
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
                  </>
                )
                : (
                  <>
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
                    <TextInput
                      style={{ fontSize: 18, margin: 10 }}
                      placeholder="Phone Number"
                      onChangeText={text => setPhoneNumber(text)}
                      defaultValue={address}
                    />
                    <TextInput
                      style={{ fontSize: 18, margin: 10 }}
                      placeholder="Address"
                      onChangeText={text => setAddress(text)}
                      defaultValue={address}
                    />
                    <Button
                      onPress={handleRegister}
                      title="Register"
                      color="red"
                    />
                  </>
                )
            }
            <Text
              style={{
                color: 'blue',
                padding: 10,
                // flexDirection: 'column',
                textAlign: 'right'
                // textDecorationLine: 'underline'
              }}
              onPress={() => {
                setAction(action => !action);
              }}
            >
              {action ? 'Don\'t have an account?' : 'Login?'}
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
