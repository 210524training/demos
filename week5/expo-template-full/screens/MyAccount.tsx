import * as React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppDispatch } from '../hooks';
import { loginAsync } from '../hooks/slices/user.slice';
import { Alert } from 'react-native';

export default function MyAccountScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    Alert.alert(username, password);
    await dispatch(loginAsync({ username, password }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sign in
      </Text>
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
          onPress={handleSubmit}
          title="Signsssin"
          color="red"
        >

        </Button>
      </View>
    </View>
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
