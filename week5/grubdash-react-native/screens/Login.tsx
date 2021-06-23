import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, StyleSheet, Image, TextInput, Text, View, ScrollView, NativeSyntheticEvent, NativeTouchEvent,  } from 'react-native';
import { sendLogin } from '../remote/grubdash-backend/grubdash.api';


const LoginPage: React.FC<unknown> = (props) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const dispatch = react.useAppDispatch();
  // const history = useHistory();

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleFormSubmit = async (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    e.preventDefault();

    try {
      const user = await sendLogin(username, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}>Username</Text>
      <TextInput style={styles.inputBox} onChangeText={handleUsernameChange} />
      <Text style={styles.formLabel}>Password</Text>
      <TextInput secureTextEntry={true} style={styles.inputBox} onChangeText={handlePasswordChange} />
      <View style={styles.button}>
        <Button title='Submit' onPress={handleFormSubmit} />
      </View>
    </View>
  );
};


const styles =  StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: "white",
  },
  formLabel: {
    color: "#262633",
  },
  inputBox: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginBottom: 15,
    backgroundColor: 'lightgray',
  },
  button: {
    width: "30%",
  }
});

export default LoginPage;